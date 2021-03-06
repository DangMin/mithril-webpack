const { isEmpty } = require('lodash')
const emitter = require('../emitter')
const Pid = require('./pid')

const { History } = require('../models')
const ObjectId = require('mongoose').Types.ObjectId
const fs = require('fs')
const moment = require('moment')

const directory = 'datalog/'
const hour = 1000*60*60
const minute = 1000*60

function Controller() {
  this.program = {}
  this.steps = []

  this.currentIndex = 0
  this.currentCycle = 1
  this.currentStep = {}

  this.currentTimeout = null
  this.currentInterval = null

  this.timeEnd = 0
  this.timeLeft = null
  this.programStart = null
  this.programEnd = null
  this.lastMeasure = null

  this.temperaturePid = null
  this.humidityPid = null

  this.chamber = null
  this.command = null

  this.secCount = 0
  this.totalSec = 0
  this.logfile = null

  this.init = (program, chamber, cmd, steps, pids) => {
    if (isEmpty(this.program)) {
      this.program = program
      if (!isEmpty(steps)) {
        this.steps = steps
        this.currentStep = isEmpty(steps) ? {} : this.steps[this.currentIndex]
        this.programStart = new Date()
        this.temperaturePid = new Pid(pids.temperature)
        this.humidityPid = new Pid(pids.humidity)
        this.chamber = chamber
        this.command = cmd
        this.totalSec = 0

        History.create({
          program_id: this.program._id,
          temperature_pid: pids.temperature._id,
          humidity_pid: pids.humidity._id
        }, (error, history) => {
          if (error) {
            console.log(error)
          } else {
            this.logfile = `${directory}${history._id}.txt`
            console.log(this.program)
            fs.appendFile(this.logfile, `${this.program.name} - ${moment().format('MMMM Do YYYY, HH:mm:ss')} - ${this.program.cycles} - ${this.steps.length}\n`)
          }
        })

        this.setup()
      } else {
        emitter.emit('control', { signal: 'err', data: { msg: 'No step has been set.' } })
        this.reset()
      }
    } else {
      emitter.emit('control', { signal: 'err', data: { msg: this.program && this.program._id == program._id ? 'This program is already started' : 'Another program is running.' } })
    }
  }

  this.fetch = _ => {
    if (!isEmpty(this.program)) {
      // console.log(this.currentStep)
      emitter.emit('control', { signal: 'display', data: {
        timeleft: this.timeLeft,
        program: {
          name: this.program.name,
          currentCycle: this.currentCycle,
          currentStep: this.currentStep.order
        }}})
    } else {
      emitter.emit('control', { signal: 'display', data: {}})
    }
  }

  this.setup = _ => {
    let time = this.currentStep.time.split(':')
    let ms = parseInt(time[0])*hour + parseInt(time[1])*minute
    const timeStart = new Date()
    this.secCount = 0
    this.timeEnd = new Date(timeStart.getTime() + ms)
    this.temperaturePid.targetValue = this.currentStep.temperature
    this.humidityPid.targetValue = this.currentStep.humidity
    this.command.idle = false
    // console.log(`temperature target value: ${this.temperaturePid.targetValue}\n
    // PID: ${this.temperaturePid.kp} - ${this.temperaturePid.ki} - ${this.temperaturePid.kd}`)
    //this.currentTimeout = setTimeout(this.switchStep, ms)
    this.setInterval()
    // this.currentInterval = setInterval(this.control, 1000)
  }

  this.setInterval = _ => {
    this.currentInterval = setInterval(_ => {
      if (this.timeLeft <= 0 && this.timeLeft) {
        clearInterval(this.currentInterval)
        this.switchStep()
        this.timeLeft = null
      } else {
        this.prepareControl()
        const currentTime = new Date()
        this.timeLeft = (this.timeEnd.getTime() - currentTime.getTime())/1000
        ++this.secCount

        fs.appendFile(this.logfile,
          `${this.currentCycle} ${this.currentIndex+1} ${++this.totalSec} ${this.secCount} ${this.chamber.dryTemperature} ${this.chamber.wetTemperature} ${this.chamber.humidity}\n`
        , error => console.log(error ? error : ''))

        emitter.emit('control', { signal: 'display', data: {
          timeleft: this.timeLeft,
          program: {
            name: this.program.name,
            currentCycle: this.currentCycle,
            currentStep: this.currentStep.order
          } } })
      }
    }, 1000)
  }

  this.switchStep = _ => {
    console.log('enter switch step')
    if (this.steps[this.currentIndex+1]) {
      console.log('step left')
      this.command.idle = true
      ++this.currentIndex
      console.log(`next step: ${this.currentIndex}`)
      this.currentStep = this.steps[this.currentIndex]
      this.setup()
    } else if (this.currentCycle < this.program.cycles) {
      this.command.idle = true
      ++this.currentCycle
      console.log(`next cycle: ${this.currentCycle}`)
      this.currentIndex = 0
      this.currentStep = this.steps[this.currentIndex]
      this.setup()
    } else {
      console.log('end program')
      emitter.emit('program', { signal: 'program', data: { message: 'Program is finish.' }})
      this.programEnd = new Date()
      const total = this.programEnd.getTime() - this.programStart.getTime()
      this.command.idle = true
      this.reset()
      emitter.emit('control', { signal: 'reset-display' })
    }
  }

  this.prepareControl = _ => {
    const on = 1
    const off = 0

    const tempOutput = this.chamber.dryTemperature
    const humidOutput = this.chamber.humidity

    let dt
    if (this.lastMeasure == null) {
      this.lastMeasure = new Date()
      dt = this.lastMeasure - this.programStart
    } else {
      let t = new Date()
      dt = t - this.lastMeasure
      this.lastMeasure = t
    }

    this.command.temperaturePower = this.temperaturePid.output(tempOutput, dt)
    this.command.humidityPower = this.humidityPid.output(humidOutput, dt)

    if (tempOutput <= 0) {
      this.command.cvBlock.set(1, on)
      this.command.vfBlock.set(1, on)
      this.command.switchHeaters(off)
    } else {
      this.command.switchHeaters(on)
      this.command.switchCoolers(off)
    }

    if (humidOutput <= 0) {
      this.command.switchHumidifiers(off)
    } else {
      this.command.switchHumidifiers(on)
    }
  }

  this.reset = _ => {
    this.program = {}
    this.steps = []

    this.currentIndex = 0
    this.currentCycle = 1
    this.currentStep = {}

    this.tempPid = {}
    this.humidPid = {}

    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout)
    }

    if (this.currentInterval) {
      clearTimeout(this.currentInterval)
    }
  }
}

module.exports = Controller

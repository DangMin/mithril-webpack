const fs = require('fs')

exports.checkSum = (arg) => {
  return Number(arg.reduce((acc, curr, index) => {
    return acc + curr > 256 ? acc + curr - 256 : acc + curr
  }, 0)).toString(16)
}

exports.toBitsArray = (int, digit = 8) => {
  if (digit == 8 ? int > 255 : int > 15 || int < 0) {
    return null
  }

  let i = digit-1, bits = []
  while (i >= 0) {
    if (int - Math.pow(2, i) >= 0) {
      int = int - Math.pow(2, i)
      bits.push(1)
    } else {
      bits.push(0)
    }
    --i
  }
  return bits
}

exports.fillUnicodeValue = (...args) => {
  let rslt = []
  args.forEach(item => {
    rslt.push(item.toString().charCodeAt(0))
  })

  return rslt
}

exports.sendMsg = (port, message) => {
  if (port.isOpen()) {
    port.write(message, _ => {
      port.drain(err => {
        if (err)
          console.log(err)
      })
    })
  }
}

exports.arrayCmp = (array_1, array_2) => {
  if (array_1.length != array_2.length) {
    return false
  }

  for (let i = 0; i < array_1.length; ++i) {
    if (array_1[i] != array_2[i]) {
      return false
    }
  }

  return true
}

exports.timeFormat = (time) => {
  console.log(`orgtime ${time}`)
  if (time === '') {
    return '00:00'
  } else if (time.match(/^[0-9]+:[0-9]{2}$/g)) {
    let factor = time.split(':')
    if (parseInt(factor[1]) >= 60) {
      factor[1] = formatTwoDigit(parseInt(factor[1])-60)
      factor[0] = formatTwoDigit(parseInt(factor[0])+1)

      console.log(factor.join(':'))
      return factor.join(':')
    } else {
      return `${formatTwoDigit(factor[0])}:${formatTwoDigit(factor[1])}`
    }
  }
}

exports.obj2array = obj => {
  let rslt = []
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      rslt.push(obj[prop])
    }
  }
  return rslt
}

exports.bit2value = bits => {
  let val = 0
  bits.forEach((bit, index) => {
    val += bit == 1 ? Math.pow(2,bits.length-index-1) : 0
  })
  return val
}

const formatTwoDigit = number => {
  let num = parseInt(number)
  if (num >= 10) {
    return num.toString()
  }

  return `0${num.toString()}`
}

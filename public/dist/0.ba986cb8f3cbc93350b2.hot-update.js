webpackHotUpdate(0,{

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithril = __webpack_require__(1);

var _mithril2 = _interopRequireDefault(_mithril);

var _Programs = __webpack_require__(39);

var _Programs2 = _interopRequireDefault(_Programs);

var _global = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var c = {
  oninit: function oninit(vnode) {
    _Programs2.default.fetch();
  },
  view: function view() {
    return (0, _mithril2.default)('.container-fluid', [(0, _mithril2.default)('.row.programs', [(0, _mithril2.default)('.col-md-3.programs__list', [
    // P list.
    (0, _mithril2.default)('.programs__table--container', [(0, _mithril2.default)('table.programs__table', [_Programs2.default.list.map(function (prgm) {
      var cday = (0, _global.formatDate)(new Date(prgm.createdAt));
      var uday = (0, _global.formatDate)(new Date(prgm.updatedAt));
      return (0, _mithril2.default)('tr.programs__table--row', [(0, _mithril2.default)('td[data-id=' + prgm._id + ']', { onclick: _Programs2.default.chooseProgram.bind(event, prgm._id), class: _Programs2.default.currentProgram && _Programs2.default.currentProgram._id == prgm._id ? 'programs--active' : '' }, [(0, _mithril2.default)('p.programs__name', prgm.name), (0, _mithril2.default)('p.programs__details', 'Cycles: ' + prgm.cycles), (0, _mithril2.default)('p.programs__details', 'Date created: ' + cday + ' - Last updated: ' + uday)])]);
    })])]), (0, _mithril2.default)('.programs__form-container#form-program-js', { class: _Programs2.default.isPrgmForm ? 'programs__form-container--active' : '' }, [_Programs2.default.isPrgmForm ? _Programs2.default.formType == 'add' ? (0, _mithril2.default)('form.programs__form', [(0, _mithril2.default)('input[type=text][name=name][placeholder="Program\'s name"]'), (0, _mithril2.default)('input[type=number][name=cycles][placeholder="Cycles"]'), (0, _mithril2.default)('.button__group', [(0, _mithril2.default)('button', { onclick: _Programs2.default.addProgram.bind(event) }, 'Add'), (0, _mithril2.default)('button', { onclick: _Programs2.default.cancelForm.bind(event) }, 'Cancel')])]) : _Programs2.default.formType == 'edit' ? (0, _mithril2.default)('form.programs__form', [(0, _mithril2.default)('input[type=hidden][name=_id][value=' + _Programs2.default.currentProgram._id + ']'), (0, _mithril2.default)('input[type=text][name=name][value=' + _Programs2.default.currentProgram.name + ']'), (0, _mithril2.default)('input[type=text][name=cycles][value=' + _Programs2.default.currentProgram.cycles + ']'), (0, _mithril2.default)('.button__group', [(0, _mithril2.default)('button', { onclick: _Programs2.default.editProgram.bind(event) }, 'Confirm'), (0, _mithril2.default)('button', { onclick: _Programs2.default.cancelForm.bind(event) }, 'Cancel')])]) : '' : '']), (0, _mithril2.default)('.programs__handles', [(0, _mithril2.default)('button.programs__handles--button', { onclick: _Programs2.default.addFormSignal.bind(event, 'add'), disabled: !_Programs2.default.isPrgmForm ? false : true }, (0, _mithril2.default)('i.fa.fa-plus-circle'), ' Add'), (0, _mithril2.default)('button.programs__handles--button', (0, _mithril2.default)('i.fa.fa-download'), ' Load'), (0, _mithril2.default)('button.programs__handles--button', { onclick: _Programs2.default.addFormSignal.bind(event, 'edit'), disabled: !_Programs2.default.currentProgram ? true : false }, (0, _mithril2.default)('i.fa.fa-edit'), 'Edit'), (0, _mithril2.default)('button.programs__handles--button', { onclick: _Programs2.default.rmPrgm.bind(event, _Programs2.default.currentProgram), disabled: !_Programs2.default.currentProgram ? true : false }, (0, _mithril2.default)('i.fa.fa-minus-circle'), ' Remove')])]), (0, _mithril2.default)('.col-md-9.steps__table.flexbox.flexbox--column', [(0, _mithril2.default)('.row.steps__table--header.flexbox.flexbox--row', [(0, _mithril2.default)('.flexbox__cell.flexbox__cell-1', (0, _mithril2.default)('p', 'Order')), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-2', (0, _mithril2.default)('p', 'Temperature')), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-2', (0, _mithril2.default)('p', 'Humidity')), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-2', (0, _mithril2.default)('p', 'Time')), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-2', (0, _mithril2.default)('p', 'Wait')), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-3.flexbox--column', [(0, _mithril2.default)('.flexbox__cell.flexbox__cell-1', (0, _mithril2.default)('p', 'Options')), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-1.flexbox.flexbox--row', [(0, _mithril2.default)('.flexbox__cell.flexbox__cell-1', (0, _mithril2.default)('p', '1')), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-1', (0, _mithril2.default)('p', '2')), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-1', (0, _mithril2.default)('p', '3'))])]), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-2', 'Actions')]), (0, _mithril2.default)('.steps__table--body', [_Programs2.default.stepList.length !== 0 ? _Programs2.default.stepList.map(function (step) {
      console.log(step);
      return (0, _mithril2.default)('.steps__table--row.flexbox--row.flexbox', [(0, _mithril2.default)('.flexbox__cell.flexbox__cell-1', step.order), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-2', step.temperature), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-2', step.humidity), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-2', step.time), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-2', step.wait.option ? step.wait.time : 'none'), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-3.flexbox--row.flexbox', [(0, _mithril2.default)('.flexbox__cell.flexbox__cell-1', step.options[0] ? (0, _mithril2.default)('i.fa.fa-check') : (0, _mithril2.default)('i.fa.fa-times')), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-1', step.options[1] ? (0, _mithril2.default)('i.fa.fa-check') : (0, _mithril2.default)('i.fa.fa-times')), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-1', step.options[2] ? (0, _mithril2.default)('i.fa.fa-check') : (0, _mithril2.default)('i.fa.fa-times'))]), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-2', [(0, _mithril2.default)('button.steps__table--button', {}, (0, _mithril2.default)('i.fa.fa-trash')), (0, _mithril2.default)('button.steps__table--button', {}, (0, _mithril2.default)('i.fa.fa-edit'))])]);
    }) : ''
    // m('.steps__table--row.flexbox--row.flexbox', [
    //   m('.flexbox__cell.flexbox__cell-1', '1'),
    //   m('.flexbox__cell.flexbox__cell-2', '150'),
    //   m('.flexbox__cell.flexbox__cell-2', '89'),
    //   m('.flexbox__cell.flexbox__cell-2', '1:30'),
    //   m('.flexbox__cell.flexbox__cell-2', 'none'),
    //   m('.flexbox__cell.flexbox__cell-3.flexbox--row.flexbox', [
    //     m('.flexbox__cell.flexbox__cell-1', m('i.fa.fa-check')),
    //     m('.flexbox__cell.flexbox__cell-1', m('i.fa.fa-times')),
    //     m('.flexbox__cell.flexbox__cell-1', m('i.fa.fa-times'))
    //   ]),
    //   m('.flexbox__cell.flexbox__cell-2', [
    //     m('button.steps__table--button', {}, m('i.fa.fa-trash')),
    //     m('button.steps__table--button', {}, m('i.fa.fa-edit'))
    //   ]),
    // ])
    ]), (0, _mithril2.default)('#form-step-js.steps__table--form-container', { class: _Programs2.default.isStepForm ? 'steps__table--form-container--active' : '' }, [_Programs2.default.currentProgram && _Programs2.default.isStepForm ? _Programs2.default.stepFormType === 'add' ? (0, _mithril2.default)('form', [(0, _mithril2.default)('input[type=hidden][name=program_id][value=empty]'), (0, _mithril2.default)('.flexbox.flexbox--row', [(0, _mithril2.default)('.flexbox__cell.flexbox__cell-1'), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-2', [(0, _mithril2.default)('input[type=number][name=temperature][required][placeholder="Temperature"]')]), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-2', [(0, _mithril2.default)('input[name=humidity][type=number][placeholder=Humidity]')]), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-2', [(0, _mithril2.default)('input[name=time][type=text][placeholder=Time]')]), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-2', [(0, _mithril2.default)('input[name=wait][type=text][placeholder=Wait]', 'Wait')]), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-3.flexbox.flexbox--row', [(0, _mithril2.default)('.flexbox__cell.flexbox__cell-1', [(0, _mithril2.default)('input[type=checkbox][name=options[]]')]), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-1', [(0, _mithril2.default)('input[type=checkbox][name=options[]]')]), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-1', [(0, _mithril2.default)('input[type=checkbox][name=options[]]')])]), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-2', [(0, _mithril2.default)('.button__group', [(0, _mithril2.default)('button.steps__table--button', {}, (0, _mithril2.default)('i.fa.fa-check')), (0, _mithril2.default)('button.steps__table--button', { onclick: _Programs2.default.cancelStepForm }, (0, _mithril2.default)('i.fa.fa-times'))])])])]) : _Programs2.default.stepFormType === 'edit' ? (0, _mithril2.default)('form', [(0, _mithril2.default)('input[type=hidden][name=program_id][value=empty]'), (0, _mithril2.default)('.flexbox.flexbox--row', [(0, _mithril2.default)('.flexbox__cell.flexbox__cell-1'), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-2', [(0, _mithril2.default)('input[type=number][name=temperature][required][placeholder="Temperature"]')]), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-2', [(0, _mithril2.default)('input[name=humidity][type=number][placeholder=Humidity]')]), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-2', [(0, _mithril2.default)('input[name=time][type=text][placeholder=Time]')]), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-2', [(0, _mithril2.default)('input[name=wait][type=text][placeholder=Wait]', 'Wait')]), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-3.flexbox.flexbox--row', [(0, _mithril2.default)('.flexbox__cell.flexbox__cell-1', [(0, _mithril2.default)('input[type=checkbox][name=options[]]')]), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-1', [(0, _mithril2.default)('input[type=checkbox][name=options[]]')]), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-1', [(0, _mithril2.default)('input[type=checkbox][name=options[]]')])]), (0, _mithril2.default)('.flexbox__cell.flexbox__cell-2', [(0, _mithril2.default)('.button__group', [(0, _mithril2.default)('button.steps__table--button', {}, (0, _mithril2.default)('i.fa.fa-check')), (0, _mithril2.default)('button.steps__table--button', {}, (0, _mithril2.default)('i.fa.fa-times'))])])])]) : '' : '']), (0, _mithril2.default)('.steps__table--footer', [(0, _mithril2.default)('p.steps__table--status', 'Program last for 30 hour 15 minutes, including 3 cycles.'), (0, _mithril2.default)('.steps__handles', [(0, _mithril2.default)('button.steps__handles--button', { onclick: _Programs2.default.addStepForm.bind(event, 'add'), disabled: !_Programs2.default.isStepForm && _Programs2.default.currentProgram ? false : true }, (0, _mithril2.default)('i.fa.fa-plus-circle'), ' Add')])])])])]);
  }
};

exports.default = c;

/***/ })

})
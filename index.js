const { Document, SVGElement } = require('nodom');
global.document = new Document();
global.SVGElement = SVGElement;

const redom = require('redom');
const { Elm } = require('./main');

redom.mount(document.body, redom.el('main', { id: 'elm' }));

Elm.Main.init({
  node: document.getElementById('elm')
});

console.log(document.body.outerHTML);

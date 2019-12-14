'use strict';

const { Document, SVGElement } = require('nodom');
const redom = require('redom');

/**
 * 
 * @param {string} outputJs path to compiled js file
 * @param {string} elmNamespace export namespace e.g. "Main" in Elm.Main
 * @param {'text'|'html'} outputMode "html" for innerHTML, "text" for innerText
 */
function render(outputJs, elmNamespace, outputMode = 'html') {
  global.document = new Document();
  global.SVGElement = SVGElement;

  redom.mount(
    document.body,
    redom.el('main', { id: 'elm' })
  );

  const { Elm } = require(outputJs);
  const app = Elm[elmNamespace].init({
    node: document.getElementById('elm')
  });

  if (outputMode === 'html') {
    return document.body.innerHTML;
  } else {
    return document.body.innerText;
  }
}

module.exports = render;

require('jsdom-global')();
const { Elm } = require('./main');

document.body.innerHTML = `<main id="elm"></main>`;

Elm.Main.init({
  node: document.getElementById('elm')
});

const html = document.body.innerHTML;
console.log(html);

const fs = require('fs');
const jsStringEscape = require('js-string-escape');
const path = require('path');

const formatContent = (s) => `const template = '${s}'; export { template };`;
const formatFile = (f) => {
  const removeExtension = (f) => {
    const l = path.extname(f).length;
    return f.slice(0, f.length - l);
  };
  return removeExtension(f) + '.ts';
};

const load = (f) => fs.readFileSync(f, { encoding: 'utf-8' });
const save = (f, d) => fs.writeFileSync(f, d, { encodint: 'utf-8' });
const htmlToTs = (of) => {
  const oc = load(of);
  const nf = formatFile(of);
  const nc = formatContent(jsStringEscape(oc));
  save(nf, nc);
};

const dir = process.argv[2];
fs.readdirSync(dir).forEach((file) => {
  if (file.match(/\.html/)) {
    htmlToTs(path.join(dir, file));
  }
});

const fs = require('fs');
const jsStringEscape = require('js-string-escape');
const path = require('path');

const formatContent = (s) => `const template = '${s}'; export { template };`;
const formatFile = (f) => {
  const removeExtension = (f, dst) => {
    const l = path.extname(f).length;
    return f.slice(0, f.length - l);
  };
  const p = removeExtension(f) + '.ts';
  return path.join(dst, path.basename(p));
};

const load = (f) => fs.readFileSync(f, { encoding: 'utf-8' });
const save = (f, d) => fs.writeFileSync(f, d, { encodint: 'utf-8' });
const htmlToTs = (of, dir) => {
  const oc = load(of);
  const nf = formatFile(of, dst);
  const nc = formatContent(jsStringEscape(oc));
  save(nf, nc);
};

const src = process.argv[2];
const dst = process.argv[3];
fs.readdirSync(src).forEach((file) => {
  if (file.match(/\.html/)) {
    htmlToTs(path.join(src, file), dst);
  }
});

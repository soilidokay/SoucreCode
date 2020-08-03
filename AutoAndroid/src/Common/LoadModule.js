let fs = require("fs");
const requireFromString = require('require-from-string');

const RequireDynamic = (path) => {
  let text = fs.readFileSync(path);
  return requireFromString(text.toString());
};

module.exports = RequireDynamic;

let globals = new Map();

globals.set("pageTitle", "feedMyPixel - Software solutions - Ben Chidgey");
globals.set("currentYear", new Date().getFullYear());

const init = (env) =>
  globals.forEach((value, key) => env.addGlobal(key, value));

module.exports = init;

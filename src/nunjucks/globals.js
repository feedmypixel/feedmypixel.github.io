let globals = new Map()

globals.set(
  'pageTitle',
  'feedMyPixel - Consultant Software engineer - Ben Chidgey'
)

const init = (env) => globals.forEach((value, key) => env.addGlobal(key, value))

module.exports = init

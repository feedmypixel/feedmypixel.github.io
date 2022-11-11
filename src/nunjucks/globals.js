let globals = new Map()

globals.set('pageTitle', 'feedMyPixel - Web based things - Ben Chidgey')

const init = (env) => globals.forEach((value, key) => env.addGlobal(key, value))

module.exports = init

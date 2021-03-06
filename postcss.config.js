module.exports = (ctx) => ({
  parser: ctx.file.extname === '.sss' ? ctx.options.parser : false,
  map: ctx.options.map,
  plugins: {
    'postcss-pxtorem': {
      rootValue: 16,
      unitPrecision: 5,
      selectorBlackList: [],
      replace: false,
      mediaQuery: true,
      minPixelValue: 0,
      propWhiteList: [
        'font',
        'font-size',
        'line-height',
        'letter-spacing',
        'padding',
        'padding-top',
        'padding-right',
        'padding-bottom',
        'padding-left',
        'margin',
        'margin-top',
        'margin-right',
        'margin-bottom',
        'margin-left',
        'width',
        'height',
        'border-radius',
        'letter-spacing'
      ]
    }
  }
})

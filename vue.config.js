const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
    .set('@', resolve('src'))
    .set('@views', resolve('src/views'))
    config.module
    .rule('vue')
    .use('vue-loader')
    .loader('vue-loader')
    .tap(options => {
      // 修改它的选项...
      options.hotReload = true
      return options
    })
  },
  devServer: {
    port: 8081,
    inline: true,
    hot: true
  },
  css: {
    extract: true // 去除或改为 false
  },
  lintOnSave: true
}

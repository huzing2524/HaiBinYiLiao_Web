/**
 * Created by scott on 2019-03-14
 */
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_api', resolve('src/api'))
      .set('_assets', resolve('src/assets'))
      .set('_components', resolve('src/components'))
      .set('_views', resolve('src/views'))
      .set('_utils', resolve('src/utils'))
    config.module.rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end()
  },
  lintOnSave: true,
  devServer: {
    open: false, //配置自动启动浏览器
    https: false,
    proxy: {
      '/api': {
        /*
        管理员主页: 127.0.0.1:8000/boss
        医生主页: 127.0.0.1:8000/doctor
        */
        target: 'http://127.0.0.1:8000',
        // target: 'https://hb.tenv.dsdiot.com/hbapi/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/assets/styl/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: false
    }
  }
}

/*
 * @Description: 
 * @Date: 2022-11-10 14:13:10
 * @LastEditTime: 2022-11-28 00:29:40
 * @FilePath: \vue_test\vue.config.js
 */
module.exports = {

  //打包时去掉map文件
  // productionSourceMap: false,
  transpileDependencies: [],
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: 'http://localhost:9090/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    }
  }

}
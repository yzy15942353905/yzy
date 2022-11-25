module.exports = {

  //打包时去掉map文件
  // productionSourceMap: false,
  transpileDependencies: [],
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: 'http://127.0.0.1:80',
        
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    }
  }

}


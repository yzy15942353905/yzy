/*
 * @Description: 
 * @Date: 2022-11-10 14:13:10
 * @LastEditTime: 2022-12-07 15:51:41
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
  },
  /* svg 相关配置 */
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');
    // 清空默认svg规则
    svgRule.uses.clear();
    //针对svg文件添加svg-sprite-loader规则
    svgRule
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      });
  }


}
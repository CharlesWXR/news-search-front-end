const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  externals: {
    BMap: 'BMap'
  }
})

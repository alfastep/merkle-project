const path = require('path');

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    },
    clientLogLevel: 'info'
  },
  outputDir: path.resolve(__dirname, '../server/public'),
}
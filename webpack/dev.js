const { webpack } = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.dev.js');

const compiler = webpack(config);

const server = new WebpackDevServer(config.devServer, compiler);

server.startCallback(() => {
  console.log('Running dev server on port 8080');
});
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const path_1 = require('path');
const logger_1 = require('./logger');
function getWebpackEnv() {
  return Object.assign(Object.assign({}, process.env), {
    analyze: process.env.BUNDLE_ANALYZE === 'true',
    production: process.env.NODE_ENV === 'production',
    development: process.env.NODE_ENV === 'development',
  });
}
function loadConfig(configPath) {
  const content = require(configPath);
  if (typeof content === 'function') {
    return content(getWebpackEnv());
  }
  return content;
}
function debug(configPath, port) {
  const webpack = require('webpack');
  const WebpackDevServer = require('webpack-dev-server');
  const config = loadConfig(configPath);
  const options = Object.assign(Object.assign({}, config.devServer), { port, static: (0, path_1.dirname)(configPath) });
  const server = new WebpackDevServer(webpack(config), options);
  const host = '0.0.0.0';
  server.listen(port, host, err => {
    if (err) {
      (0, logger_1.logWarn)(`Error: ${err}`);
    } else {
      (0, logger_1.logInfo)(`Listening at http://${host}:${port}`);
    }
  });
}
process.on('message', ({ source, port }) => debug(source, port));

const path = require('path')
const nodeExternals = require('webpack-node-externals');
const glob = require('glob');

module.exports = {
  entry: './bin/server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'api.bundle.js'
  },
  target: 'node',
  externals: [nodeExternals()],
};
/* eslint-disable @typescript-eslint/no-var-requires */
const createWebpackConfig = require('@link/common/scripts/createWebpackConfig');
const pkg = require('./package.json');
const exposes = require('./exposes');

module.exports = createWebpackConfig({
  appName: 'keypeople',
  pkg,
  exposes,
  cwd: __dirname,
});

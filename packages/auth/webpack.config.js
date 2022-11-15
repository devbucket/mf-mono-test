/* eslint-disable @typescript-eslint/no-var-requires */
const createWebpackConfig = require('@link/common/scripts/createWebpackConfig');
const pkg = require('./package.json');
const exposes = require('./exposes');

module.exports = createWebpackConfig({
  appName: 'auth',
  pkg,
  exposes,
  cwd: __dirname,
});

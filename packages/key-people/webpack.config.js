/* eslint-disable @typescript-eslint/no-var-requires */
const createWebpackConfig = require('@link/common/scripts/createWebpackConfig');

const exposes = require('./exposes');
const pkg = require('./package.json');

module.exports = createWebpackConfig({
  appName: 'keypeople',
  pkg,
  exposes,
  cwd: __dirname,
});

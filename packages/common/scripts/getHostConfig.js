/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

/**
 * Note
 * - Point ENV_PATH to the directory where your .env file is located.
 * - Make sure, your .env file contains:
 *   - REACT_APP_API (Auth endpoint to get the token from)
 *   - REACT_APP_GRAPHQL_URI (GraphQL endpoint to get the schema from)
 *   - LINK_USER_NAME (username used to log in to the Link+ web application)
 *   - LINK_PASSWORD (password used to log in to the Link+ web application)
 */
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '..', '.env') });

module.exports = function getHostConfig(appName) {
  const HOST_CONFIG = Object.keys(process.env)
    .filter((key) => !(!key.startsWith('REACT_APP_MF_APP_')))
    .reduce((acc, key) => {
      const url = new URL(process.env[key] || 'http://localhost');
      const internalHost = process.env[`${key}_INTERNAL`] || '0.0.0.0';

      const remoteName = key.replace('REACT_APP_MF_APP_', '')
        .toLowerCase()
        .trim();

      return {
        ...acc,
        [remoteName]: {
          internalHost,
          port: url.port || 80,
          publicPath: url.href,
        },
        apps: {
          ...acc.apps || {},
          [remoteName]: `${remoteName}@${url.href}remoteEntry.js`,
        },
        remotes: {
          ...acc.remotes || {},
          ...(appName !== remoteName) && {
            [remoteName]: `${remoteName}@${url.href}remoteEntry.js`,
          },
        },
        ignored: [
          ...acc.ignored || [],
          remoteName,
        ],
      };
    }, {});

  HOST_CONFIG.ignored = HOST_CONFIG.ignored.length > 0 ? `^((${HOST_CONFIG.ignored.join(')|(')}))/.+` : '';

  return HOST_CONFIG;
};

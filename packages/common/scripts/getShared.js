module.exports = function getShared(pck) {
  return {
    react: {
      singleton: true,
      requiredVersion: pck.dependencies.react,
    },
    'react-dom': {
      singleton: true,
      requiredVersion: pck.dependencies['react-dom'],
    },
    'react-router-dom': {
      singleton: true,
      requiredVersion: pck.dependencies['react-router-dom'],
    },
    'react-jss': {
      singleton: true,
      requiredVersion: pck.dependencies['react-jss'],
    },
    'react-i18next': {
      singleton: true,
      requiredVersion: pck.dependencies['react-i18next'],
    },
    'react-helmet': {
      singleton: true,
      requiredVersion: pck.dependencies['react-helmet'],
    },
    '@apollo/client': {
      singleton: true,
      requiredVersion: pck.dependencies['@apollo/client'],
    },
    zustand: {
      singleton: true,
      requiredVersion: pck.dependencies.zustand,
    },
    '@emotion/react': {
      singleton: true,
      requiredVersion: pck.dependencies['@emotion/react'],
    },
  };
};

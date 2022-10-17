'use strict';
const _ = require('lodash');
const path = require('path');
const strapiCacheSrcPath = path.resolve(__dirname, "../../.cache/admin/src");

module.exports = (config, webpack) => {
  // Note: we provide webpack above so you should not `require` it
  // Perform customizations to webpack config
  // Important: return the modified config
  _.set(config, 'resolve.alias.assets', path.resolve(__dirname, './assets'));

  config.plugins.push(
    new webpack.NormalModuleReplacementPlugin(
      /admin\/src\/pages\/HomePage(.*).js/,
      (resource) => {
        if (resource.createData.resource) {
          const replacedFilePath = resource.createData.resource.replace(strapiCacheSrcPath, path.resolve(__dirname, 'src'));
          if (replacedFilePath.endsWith('.js')) {
            resource.createData.resource = replacedFilePath;
          }
        }
      }
    )
  );

  return config;
};
// /Users/ricardobento/Documents/STRAPI/strapi-amigao-cms/node_modules/@strapi/admin/admin/src/pages/HomePage
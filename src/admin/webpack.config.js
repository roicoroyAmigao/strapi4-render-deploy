'use strict';
const _ = require('lodash');
const path = require('path');
const strapiCacheSrcPath = path.resolve(__dirname, "../../.cache/admin/src");

const firebase = require("firebase/app");

const config = {
    firebase: {
        apiKey: "AIzaSyDrZpLnEWCzbAB2iXM1uizR8J9Z8iP414c",
        authDomain: "amigao-fcm.firebaseapp.com",
        projectId: "amigao-fcm",
        storageBucket: "amigao-fcm.appspot.com",
        messagingSenderId: "139473613556",
        appId: "1:139473613556:web:84143a5ba3fc3381bea4a1",
        measurementId: "G-DW9N8LQLDQ"
    },
};
firebase.initializeApp(config);

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
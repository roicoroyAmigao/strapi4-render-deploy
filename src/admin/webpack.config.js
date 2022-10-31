'use strict';
const _ = require('lodash');
const path = require('path');
const strapiCacheSrcPath = path.resolve(__dirname, "../../.cache/admin/src");

const firebase = require("firebase/app");

const config = {
  firebase: {
    apiKey: "AIzaSyCs09xqa2_RWVavWnSOIKkzjd4KI4XpL5c",
    authDomain: "strapi-blog-news.firebaseapp.com",
    projectId: "strapi-blog-news",
    storageBucket: "strapi-blog-news.appspot.com",
    messagingSenderId: "948746915670",
    appId: "1:948746915670:web:42e856b4e661ca1d9110f7",
    measurementId: "G-9WE85KYXY7"
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
const pluginPkg = require('../../settings.json');

const pluginId = pluginPkg.name;// .replace(/^(@[^-,.][\w,-]+\/|strapi-)plugin-/i, '');

module.exports = pluginId;

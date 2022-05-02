const { sep } = require('path');
const config = (module.exports = require('openmrs/default-webpack-config'));
config.scriptRuleConfig.exclude =
  sep == '/'
    ? /(node_modules[^\/@openmrs\/esm\-patient\-common\-lib])/
    : /(node_modules[^\\@openmrs\/esm\-patient\-common\-lib])/;
module.exports = config;

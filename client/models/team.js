// team Model - team.js
var AmpState = require('ampersand-state');
var PersonCollection = require('./person-collection');


module.exports = AmpState.extend({
  collections: {
    members: PersonCollection
  }
});

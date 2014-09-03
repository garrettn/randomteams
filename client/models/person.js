// Person Model - person.js
var AmpModel = require('ampersand-model');


module.exports = AmpModel.extend({
  props: {
    id: 'number',
    name: ['string', true, '']
  }
});

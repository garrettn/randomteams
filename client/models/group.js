// Group Model - group.js
var AmpModel = require('ampersand-model');


module.exports = AmpModel.extend({
  props: {
    id: 'number',
    name: ['string', true, '']
  },
  derived: {
    pageUrl: {
      deps: ['id'],
      fn: function () {
        return '/groups/' + this.id;
      }
    }
  }
});

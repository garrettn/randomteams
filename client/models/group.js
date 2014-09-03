// Group Model - group.js
var AmpModel = require('ampersand-model');
var PersonCollection = require('./person-collection');


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
  },
  collections: {
    people: PersonCollection
  }
});

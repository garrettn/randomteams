// Group Model - group.js
var AmpModel = require('ampersand-model');
var PersonCollection = require('./person-collection');


module.exports = AmpModel.extend({
  props: {
    id: 'number',
    name: ['string', true, '']
  },
  session: {
    teamSize: ['number', true, 2]
  },
  derived: {
    pageUrl: {
      deps: ['id'],
      fn: function () {
        return '/groups/' + this.id;
      }
    },
    teamGeneratorUrl: {
      deps: ['id', 'teamSize'],
      fn: function () {
        return '/groups/' + this.id + '/teams/' + this.teamSize;
      }
    }
  },
  collections: {
    people: PersonCollection
  }
});

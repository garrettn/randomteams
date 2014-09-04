// Group Model - group.js
var _ = require('underscore');
var AmpModel = require('ampersand-model');
var PersonCollection = require('./person-collection');
var TeamCollection = require('./team-collection');


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
  },
  createRandomTeams: function () {
    var shuffled = this.people.shuffle();
    return this.addToTeamCollection(new TeamCollection(), shuffled);
  },
  addToTeamCollection: function (collection, remaining) {
    if (remaining.length === 0) {
      return collection;
    }

    collection.add({members: _.take(remaining, this.teamSize)});
    return this.addToTeamCollection(collection, _.rest(remaining, this.teamSize));
  }
});

var View = require('ampersand-view');
var teamsPageTemplate = require('../templates/pages/teams.jade');
var TeamView = require('../views/team');


module.exports = View.extend({
    template: teamsPageTemplate,
    render: function () {
      this.renderWithTemplate();
      this.renderCollection(this.collection, TeamView, this.queryByHook('teams'));
    },
    bindings: {
      'model.name': {
        type: 'text',
        hook: 'group-name'
      },
      'model.teamSize': {
        type: 'text',
        hook: 'team-size'
      },
      'model.pageUrl': {
        type: 'attribute',
        hook: 'group-page',
        name: 'href'
      }
    },
    events: {
      'click [data-hook~=generate-new]': 'generateNewTeams'
    },
    generateNewTeams: function () {
      this.collection.reset(this.model.createRandomTeams().models);
    }
});

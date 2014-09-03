var View = require('ampersand-view');
var teamsPageTemplate = require('../templates/pages/teams.jade');


module.exports = View.extend({
    template: teamsPageTemplate,
    bindings: {
      'model.name': {
        type: 'text',
        hook: 'group-name'
      },
      'model.teamSize': {
        type: 'text',
        hook: 'team-size'
      }
    }
});

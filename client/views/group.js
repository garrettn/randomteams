var View = require('ampersand-view');
var groupTemplate = require('../templates/partials/group.jade');


module.exports = View.extend({
    template: groupTemplate,
    bindings: {
      'model.name': {
        type: 'text',
        hook: 'group-name'
      },
      'model.pageUrl': {
        type: 'attribute',
        hook: 'group-link',
        name: 'href'
      },
      'model.people.length': {
        type: 'text',
        hook: 'group-number'
      }
    }
});

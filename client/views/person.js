var View = require('ampersand-view');
var personTemplate = require('../templates/partials/person.jade');


module.exports = View.extend({
    template: personTemplate,
    bindings: {
      'model.name': {
        type: 'text',
        hook: 'name'
      }
    }
});

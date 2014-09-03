var View = require('ampersand-view');
var groupPageTemplate = require('../templates/pages/group.jade');
var PersonView = require('../views/person');


module.exports = View.extend({
    template: groupPageTemplate,
    initialize: function () {
      this.pageTitle = this.model.name;
    },
    render: function () {
      this.renderWithTemplate();
      this.renderCollection(this.model.people, PersonView, this.queryByHook('people'));
      return this;
    },
    bindings: {
      'model.name': {
        type: 'text',
        hook: 'group-name'
      }
    }
});

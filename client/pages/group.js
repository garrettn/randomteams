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

      this.cacheElements({
          nameField: '[data-hook~=new-person-name]'
      });

      return this;
    },
    bindings: {
      'model.name': {
        type: 'text',
        hook: 'group-name'
      },
      'model.teamSize': {
        type: 'value',
        hook: 'team-size'
      },
      'model.people.length': {
        type: 'attribute',
        hook: 'team-size',
        name: 'max'
      },
      'model.teamGeneratorUrl': {
        type: 'attribute',
        hook: 'team-generator-url',
        name: 'href'
      }
    },
    events: {
      'change [data-hook~=team-size]': 'changeTeamSize',
      'submit [data-hook~=new-person]': 'addPerson'
    },
    // For some reason the binding won't actually update the model.
    changeTeamSize: function (e) {
      this.model.teamSize = parseInt(e.target.value);
    },
    addPerson: function (e) {
      e.preventDefault();
      var name = this.nameField.value;
      if (name.length > 0) {
        this.model.people.create({name: name}, {
          wait: true,
          success: function (person) {
            this.nameField.value = '';
          }.bind(this)
        })
      }
    }
});

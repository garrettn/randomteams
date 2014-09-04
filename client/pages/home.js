var PageView = require('./base');
var GroupView = require('../views/group');
var GroupModel = require('../models/group');
var homeTemplate = require('../templates/pages/home.jade');


module.exports = PageView.extend({
    pageTitle: 'home',
    template: homeTemplate,
    render: function () {
      this.renderWithTemplate();
      this.renderCollection(this.collection, GroupView, this.queryByHook('groups'));

      this.cacheElements({
          nameField: '[data-hook~=new-group-name]'
      });

      return this;
    },
    events: {
      'submit [data-hook~=new-group]': 'createNewGroup'
    },
    createNewGroup: function (e) {
      e.preventDefault();
      var name = this.nameField.value;
      if (name.length > 0) {
        this.collection.create({name: name}, {
          wait: true,
          success: function (group) {
            this.trigger('navigate', group.pageUrl);
          }.bind(this)
        });
      }
    }
});

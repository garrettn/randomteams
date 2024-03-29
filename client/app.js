/*global app*/
var _ = require('underscore');
var logger = require('andlog');
var config = require('clientconfig');

var Router = require('./router');

var GroupsCollection = require('./models/group-collection');

var MainView = require('./views/main');
var HomePageView = require('./pages/home');
var GroupPageView = require('./pages/group');
var TeamsPageView = require('./pages/teams');
var domReady = require('domready');


var app = {
    // this is the the whole app initter
    blastoff: function () {
        // init our URL handlers and the history tracker
        this.router = new Router();

        this.groups = new GroupsCollection();

        // wait for document ready to render our main view
        // this ensures the document has a body, etc.
        domReady(function () {
            // init our main view
            this.mainView = new MainView({
                el: document.body
            });

            // ...and render it
            this.mainView.render();

            this.mainView.on('navigate', this.navigate, this);
            this.router.on('route:home', this.showHomePage, this);
            this.router.on('route:group', this.showGroupPage, this);
            this.router.on('route:teams', this.showRandomTeams, this);

            // we have what we need, we can now start our router and show the appropriate page
            this.router.history.start({pushState: true, root: '/'});
        }.bind(this));
    },

    // This is how you navigate around the app.
    // this gets called by a global click handler that handles
    // all the <a> tags in the app.
    // it expects a url without a leading slash.
    // for example: "costello/settings".
    navigate: function (page) {
        var url = (page.charAt(0) === '/') ? page.slice(1) : page;
        this.router.history.navigate(url, {trigger: true});
    },

    showHomePage: function () {
      this.mainView.setNewPage(new HomePageView({
        collection: this.groups
      }));
      if (!this.groups.length) {
        this.groups.fetch();
      }
    },

    showGroupPage: function (id) {
      this.groups.getOrFetch(parseInt(id), {all: true}, function (err, group) {
        if (!err) {
          this.mainView.setNewPage(new GroupPageView({
            model: group
          }));
        }
      }.bind(this));
    },

    showRandomTeams: function (id, size) {
      this.groups.getOrFetch(parseInt(id), {all: true}, function (err, group) {
        if (!err) {
          group.teamSize = parseInt(size);
          var teams = group.createRandomTeams();
          this.mainView.setNewPage(new TeamsPageView({
            model: group,
            collection: teams
          }));
        }
      }.bind(this));
    }
};

// run it
app.blastoff();

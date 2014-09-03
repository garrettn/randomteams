/*global app*/
var _ = require('underscore');
var logger = require('andlog');
var config = require('clientconfig');

var Router = require('./router');
var MainView = require('./views/main');
var HomePageView = require('./pages/home');
var domReady = require('domready');


var app = {
    // this is the the whole app initter
    blastoff: function () {
        // init our URL handlers and the history tracker
        this.router = new Router();

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
            this.router.on('route:collections', this.showCollectionsPage, this);

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
      this.mainView.setNewPage(new HomePageView());
    },

    showCollectionsPage: function () {
      alert('Collections!');
    }
};

// run it
app.blastoff();

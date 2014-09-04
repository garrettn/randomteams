// team Collection - team-collection.js
var AmpCollection = require('ampersand-collection');
var Team = require('./team');


module.exports = AmpCollection.extend({
    model: Team
});

var _ = require('underscore');

var groups = [
  {
    id: 1,
    name: 'Our People'
  },
  {
    id: 2,
    name: 'Other People'
  }
];
var id = 2;

function get(id) {
    return _.findWhere(groups, {id: parseInt(id + '', 10)});
}

exports.name = 'fake_api';
exports.version = '0.0.0';
exports.register = function (plugin, options, next) {
    plugin.route({
        method: 'GET',
        path: '/api/groups',
        handler: function (request, reply) {
            reply(groups);
        }
    });

    plugin.route({
        method: 'POST',
        path: '/api/groups',
        handler: function (request, reply) {
            var person = request.payload;
            person.id = id++;
            groups.push(person);
            reply(person).code(201);
        }
    });

    plugin.route({
        method: 'GET',
        path: '/api/groups/{id}',
        handler: function (request, reply) {
            var found = get(request.params.id);
            reply(found).code(found ? 200 : 404);
        }
    });

    plugin.route({
        method: 'DELETE',
        path: '/api/groups/{id}',
        handler: function (request, reply) {
            var found = get(request.params.id);
            if (found) groups = _.without(groups, found);
            reply(found).code(found ? 200 : 404);
        }
    });

    plugin.route({
        method: 'PUT',
        path: '/api/groups/{id}',
        handler: function (request, reply) {
            var found = get(request.params.id);
            if (found) _.extend(found, request.payload);
            reply(found).code(found ? 200 : 404);
        }
    });

    next();
};

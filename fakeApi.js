var _ = require('underscore');

var groups = [
  {
    id: 1,
    name: 'Our People',
    people: [
      { id: 1, name: 'Jack' },
      { id: 2, name: 'Kate' },
      { id: 3, name: 'Sawyer'},
      { id: 4, name: 'John'},
      { id: 5, name: 'Charlie'},
      { id: 6, name: 'Claire'},
      { id: 7, name: 'Hurley'},
      { id: 8, name: 'Sayid'},
      { id: 9, name: 'Sun'},
      { id: 10, name: 'Jin'}
    ]
  },
  {
    id: 2,
    name: 'Other People',
    people: [
      { id: 11, name: 'Ben' },
      { id: 12, name: 'Juliette' },
      { id: 13, name: 'Tom' },
      { id: 14, name: 'Ethan' },
      { id: 15, name: 'Goodwin' },
      { id: 16, name: 'Pickett' },
      { id: 17, name: 'Mikhail' },
      { id: 18, name: 'Richard' },
      { id: 19, name: 'Alex' },
      { id: 20, name: 'Carl' }
    ]
  }
];
var id = groups.length + 1;

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

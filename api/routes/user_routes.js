'use strict';

let usersController = require('./../controllers/users_controller');

module.exports = function(server) {
    server.post('/v1/users', usersController.createUser);
}

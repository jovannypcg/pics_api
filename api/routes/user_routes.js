'use strict';

let usersController = require('./../controllers/users_controller');
let snapsController = require('./../controllers/snaps_controller');

module.exports = function(server) {
    server.post('/v1/users', usersController.createUser);
    server.get('/v1/users/:user_id/snaps', snapsController.getSnaps);
}

'use strict';

let snapsController = require('./../controllers/snaps_controller');

module.exports = function(server) {
    server.post('/v1/snaps', snapsController.createSnap);
}

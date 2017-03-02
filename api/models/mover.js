'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/**
 * Defines the properties of movers.
 *
 * - Types of mover:
 *     - HELPER
 *     - DRIVER
 */
let MoverSchema = new Schema({
    first_name  : String,
    last_name   : String,
    birthdate   : Date,
    license     : String,
    picture     : String,
    type        : { type: String, default: 'HELPER' }
}, { collection: 'mover', timestamps: { createdAt: 'created_at' } });

/**
 * Statics
 */
MoverSchema.statics.load = function(id, cb) {
    this.findOne({ _id: id }).exec(cb);
};

mongoose.model('Mover', MoverSchema);

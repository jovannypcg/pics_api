'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

mongoose.Promise = require('bluebird');

/**
 * Defines the properties of a user.
 */
let UserSchema = new Schema({
    first_name  : String,
    last_name   : String,
    email       : { type: String, trim: true, lowercase: true },
    phone_number: { type: String, trim: true },
    picture     : String,
    password    : String,
    moves       : [{ type: Schema.Types.ObjectId, ref: 'Move' }]
}, { collection: 'user', timestamps: { createdAt: 'created_at' } });

/**
 * Statics
 */
UserSchema.statics.load = function(id, cb) {
    this.findOne({ _id: id }).exec(cb);
};

module.exports = mongoose.model('User', UserSchema);

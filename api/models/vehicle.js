'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/**
 * Defines the properties of vehicles.
 */
let VehicleSchema = new Schema({
    trademark : String,
    model     : String,
    year      : Number,
    picture   : String,
    type      : String,
    plate     : String
}, { collection: 'vehicle', timestamps: { createdAt: 'created_at' } });

/**
 * Statics
 */
VehicleSchema.statics.load = function(id, cb) {
    this.findOne({ _id: id }).exec(cb);
};

mongoose.model('Vehicle', VehicleSchema);

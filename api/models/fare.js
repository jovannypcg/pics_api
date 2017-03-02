'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/**
 * Defines the properties of a fare.
 * There will be fares of multiple types. The types are
 * based on the vehicles. For instance, a fare for a pickup, another
 * for a van, for a truck, and so on.
 *
 * Fares with status 'CURRENT' will be shown in the UI.
 *
 * - Statuses for fares:
 *     - CURRENT
 *     - HISTORICAL
 */
let FareSchema = new Schema({
    base                : Number,
    traveled_kilometer  : Number,
    minute_of_labor     : Number,
    type                : String,
    status              : { type: String, default: 'CURRENT', trim: true }
}, { collection: 'fare', timestamps: { createdAt: 'created_at' } });

/**
 * Statics
 */
FareSchema.statics.load = function(id, cb) {
    this.findOne({ _id: id }).exec(cb);
};

mongoose.model('Fare', FareSchema);

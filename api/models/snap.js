'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let SnapSchema = new Schema({
    user            : { type: Schema.Types.ObjectId, ref: 'User' },
    pics            : [{ type: String, trim: true }],
    location        : { type: String, trim: true, uppercase: true },
    cause           : { type: String, trim: true },
    description     : { type: String, trim: true },
    ph_os_version   : String,
    ph_brand        : String,
    ph_manufacturer : String,
    ph_model        : String,
    ph_serial       : String,
    ph_device       : String
}, {
    collection: 'snap',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

/**
 * Statics
 */
SnapSchema.statics.load = function(id, cb) {
    this.findOne({ _id: id }).exec(cb);
};

module.exports = mongoose.model('Snap', SnapSchema);

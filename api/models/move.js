'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/**
 * Defines the properties of a move.
 *
 * - Move statuses:
 *     - PENDING
 *     - IN_PROGRESS
 *     - DONE
 *     - CANCELLED
 */
let MoveSchema = new Schema({
    from            : String,
    to              : String,
    description     : { type: String, trim: true },
    picture         : String,
    status          : { type: String, default: 'PENDING', trim: true },
    movers          : [{ type: Schema.Types.ObjectId, ref: 'Mover' }],
    vehicle         : { type: Schema.Types.ObjectId, ref: 'Vehicle' },
    start           : Date,
    end             : Date,
    fare            : { type: Schema.Types.ObjectId, ref: 'Fare' },
    estimated_price : Number,
    final_price     : Number
}, { collection: 'move', timestamps: { createdAt: 'created_at' } });

/**
 * Statics
 */
MoveSchema.statics.load = function(id, cb) {
    this.findOne({ _id: id }).exec(cb);
};

mongoose.model('Move', MoveSchema);

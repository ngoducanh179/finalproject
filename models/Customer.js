const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    user: {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    history: [
        {
            centerId: {
                type: moongoose.Schema.Types.ObjectId,
                ref: 'center'
            },
            from: {
                type: Date
            },
            to: {
                type: Date
            },
        }
    ],
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = Customer = mongoose.model('customer', CustomerSchema);

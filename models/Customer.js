const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    history: [
        {
            centerId: {
                type: mongoose.Schema.Types.ObjectId,
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
    location: {
        longitude: {
            type: String
        },
        latitude: {
            type: String
        },
        address: {
            type: String
        }
    },
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

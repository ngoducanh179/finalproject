const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    sex: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    hobies: [
        {
            type: String,
        }
    ],
    avatar: {
        type: String
      },
    fromWhere: {
        type: String
    },
    search: {
        type: String,
        text: true
    },
    workedAt: [
        {
            where: {
                type: String
            },
            from: {
                type: String
            },
            to: {
                type: String
            }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    history: [
        {
            centerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'center'
            },
            kindOfSport: {
                type: String
            },
            from: {
                type: Date
            },
            to: {
                type: Date
            },
            price:{
                type: String
            },
            status: {
                type: String
            },
            note: {
                type: String
            }
        }
    ],
    bio: {
        type: String
      },
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
    status: {
        type: String
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


const moongoose = require('mongoose');

const CenterSchema = new moongoose.Schema({
  user: {
    type: moongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  gymname: {
    type: String
  },
  website: {
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
    type: String,
    required: true
  },
  sports: {
    gym: {
      perhour: {
        type: Number
      },
      perhalfaday: {
        type: Number
      },
      perday: {
        type: Number
      },
      permonth: {
        type: Number
      },
      status: {
        type: Boolean
      }
    },
    yoga: {
      perhour: {
        type: Number
      },
      perhalfaday: {
        type: Number
      },
      perday: {
        type: Number
      },
      permonth: {
        type: Number
      },
      status: {
        type: Boolean
      }
    },
    dance: {
      perhour: {
        type: Number
      },
      perhalfaday: {
        type: Number
      },
      perday: {
        type: Number
      },
      permonth: {
        type: Number
      },
      status: {
        type: Boolean
      }
    }
  },
  customerUsed: [
    {
      userId: {
        type :String
      },
      username: {
        type:String
      },
      from: {
        type: Date
      },
      to: {
        type: Date
      },
      product: {
        type: String
      }
    }
  ],
  bio: {
    type: String
  },
  follower: {
    type: [String] 
  },
  following: {
    type: [String]
  },
  evaluation: [{
    userId: {
      type: String
    },
    star: {
      type: Number,
    },
    text: {
      type: String,
    }
  }],
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
    linkedin: {
      type: String
    },
    instagram: {
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

module.exports = Center = moongoose.model('Center', CenterSchema);
const moongoose = require('mongoose');

const CenterSchema = new moongoose.Schema({
  user: {
    type: moongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  centerName: {
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
  from:{
    type:String
  },
  avatar: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  search: {
    type: String,
    text: true
  },
  sports: {
    gym: {
      perhour: {
        type: Number,
        default: 0,
      },
      perhalfaday: {
        type: Number,
        default: 0,
      },
      perday: {
        type: Number,
        default: 0,
      },
      perhalfmonth: {
        type: Number,
        default: 0,
      },
      permonth: {
        type: Number,
        default: 0,
      },
      status: {
        type: Boolean
      }
    },
    yoga: {
      perhour: {
        type: Number,
        default: 0,
      },
      perhalfaday: {
        type: Number,
        default: 0,
      },
      perday: {
        type: Number,
        default: 0,
      },
      perhalfmonth: {
        type: Number
      },
      permonth: {
        type: Number,
        default: 0,
      },
      status: {
        type: Boolean
      }
    },
    dance: {
      perhour: {
        type: Number,
        default: 0,
      },
      perhalfaday: {
        type: Number,
        default: 0,
      },
      perday: {
        type: Number,
        default: 0,
      },
      perhalfmonth: {
        type: Number
      },
      permonth: {
        type: Number,
        default: 0,
      },
      status: {
        type: Boolean
      }
    },
    boxing: {
      perhour: {
        type: Number,
        default: 0,
      },
      perhalfaday: {
        type: Number,
        default: 0,
      },
      perday: {
        type: Number,
        default: 0,
      },
      perhalfmonth: {
        type: Number
      },
      permonth: {
        type: Number,
        default: 0,
      },
      status: {
        type: Boolean
      }
    },
    badminton: {
      perhour: {
        type: Number,
        default: 0,
      },
      perhalfaday: {
        type: Number,
        default: 0,
      },
      perday: {
        type: Number,
        default: 0,
      },
      perhalfmonth: {
        type: Number
      },
      permonth: {
        type: Number,
        default: 0,
      },
      status: {
        type: Boolean
      }
    },
    swimming: {
      perhour: {
        type: Number,
        default: 0,
      },
      perhalfaday: {
        type: Number,
        default: 0,
      },
      perday: {
        type: Number,
        default: 0,
      },
      perhalfmonth: {
        type: Number
      },
      permonth: {
        type: Number,
        default: 0,
      },
      status: {
        type: Boolean
      }
    },
    soccer: {
      perhour: {
        type: Number,
        default: 0,
      },
      perhalfaday: {
        type: Number,
        default: 0,
      },
      perday: {
        type: Number,
        default: 0,
      },
      perhalfmonth: {
        type: Number
      },
      permonth: {
        type: Number,
        default: 0,
      },
      status: {
        type: Boolean
      }
    },
    tennis: {
      perhour: {
        type: Number,
        default: 0,
      },
      perhalfaday: {
        type: Number,
        default: 0,
      },
      perday: {
        type: Number,
        default: 0,
      },
      perhalfmonth: {
        type: Number
      },
      permonth: {
        type: Number,
        default: 0,
      },
      status: {
        type: Boolean
      }
    },
  },
  customerUsed: [
    {
      userId: {
        type: String
      },
      username: {
        type: String
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

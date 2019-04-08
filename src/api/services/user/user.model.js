const mongoose = require("mongoose");
const httpStatus = require("http-status");
const { omitBy, isNil } = require("lodash");
const bcrypt = require("bcryptjs");
const moment = require("moment-timezone");
const jwt = require("jwt-simple");
import crypto from 'crypto';
const uuidv4 = require("uuid/v4");
import SHA256 from "sha256";
const APIError = require("../../utils/APIError");
const {
  env,
  jwtSecret,
  jwtExpirationInterval
} = require("../../../config/vars");

/**
 * User Roles
 */
const roles = ["user", "admin"];
/** 
 * User Profile
 * @private
*/
const UserProfile = new mongoose.Schema({
  
  name: {
    type: String,
    optional: true
  },
  firstName: {
    optional: true,
    type: String
  },
  lastName: {
    optional: true,
    type: String
  },
  nickame: {
    optional: true,
    type: String
  },
  url: {
    optional: true,
    type: String
  },
  phone: {
    optional: true,
    type: String
  },
  pic: {
    optional: true,
    type: String
  },
  medium: {
    optional: true,
    type: String
  },
  low: {
    optional: true,
    type: String
  },
  dob: {
    optional: true,
    type: Date
  },
  address: {
    optional: true,
    type: String
  },
  gender: {
    optional: true,
    type: String
  },
  desc: {
    optional: true,
    type: String
  },
  expertise: {
    optional: true,
    type: String
  },
  state: {
    optional: true,
    type: String
  },
  user_type: {
    optional: true,
    type: String,
    allowedValues: ["C", "P", "S", "T"]
  },
  company_id: {
    optional: true,
    type: String
  },
  role: {
    optional: true,
    type: String
  },
  access_key: {
    type: String,
    optional: true
  },
  is_demo_user: {
    type: Boolean,
    optional: true
  },
  acess_type: {
    type: String,
    optional: true
  },
  classIds: {
    type: [String],
    optional: true
  },
  schoolId: {
    type: [String],
    optional: true
  },
  passwordSetByUser: {
    type: Boolean,
    optional: true
  },
  sendMeSkillShapeNotification: {
    type: Boolean,
    optional: true
  },
  userType: {
    type: String,
    optional: true
  },
  about: {
    type: String,
    optional: true
  },
  currency: {
    type: String,
    optional: true
  },
  birthYear: {
    type: Number,
    optional: true
  },
  coords: {
    type: [Number], // [<longitude>, <latitude>]
    index: "2d", // create the geospatial index
    optional: true,
    decimal: true
  },
  stripeStatus: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },
});

/**
 * User Schema
 * @private
 */
const userSchema = new mongoose.Schema(
  {
    _id:{
      type:String
    },
    emails: [
      {
        address: {
          type: String,
          unique: true,
          required: true
        },
        verified: {
          type: Boolean,
          default: false
        }
      }
    ],
   
    services: {
      facebook: {},
      google: {},
      password: { bcrypt: String }
    },
    username: {
      type: String,
      // For accounts-password, either emails or username is required, but not both. It is OK to make this
      // optional here because the accounts-password package does its own validation.
      // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
      optional: true
    },
    profile:{
      type:UserProfile,
      optional:true
    },
    emails: {
      type: Array,
      // For accounts-password, either emails or username is required, but not both. It is OK to make this
      // optional here because the accounts-password package does its own validation.
      // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
      optional: true
    },
    createdAt: {
      type: Date,
      optional: true
    },
    roles: {
      type: Array,
      optional: true
    },
    "roles.$": {
      type: String,
      optional: true
    },
    media_access_permission: {
      type: String,
      optional: true
    },
    // this is used to know which service user have used for the sign-up process.
    sign_up_service: {
      type: String,
      optional: true
    },
    term_cond_accepted: {
      type: Boolean,
      optional: true
    },
    stripeCusIds: {
      type: Array,
      optional: true
    },
    "stripeCusIds.$":{
      type: String,
      optional: true
    },
    refresh_token:{
      type:String,
      optional:true
    },
    googleCalendarId:{
      type:String,
      optional:true
    },
    savedByUser:{
      type: Boolean,
      optional: true
    }
  }
);

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
userSchema.pre("save", async function save(next) {
  try {
    if (!this.isModified("services.password")) return next();
    const hash = await bcrypt.hash(SHA256(this.services.password.bcrypt), 10);
    this.services = { password: { bcrypt: hash } };
    return next();
  } catch (error) {
    return next(error);
  }
});

/**
 * Methods
 */
userSchema.method({
  transform() {
    const transformed = {};
    const fields = ["id", "name", "email", "picture", "role", "createdAt"];

    fields.forEach(field => {
      transformed[field] = this[field];
    });

    return transformed;
  },

  token() {
    const playload = {
      exp: moment()
        .add(jwtExpirationInterval, "minutes")
        .unix(),
      iat: moment().unix(),
      sub: this._id
    };
    return jwt.encode(playload, jwtSecret);
  },

  // checking if password is valid

async passwordMatches(password) {
  const encryptedPassword = crypto.createHash('sha256').update(password).digest('hex');
  return bcrypt.compareSync(encryptedPassword, this.services.password.bcrypt);
  }
});

/**
 * Statics
 */
userSchema.statics = {
  roles,

  /**
   * Get user
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async get(id) {
    try {
      let user;

      if (mongoose.Types.ObjectId.isValid(id)) {
        user = await this.findById(id).exec();
      }
      if (user) {
        return user;
      }

      throw new APIError({
        message: "User does not exist",
        status: httpStatus.NOT_FOUND
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Find user by email and tries to generate a JWT token
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async findAndGenerateToken(options) {
    const { email, password, refreshObject } = options;
    if (!email)
      throw new APIError({
        message: "An email is required to generate a token"
      });

    const user = await this.findOne({ "emails.address": email }).exec();
    const err = {
      status: httpStatus.UNAUTHORIZED,
      isPublic: true
    };
    if (password) {
      if (user && (await user.passwordMatches(password))) {
        return { user, accessToken: user.token() };
      }
      
      err.message = "Incorrect email or password";
    } else if (refreshObject && refreshObject.userEmail === email) {
      return { user, accessToken: user.token() };
    } else {
      err.message = "Incorrect email or refreshToken";
    }
    throw new APIError(err);
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ page = 1, perPage = 30, name, email, role }) {
    const options = omitBy({ name, email, role }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },

  /**
   * Return new validation error
   * if error is a mongoose duplicate key error
   *
   * @param {Error} error
   * @returns {Error|APIError}
   */
  checkDuplicateEmail(error) {
    if (
      error.code === 11000 &&
      (error.name === "BulkWriteError" || error.name === "MongoError")
    ) {
      return new APIError({
        message: "Validation Error",
        errors: [
          {
            field: "email",
            location: "body",
            messages: ['"email" already exists']
          }
        ],
        status: httpStatus.CONFLICT,
        isPublic: true,
        stack: error.stack
      });
    }
    return error;
  },

  async oAuthLogin({ service, id, email, name, picture }) {
    const user = await this.findOne({
      $or: [{ [`services.${service}`]: id }, { email }]
    });
    if (user) {
      user.services[service] = id;
      if (!user.name) user.name = name;
      if (!user.picture) user.picture = picture;
      return user.save();
    }
    const password = uuidv4();
    return this.create({
      services: { [service]: id },
      email,
      password,
      name,
      picture
    });
  }
};

/**
 * @typedef User
 */
module.exports = mongoose.model("User", userSchema);

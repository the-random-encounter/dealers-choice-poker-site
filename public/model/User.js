const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  display_name: {
    type: String,
    required: true
  },
  first_name: String,
  last_name: String,
  dob_year: {
    type: Number,
    required: true
  },
  dob_month: {
    type: Number,
    required: true
  },
  dob_day: {
    type: Number,
    required: true
  },
  address_street1: String,
  address_street2: String,
  address_city: String,
  address_state: String,
  address_zip: Number,
  address_country: String,
  phone_number: Number,
  payment_method: String,
  stored_cc_number: Number,
  stored_cc_name: String,
  stored_cc_exp_month: Number,
  stored_cc_exp_year: Number,
  stored_cc_cvv: Number,
  wallet: Number,
  profile_avatar: String,
  gender: String
});

const User = model('User', userSchema);

module.exports = User;

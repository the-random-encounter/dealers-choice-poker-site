import mongoose from 'mongoose';
import type User from '$lib/types/user';

const userSchema = new mongoose.Schema({
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
	dob: {
		type: Date,
		required: true
	},
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
	billing_street1: String,
	billing_street2: String,
	billing_city: String,
	billing_state: String,
	billing_zip: Number,
	billing_country: String,
  wallet: {
    type: Number,
    default: 0.00
  },
  profile_avatar: String,
  gender: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  last_login: {
    type: Date,
    default: Date.now
  },
  profile_level: {
    type: Number,
    default: 1
  },
  profile_exp: {
    type: Number,
    default: 0
  }
});

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

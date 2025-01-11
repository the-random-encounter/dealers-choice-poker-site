export const serializeNonPOJOs = (obj) => {
	return structuredClone(obj);
}

import type User from '$lib/types/user';

const one_day = 60 * 60 * 24;

export const EmailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const COOKIE_OPTIONS = {
	httpOnly: true,
	secure: true,
	path: '/',
	maxAge: one_day
} as const;

export function castUserToObject(user: any): User {

	return {
	username: user.username || null,
  password: user.password || null,
  email: user.email || null,
  display_name: user.display_name || null,
  first_name: user.first_name || null,
  last_name: user.last_name || null,
  dob_year: user.dob_year || null,
  dob_month: user.dob_month || null,
  dob_day: user.dob_day || null,
  address_street1: user.address_street1 || null,
  address_street2: user.address_street2 || null,
  address_city: user.address_city || null,
  address_state: user.address_state || null,
  address_zip: user.address_zip || null,
  address_country: user.address_country || null,
  phone_number: user.phone_number || null,
  payment_method: user.payment_method || null,
  stored_cc_number: user.stored_cc_number || null,
  stored_cc_name: user.stored_cc_name || null,
  stored_cc_exp_month: user.stored_cc_exp_month || null,
  stored_cc_exp_year: user.stored_cc_exp_year || null,
  stored_cc_cvv: user.stored_cc_cvv || null,
  wallet: user.wallet || null,
  profile_avatar: user.profile_avatar || null,
  gender: user.gender || null,
  created_at: user.created_at || null,
  profile_level: user.profile_level || null,
  profile_exp: user.profile_exp || null
	};
}

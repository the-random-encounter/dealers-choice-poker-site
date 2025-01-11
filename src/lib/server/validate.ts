import { checkUsernameExists, checkEmailExists, checkDisplayNameExists } from '$lib/database';

export const validateUsername = async (username: string): Promise<{response: string, valid: boolean}> => {
	if (username.length < 4)
		return {response: `Usernames must be at least four characters long`, valid: false};
	else if (username.length > 16)
		return {response: `Usernames must be at most sixteen characters long`, valid: false};
	else {

		const usernameExists = await checkUsernameExists(username);

		if (usernameExists)
			return {response: `Username is already in use`, valid: false};
		else
			return {response: `Username is valid`, valid: true};

	}
}

export const validateDisplayName = async (name: string): Promise<{response: string, valid: boolean}> => {
	if (name.length < 4)
		return {response: `Display names must be at least four characters long`, valid: false};
	else if (name.length > 16)
		return {response: `Display names must be at most sixteen characters long`, valid: false};
	else {

		const nameExists = await checkDisplayNameExists(name);

		if (nameExists)
			return {response: `Display name is already in use`, valid: false};
		else
			return {response: `Display name is valid`, valid: true};
	}
}

export function validateEmail (email: string): {response: string, valid: boolean} {
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailPattern.test(email))
		return {response: `Email address is not valid`, valid: false};
	else
		return {response: `Email address is valid`, valid: true};
}

export function validatePassword(password: string, passwordConfirmation?: string): {valid: boolean, response: string, requirements?: string[]} {

  // Check if password matches confirmation, provided it was passed in
  if (passwordConfirmation && password !== passwordConfirmation) return {
		valid: false,
		response: `Password does not match confirmation.` };

  // RegEx expressions for uppercase, lowercase, special characters, and numbers
  const uppercaseRegex 	 = /[A-Z]/;
  const lowercaseRegex 	 = /[a-z]/;
  const specialCharRegex = /[\W_]/;
  const numberRegex 		 = /\d/;
	const failMsg: string = `Passwords have the following requirements:`;
	const requirements: string[] = [];
	let failed = false;

  // Check for at least one uppercase character
  if (!uppercaseRegex.test(password)) {
		requirements.push(`At least one uppercase character.`);
		failed = true;
	}

  // Check for at least one lowercase character
  if (!lowercaseRegex.test(password)) {
		requirements.push(`At least one lowercase character.`);
		failed = true;
	}

	// Check for at least one special character
	if (!specialCharRegex.test(password)) {
		requirements.push(`At least one special character.`);
		failed = true;
	}

	// Check for at least one number
	if (!numberRegex.test(password)) {
		requirements.push(`At least one number.`);
		failed = true;
	}

	// Check if password length is at least 8 characters
  if (password.length < 8) {
		requirements.push(`At least 8 characters long.`);
		failed = true;
	}

	if (failed)
		return {
			valid: false,
			response: failMsg,
			requirements: requirements
		};
	else
		return {
			valid: true,
			response: `Password meets requirements.`
		};
}

export function validateAge(dob: string | number | Date): boolean {

	// Get today's date and create the date exactly 18 years ago,
	// which is the latest date someone could be born to be 18 today.
	const today = new Date();
	const eighteenYearsAgo = new Date(
		today.getFullYear() - 18,
		today.getMonth(),
		today.getDate()
	);

	// If the input DOB passed was a string or number, create a Date
	// object from it and compare it to latest birthdate for an 18 year old.
	if (typeof dob === 'string' || typeof dob === 'number') {
		const birthDate: Date = new Date(dob);
		return birthDate <= eighteenYearsAgo;

	// If the input DOB passed was already a Date object,
	// just compare it to latest birthdate for an 18 year old.
	} else if (dob instanceof Date) {
		return dob <= eighteenYearsAgo;

	// If the input DOB passed was not a string, number, or Date object,
	// return false since it is not a valid date.
	} else return false;
}

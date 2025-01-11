import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { goto } from '$app/navigation';
import type SignupFormData from '$lib/types/form';
import { validatePassword, validateAge } from '$lib/server/validate';
import { checkUsernameExists, checkEmailExists, addNewUser } from '$lib/database';

export const actions = {

  newUser: async ({ request }) => {

    try {
      const signupFormData = await request.formData();
      const username = signupFormData.get('username') ?? '';
      const email = signupFormData.get('email') ?? '';
      const password = signupFormData.get('password') ?? '';
      const passwordConfirmation = signupFormData.get('passconfirm') ?? '';
      const dob = signupFormData.get('dob') ?? '';

      let SignupResponse: SignupFormData = {
        weakPassword: false,
        error: false,
        usernameExists: false,
        emailExists: false,
        noPasswordMatch: false,
        message: '',
        username,
        email,
        password: '',
        passwordConfirmation: '',
        dob
      }

      const validPassword = validatePassword(password.toString(), passwordConfirmation.toString());

      if (!validPassword.valid) {
        SignupResponse.weakPassword = true;
        SignupResponse.error = true;
        SignupResponse.message = validPassword.response;
        return fail(400, SignupResponse);
      }

      if (await checkUsernameExists(username.toString())) {
        SignupResponse.usernameUsed = true;
        SignupResponse.error = true;
        SignupResponse.message = 'Username already in use.';
        return fail(400, SignupResponse);
      }

      if (await checkEmailExists(email.toString())) {
        SignupResponse.emailUsed = true;
        SignupResponse.error = true;
        SignupResponse.message = 'Email already in use.';
        return fail(400, SignupResponse);
      }

			if (!validateAge(dob.toString())) {
				SignupResponse.error = true;
				SignupResponse.message = 'User must be at least 18 years old to register.';
				return fail(400, SignupResponse);
			}

      const submittedData = {
        username: username.toString(),
        email: email.toString(),
        password: password.toString(),
        dob: dob.toString()
      };

      const registrationSuccess = await addNewUser(submittedData);

      if (registrationSuccess) {
				console.log(`New user registration was successful (${username}, ${email})`);
				goto('/verify');
			} else {
        SignupResponse.error = true;
        SignupResponse.message = 'Internal server error attempting to register new user. Please try again later.';
        return fail(503, SignupResponse);
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      };
    }
  }
} satisfies Actions;

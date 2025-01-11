import type { PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { checkUsernameExists, validateUserLogin } from '$lib/database';

export const actions = {
	login: async ({ request }) => {

		const formData = await request.formData();
		const username = formData.get('username') ?? '';
		const password = formData.get('password') ?? '';

		let LoginResponse = {
			error: false,
			message: '',
			username,
			password: '',
			noUser: false,
			badPassword: false
		}

		if (username === '' || password === '') {
			LoginResponse.error = true;
			LoginResponse.message = "Username and password are required";
			return fail(400, LoginResponse);
		}

		const userExists = await checkUsernameExists(username.toString());

		if (!userExists) {
			LoginResponse.error = true;
			LoginResponse.noUser = true;
			LoginResponse.message = "User does not exist";
			return fail(400, LoginResponse);
		}

		const validCredentials = await validateUserLogin(username.toString(), password.toString());

		if (!validCredentials) {
			LoginResponse.error = true;
			LoginResponse.badPassword = true;
			LoginResponse.message = "Incorrect password";
			return fail(400, LoginResponse);
		} else {
			throw redirect(303, '/dashboard');
		}

	}
} satisfies Actions;
export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

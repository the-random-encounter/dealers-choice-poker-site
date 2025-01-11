import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { loginUser } from "$lib/server/login";
import { COOKIE_OPTIONS } from "$lib/utils";

export const actions = {
	login: async (event) => {
		const data = await event.request.formData();

		const login = data.get('login')
		?.toString()
		.toLowerCase()
		.trim();

		const password = data.get('password')
		?.toString()
		.trim();

		let noLogin = false;
		let noPassword = false;

		if (login!.length === 0)		noLogin = true;
		if (password!.length === 0)		noPassword = true;
		if (noLogin || noPassword)		return fail(400, { login, noLogin, noPassword, error: "Username and password are required" });

		const userData = await loginUser(login!, password!);

		if ("error" in userData) {
			return fail(400, { login, error: userData.error });
		} else {
			const { token, username, email, id } = userData;

			event.cookies.set("auth-token", token, COOKIE_OPTIONS);
			event.cookies.set("username", username!, COOKIE_OPTIONS);
			event.cookies.set("email", email!, COOKIE_OPTIONS);

			const user = {
				username,
				email,
				id
			}

			return { token, user };
		}
	}
}
export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

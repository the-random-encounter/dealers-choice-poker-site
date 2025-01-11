import type { Cookies } from '@sveltejs/kit';
import type { Auth } from '$lib/types/auth';
import jwt from 'jsonwebtoken';

export default function authenticate (cookies: Cookies): Auth | undefined {
	let token = cookies.get("auth-token");

	if (!token) return undefined;

	try {

		const auth: Auth = jwt.verify(token, process.env.JWT_SECRET_KEY);

		console.log();
		if (!auth) return undefined;
		return auth;
	} catch {
		return undefined;
	}
}

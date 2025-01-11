import authenticate from '$lib/server/authenticate';
import { redirect, type Handle } from '@sveltejs/kit';
import { COOKIE_OPTIONS } from '$lib/utils';

export const handle: Handle = async ({ event, resolve }) => {

	//event.locals.user = await getUser(event.cookies.get('sessionId'));

	const isProtected =
		event.url.pathname.startsWith('/dashboard') ||
		event.url.pathname.startsWith('/account') ||
		event.url.pathname.startsWith('/admin') ||
		event.url.pathname.startsWith('/logout');

	const auth = authenticate(event.cookies);

	if (isProtected && !auth) {
		event.cookies.delete('email', COOKIE_OPTIONS);
		event.cookies.delete('username', COOKIE_OPTIONS);
		event.cookies.delete('auth-token', COOKIE_OPTIONS);
		throw redirect(307, '/login');
	}

	const response = await resolve(event);
	return response;
}

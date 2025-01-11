import type { Cookies } from '@sveltejs/kit';
import { UserModel } from '$lib/model/User';
import authenticate from './authenticate';
import { validateDisplayName, validateEmail } from './validate';

export async function changeName(cookies: Cookies,	name: string): Promise<{ error: string } | { name: string }> {
		const auth = authenticate(cookies);

		if (!auth)
			return { error: `You are not authenticated.`};

		const { id } = auth;

		const name_valid = await validateDisplayName(name);

		if (!name_valid.valid)
			return { error: `Name is invalid.` };

		const user = await UserModel.findOne({_id: id});

		if (!user)
			return { error: `User not found.`};

		if (user.display_name === name)
			return { error: `This is already your name.` };

		user.display_name = name;

		try {
			await user.save();
			return {  name };
		} catch (err) {
			return { error: err?.toString() as string };
		}
	}

export async function changeEmail(cookies: Cookies, email: string): Promise<{ error: string } | { email: string }> {
	const auth = authenticate(cookies);

	if (!auth)
		return { error: `You are not authenticated.`};

	const { id } = auth;

	const email_error = await validateEmail(email);

	if (!email_error.valid)
		return { error: email_error.response };

	const user = await UserModel.findOne({_id: id});

	if (!user)
		return { error: `User not found.`};

	user.email = email;

	try {
		await user.save();
		return { email };
	} catch (err) {
		return { error: err?.toString() as string };
	}
}

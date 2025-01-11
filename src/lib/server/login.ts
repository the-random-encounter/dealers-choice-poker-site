import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '$lib/model/User';
import { fetchUser } from '$lib/database';
import type User from '$lib/types/user';
import { EmailRegExp } from '$lib/utils';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

interface UserInfo {
	id?: string;
	email?: string;
	password?: string;
	username?: string;
	name?: string;
	error?: string;
}

interface UserInfoToken extends UserInfo {
	token: string;
}

export async function loginUser(login: string, password: string): Promise<UserInfoToken> {

	const user: UserInfo = await getUser(login, password);

	if (!user) return Promise.reject(new Error('User not found'));
	else if (user.error) return Promise.reject(new Error(user.error));
	else {
		const token = jwt.sign({ id: user.id}, JWT_SECRET_KEY);

		const userInfoToken = { ...user, token };

		return userInfoToken;
	}
}

async function getUser(login: string, password: string): Promise<UserInfo> {

	if (!login) return { error: "Username or E-mail is required." };
	if (!password) return { error: "Password is required." };

	if (EmailRegExp.test(login)) {
		var user = await UserModel.findOne({ email: login });
	} else {
		var user = await UserModel.findOne({ username: login });
	}

	if (!user) return { error: 'User could not be located.' };

	const passwordCorrect = await bcrypt.compare(password, user.password);

	if (!passwordCorrect) return { error: "Password is incorrect." };

	const id = user._id.toString();
	const username = user.username;
	const display_name = user.display_name;
	const email = user.email;

	const userInfo = {
		id,
		email,
		password,
		username,
		display_name
	}

	return userInfo;


}

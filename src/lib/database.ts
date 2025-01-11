import { UserModel } from '$lib/model/User';
import type { ConnectOptions } from 'mongoose';
import { todaysDate } from '$lib/dateFuncs';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from '@dotenvx/dotenvx';

dotenv.config();
const mongoConnection = 'mongodb+srv://' + `${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URI}`;
const clientOptions: ConnectOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI!, clientOptions);
    isConnected = true;
    console.log('Mongoose successfully connected to database!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export const checkUsernameExists = async (username: string): Promise<boolean> => {

	try {
		await connectDB();

		const user = await UserModel.findOne({ username: username });

		if (user) return true;
		else return false;

	} catch (err) {
		console.error(`Error: ${err}`);
	}

	console.log(`Aborting check for username...`);
	throw new Error('Error checking for username');
}

export const checkEmailExists = async (email: string): Promise<boolean> => {

	try {
		await connectDB();

		const user = await UserModel.findOne({ email: email });

		if (user) return true;
		else return false;

	} catch (err) {
		console.error(`Error: ${err}`);
	}

	console.log(`Unable to verify e-mail address exists...`);
	throw new Error('Unable to verify e-mail address exists');
}

export const addNewUser = async (userDataObject: { username: string, password: string, email: string, dob: string }): Promise<boolean> => {

	try {
		await connectDB();

		const hashedPassword = await bcrypt.hash(userDataObject.password, 10);
		const dobYear = Number(userDataObject.dob.split('-')[0]);
		const dobMonth = Number(userDataObject.dob.split('-')[1]);
		const dobDay = Number(userDataObject.dob.split('-')[2]);

		const dobDate = new Date(dobYear, dobMonth - 1, dobDay);

		console.log(`Hashed Password: ${hashedPassword}`);
		const newUser = new UserModel({
			username: userDataObject.username,
			password: hashedPassword.toString(),
			email: userDataObject.email,
			display_name: userDataObject.username,
			dob: dobDate,
			dob_year: dobYear,
			dob_month: dobMonth,
			dob_day: dobDay,
			last_login: new Date()
		});

		const result = await newUser.save();

		if (result) {
			console.log(`User saved successfully: \n${result}`);
			return true;
		} else {
			console.log(`User was not saved successfully: \n${result}`);
			return false;
		}
	} catch (err) {
		console.error(`Error: ${err}`);
	}

	throw new Error(`Could not add user: ${userDataObject.username}`);
}

export const modifyUserData = async (userDataObject: { username: string, [key: string]: any}): Promise<boolean> => {

	if (!userDataObject.username) {
		console.error('Error: No username provided');
		return false;
	}

	try {
		await connectDB();

		const username: string = userDataObject.username;
		const email: string = userDataObject.email ?? null;
		const display_name: string = userDataObject.displayName ?? null;
		const dob_year: number = userDataObject.dob.split('-')[0] ?? null;
		const dob_month: number = userDataObject.dob.split('-')[1] ?? null;
		const dob_day: number = userDataObject.dob.split('-')[2] ?? null;

		const address_street: string = userDataObject.address.street ?? null;
		const address_street2: string = userDataObject.address.street2 ?? null;
		const address_city: string = userDataObject.address.city ?? null;
		const address_state: string = userDataObject.address.state ?? null;
		const address_zip: number = userDataObject.address.zip ?? null;
		const address_country: string = userDataObject.address.country ?? null;

		const phone: number = userDataObject.phone ?? null;
		const profile_picture: string = userDataObject.profilePicture ?? null;
		const gender: string = userDataObject.gender ?? null;

		const stored_cc_name: string = userDataObject.storedCC.name ?? null;
		const stored_cc_number: number = userDataObject.storedCC.number ?? null;
		const stored_cc_cvv: number = userDataObject.storedCC.cvv ?? null;
		const stored_cc_exp_month: number = userDataObject.storedCC.expMonth ?? null;
		const stored_cc_exp_year: number = userDataObject.storedCC.expYear ?? null;

		const billing_street: string = userDataObject.billing.street ?? null;
		const billing_street2: string = userDataObject.billing.street2 ?? null;
		const billing_city: string = userDataObject.billing.city ?? null;
		const billing_state: string = userDataObject.billing.state ?? null;
		const billing_zip: number = userDataObject.billing.zip ?? null;
		const billing_country: string = userDataObject.billing.country ?? null;

		const userData = await UserModel.findOne({username: username});

		if (userData) {
			userData.email = (email !== null) ? email : userData.email;
			userData.display_name = (display_name !== null) ? display_name : userData.display_name;
			userData.dob_year = (dob_year !== null) ? dob_year : userData.dob_year;
			userData.dob_month = (dob_month !== null) ? dob_month : userData.dob_month;
			userData.dob_day = (dob_day !== null) ? dob_day : userData.dob_day;
			userData.address_street1 = (address_street !== null) ? address_street : userData.address_street1;
			userData.address_street2 = (address_street2 !== null) ? address_street2 : userData.address_street2;
			userData.address_city = (address_city !== null) ? address_city : userData.address_city;
			userData.address_state = (address_state !== null) ? address_state : userData.address_state;
			userData.address_zip = (address_zip !== null) ? address_zip : userData.address_zip;
			userData.address_country = (address_country !== null) ? address_country : userData.address_country;
			userData.phone_number = (phone !== null) ? phone : userData.phone_number;
			userData.profile_avatar = (profile_picture !== null) ? profile_picture : userData.profile_avatar;
			userData.gender = (gender !== null) ? gender : userData.gender;
			userData.stored_cc_name = (stored_cc_name !== null) ? stored_cc_name : userData.stored_cc_name;
			userData.stored_cc_number = (stored_cc_number !== null) ? stored_cc_number : userData.stored_cc_number;
			userData.stored_cc_cvv = (stored_cc_cvv !== null) ? stored_cc_cvv : userData.stored_cc_cvv;
			userData.stored_cc_exp_month = (stored_cc_exp_month !== null) ? stored_cc_exp_month : userData.stored_cc_exp_month;
			userData.stored_cc_exp_year = (stored_cc_exp_year !== null) ? stored_cc_exp_year : userData.stored_cc_exp_year;
			userData.billing_street1 = (billing_street !== null) ? billing_street : userData.billing_street1;
			userData.billing_street2 = (billing_street2 !== null) ? billing_street2 : userData.billing_street2;
			userData.billing_city = (billing_city !== null) ? billing_city : userData.billing_city;
			userData.billing_state = (billing_state !== null) ? billing_state : userData.billing_state;
			userData.billing_zip = (billing_zip !== null) ? billing_zip : userData.billing_zip;
			userData.billing_country = (billing_country !== null) ? billing_country : userData.billing_country;

			await userData.save();
			return true;
		}
	} catch (err) {
		console.error(`Error: ${err}`);
	}
	throw new Error(`User data could not be updated successfully`);
}

export const updateLastLogin = async (username: string): Promise<boolean> => {

	try {
		await connectDB();

		const user = await UserModel.findOne({username: username});

		if (user) {
			user.last_login = new Date();

			const result = await user.save();

			if (result) {
				console.log(`Last login updated successfully: \n${result}`);
				return true;
			} else {
				console.log(`Last login was not updated successfully: \n${result}`);
				return false;
			}
		}
	} catch (err) {
		console.error(`Error: ${err}`);
	}
	return false;
}

export const validateUserLogin = async (username: string, password: string) : Promise<boolean> => {

	await mongoose.connect(mongoConnection);

	const user = await UserModel.findOne({username: username});

	if (user) {
		const storedPassword = user.password;
		const passwordMatch = await bcrypt.compare(password, storedPassword);

		return (passwordMatch) ? true : false;
	}	else {
		return false;
	}
}

export const fetchUser = async (searchBy: 'username' | 'email' | 'id', searchValue: string): Promise<mongoose.Document | boolean> => {

	try {
		await connectDB();

		if (searchBy === 'username')
			var user = await UserModel.findOne({username: searchValue});
		else if (searchBy === 'email')
			var user = await UserModel.findOne({email: searchValue});
		else if (searchBy === 'id')
			var user = await UserModel.findOne({_id: searchValue});

		if (user) {
			return user;
		} else
		return false;
	} catch (err) {
		console.error(`Error: ${err}`);
	}
	throw new Error(`Error fetching user`);
}

export const checkDisplayNameExists = async (displayName: string): Promise<boolean> => {

	try {
		await connectDB();

		const user = await UserModel.findOne({ display_name: displayName });

		if (user) return true;
		else return false;

	} catch (err) {
		console.error(`Error: ${err}`);
	}
	throw new Error(`Error fetching user`);
}

export const findOneBy = async (searchParam: string, searchValue: any): Promise<mongoose.Document | boolean> => {

	try {
		await connectDB();

		const user = await UserModel.findOne({[searchParam]: searchValue});

		if (user) {
			return user;
		} else
		return false;
	} catch (err) {
		console.error(`Error: ${err}`);
	}
	throw new Error(`Error fetching user`);
}

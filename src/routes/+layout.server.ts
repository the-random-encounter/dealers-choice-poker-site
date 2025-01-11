import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { connectDB } from '$lib/database';

export const load = (async (event) => {

	const connection = connectDB();

	if (!connection) throw error(500, "Database connection failed");

	const username = event.cookies.get("username") ?? "";
	const email = event.cookies.get("email") ?? "";

	return { username, email };
}) satisfies LayoutServerLoad;

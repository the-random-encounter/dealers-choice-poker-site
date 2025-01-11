// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type User from '$lib/types/user';

type Auth = {
	id: string
};

type User = {
	id: string,
	email: string,
	username: string,
	name: string
};

declare global {
	namespace App {
		type Auth = {
			id: string
		};
		interface Locals {
			user: User;
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

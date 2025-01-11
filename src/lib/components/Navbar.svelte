<script lang="ts">
	import { page } from '$app/state';

	let { loggedIn } = $props();

	type link = {
		path: string;
		text: string;
		protected: boolean;
	};

	const links: link[] = [
		{
			path: '/',
			text: 'Home',
			protected: false
		},
		{
			path: '/about',
			text: 'About',
			protected: false
		},
		{
			path: '/poker',
			text: 'Play Poker',
			protected: false
		},
		{
			path: '/dashboard',
			text: 'Dashboard',
			protected: true
		},
		{
			path: '/profile',
			text: 'Profile',
			protected: true
		},
		{
			path: '/account',
			text: 'Account',
			protected: true
		},
		{
			path: '/login',
			text: 'Login',
			protected: false
		},
		{
			path: '/signup',
			text: 'Sign up',
			protected: false
		},
		{
			path: '/logout',
			text: 'Logout',
			protected: true
		},
		{
			path: '/admin',
			text: 'Admin',
			protected: true
		}
	];
</script>

<nav class="navbar">
	<ul>
		{#each links as link}
			{#if link.path == '/' || loggedIn === link.protected}
				{@const aria_current = page.url.pathname === link.path ? 'page' : 'false'}
				<li>
					<a href={link.path} aria-current={aria_current}>
						{link.text}
					</a>
				</li>
			{/if}
		{/each}
	</ul>
</nav>

<style>
	.navbar {
		width: 100%;
		background-color: #333;
		color: white;
		padding: 10px;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.navbar ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
		display: flex;
	}

	.navbar ul li {
		margin-right: 20px;
	}

	.navbar ul li a {
		color: white;
		text-decoration: none;
		padding: 10px 15px;
		border-radius: 3px;
		display: block;
		font-size: 24px;
		text-shadow: 2px 2px 2px #000;
	}

	.navbar ul li a:hover {
		background-color: #575757;
		border-radius: 5px;
		text-decoration: underline;
		text-shadow: 2px 2px 2px #db8888;
	}

	/* Responsive design */
	@media (max-width: 600px) {
		.navbar ul {
			flex-direction: column;
			align-items: flex-start;
		}

		.navbar ul li {
			margin-right: 0;
			margin-bottom: 10px;
		}
	}
</style>

<script>
	import { enhance } from '$app/forms';
	import { getContext } from 'svelte';
	import '../../app.css';

	let { loggedIn, data } = $props();

	const user = getContext('user');

</script>

<div class="flex-none login-container">
	{#if !data.user}
		<form use:enhance action="login?/login" method="post">
			<input type="text" name="username" placeholder="Username" required>
			<input type="password" name="password" placeholder="Password"  required>
			<button type="submit">Login</button>
		</form>
		<div class="signup-container">
			<a href="/signup" class="signup-link">New user? Sign up!</a>
		</div>
	{:else}
		<div class="dropdown dropdown-end mr-4">
			<label tabIndex="0" class="btn btn-ghost btn-circle avatar" for="avatar">
				<div class="w-10 rounded-full">
					<img src="https://placeimg.com/80/80/people" alt="User avatar" />
				</div>
			</label>
			<ul tabIndex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
				<li>
					<a href="/profile" class="justify-between">Profile</a>
				</li>
				<li>
					<a href="/settings">Settings</a>
				</li>
				<li>
					<form action="/logout" method="POST">
					<button type="submit" class="w-ufll text-start">Logout</button>
					</form>
				</li>
			</ul>
		</div>
	{/if}
</div>

<style>
	.login-container {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-right: 20px;
	}

	.login-container form {
			display: flex;
			flex-direction: row;
			align-items: center;
	}

	.login-container input {
		color: #000;
			margin: 0 10px;
			padding: 10px;
			border: 1px solid #ccc;
			border-radius: 5px;
			background-color: #f9f9f9;
	}

	.login-container button {
			margin: 0 10px;
			padding: 10px 15px;
			border: none;
			border-radius: 5px;
			background-color: #4CAF50;
			color: white;
			cursor: pointer;
	}

	.login-container button:hover {
			background-color: #45a049;
	}

	.signup-container {
			margin-top: 10px;
			margin-left: auto;
	}

	.signup-link {
			color: #4CAF50;
			text-decoration: none;
			text-align: right;
			padding-right: 15px;
			transition: color 0.3s, text-shadow 0.3s;
			text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	}

	.signup-link:hover {
			text-decoration: underline;
			color: #6fffa6;
			text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
	}

	button {
		color: rgb(221, 221, 221);
		font-size: 16px;
		line-height: 16px;
		padding: 15px;
		border-radius: 13px;
		font-family: Verdana, Geneva, sans-serif;
		font-weight: normal;
		text-decoration: none;
		font-style: normal;
		font-variant: normal;
		text-transform: none;
		background-image: radial-gradient(rgb(69, 160, 73) 0%, rgb(99, 229, 104) 100%);
		box-shadow: #222 5px 5px 15px 5px;
		border: 2px solid rgb(28, 110, 164);
		display: inline-block;
	}

	button:hover {
		background: #45A049;
		box-shadow: #000 5px 5px 15px 5x;
	}

	button:active {
		background: #63E568;
	}

	@media (max-width: 600px) {
		.login-container {
					flex-direction: column;
					align-items: flex-start;
			}

		.login-container form {
				flex-direction: column;
				align-items: flex-start;
		}

		.login-container input,
		.login-container button {
				margin: 10px 0;
		}
	}
</style>

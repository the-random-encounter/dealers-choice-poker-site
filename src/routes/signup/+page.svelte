<script lang="ts">
  import { enhance } from '$app/forms';

	let { data, form } = $props();
  let thisForm: HTMLFormElement;

	let username = $state('');
	let password = $state('');
	let passconfirm = $state('');
	let email = $state('');
	let dob = $state('');
	let errorMessage = $state('');
	let showSpinner = $state(false);

</script>

<div class="signup-container">
  <h2 class="banner text-center font-semibold underline-offset-8 font-mono  text-2xl">New User Registration</h2>
	<div id="signup" class="flex space-y-4">
		<form bind:this={thisForm} use:enhance method="post" action="?/newUserPB" name="signupForm" class="signup" >
			<div class="form-item">
				<div class="label-container"><label for="username">Username<sup><small>*</small></sup></label></div>
				<div class="input-container"><input bind:value={username} type="text" name="username" id="username" minlength="4" placeholder="Username" class:fieldError={form?.usernameUsed} required autocomplete="on"></div>
			</div>
			<div class="form-item">
				<div class="label-container"><label for="email">Email<sup><small>*</small></sup></label></div>
				<div class="input-container"><input bind:value={email} type="email" name="email" id="email" placeholder="Email" class:fieldError={form?.emailUsed} required autocomplete="on"></div>
			</div>
			<div class="form-item">
				<div class="label-container"><label for="password">Password<sup><small>*</small></sup></label></div>
				<div class="input-container"><input bind:value={password} type="password" name="password" id="password" minlength="8" placeholder="Password" class:fieldError={form?.weakPassword} required></div>
			</div>
			<div class="form-item" >
				<div class="label-container"><label for="passconfirm">Confirm Password<sup><small>*</small></sup></label></div>
				<div class="input-container"><input bind:value={passconfirm} type="password" name="passconfirm" id="passconfirm" minlength="8" placeholder="Confirm Password" class:fieldError={form?.noPasswordMatch} required></div>
			</div>
			<div class="form-item">
				<div class="label-container"><label for="dob">Date of Birth<sup><small>*</small></sup></label></div>
				<div class="input-container"><input class="date-picker" bind:value={dob} type="date" name="dob" id="dob" required min="1940-01-01" max="2006-12-31"></div>
			</div>
			<div class="error-container" id="error-container">
				{#if form?.error}
					<div class="error"><small>{form?.message}</small></div>
				{/if}

				{#if showSpinner}
					<div class="spinner"></div>
				{/if}
			</div>
			<div class="form-submit">
				<button type="submit" class="signup">Sign Up</button>
			</div>
		</form>
	</div>
</div>

<style>

* {
	background-color: #111;
}

.signup-container {
	padding: 100px;
}

.error {
	background: #f2f2f2;
	text-align: center;
}

.error-container {
	background: #f2f2f2;
	text-align: center;
	text-shadow: 0px 0px 0px #000;
}

.banner {
	padding: 30px;
	font-family: "Lucida Console", Monaco, monospace;
	font-size: 36px;
	letter-spacing: 0px;
	word-spacing: 0px;
	color: #FFFFFF;
	font-weight: 700;
	text-decoration: rgb(68, 68, 68);
	font-style: normal;
	font-variant: small-caps;
	text-transform: capitalize;
}

input {
	margin-top: 5px;
	background-color: #f2f2f2;
	border: 3px solid #aaa;
	box-align: right;
	padding: 5px;
}

.signup {
  background-color: #f2f2f2;
	border: 15px groove #0E7D0B;
  padding: 20px;
  border-radius: 18px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 650px;
  margin: auto;
}

/* Style the input fields */
.form-item {
	justify-content: space-between;
	background-color: #f2f2f2;
	color: #000;
  width: 100%;
  padding-left: 12px;
	padding-right: 12px;
	padding-top: 3px;
	padding-bottom: 0px;
  margin: 8px 0;
  display: flex;
  border: 1px solid #ccc;
  border-radius: 4px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  font-size: 16px;
	text-align: right;
}

/* Style the input fields on focus */
.form-item:focus {
  border-color: #4CAF50;
  outline: none;
}

/* Style the submit button */
button.signup {
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 50%;
	align-self: center;
}

/* Style the submit button on hover */
button.signup:hover {
  background-color: #45a049;
	border-radius: 10px;
}

label, sup, small {
	background-color: #f2f2f2;
	text-align: right;
}

small {
	background-color: #f2f2f2;
	color: #ff0000;
}

.label-container {
	display: inline-block;
	width: 40%;
	padding: 3px;
	margin: 10px;
	font-size: 16px;
	color: #000;
	background-color: #f2f2f2;
}

.input-container {
	background-color: #f2f2f2;
	align-items: right;
}

.form-submit {
	display: flex;
	background-color: #f2f2f2;
	align-items: center;
	justify-content: center;
}
	/**
		.signup {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin: 0 auto;
			padding: 1rem;
			width: 100%;
			max-width: 400px;
		}

		.form-item {
			display: flex;
			flex-direction: column;
			margin: 0.5rem 0;
			width: 100%;
			border-radius: 1rem;
			padding: 0.5rem;
		}
	*/

	.fieldError {
		border: 1px solid red;
	}

	.fieldError:focus {
		border: 1px solid red;
	}

	.fieldError::placeholder {
		color: red;
	}

	.fieldError:focus::placeholder {
		color: red;
	}

	.fieldError:invalid {
		border: 1px solid red;
	}

	.fieldError:invalid:focus {
		border: 1px solid red;
	}

	.fieldError:invalid::placeholder {
		color: red;
	}

	.fieldError:invalid:focus::placeholder {
		color: red;
	}

	.fieldError:valid {
		border: 3px solid rgb(124, 0, 0);
	}

	.fieldError:valid:focus {
		border: 3px solid rgb(124, 0, 0);
	}

	.fieldError:valid::placeholder {
		color: rgb(124, 0, 0);
	}

	.fieldError:valid:focus::placeholder {
		color: rgb(124, 0, 0);
	}

	.fieldError:valid:invalid {
		border: 3px solid red;
	}

	.fieldError:valid:invalid:focus {
		border: 3px solid rgb(197, 95, 0);
	}

	.fieldError:valid:invalid::placeholder {
		color: rgb(255, 123, 0);
	}

	.fieldError:valid:invalid:focus::placeholder {
		color: rgb(255, 181, 70);
	}
</style>

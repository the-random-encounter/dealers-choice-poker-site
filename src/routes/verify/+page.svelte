<script>
import { fetchUser } from '$lib/database';

</script>

<body>
	<div class="main-container">
		<div class="hidden-block">
		</div>
		<div class="success-container">
			<div class="success-header">
				<h2>You have been successfully registered!</h2>
			</div>
		</div>
		<div class="hidden-block">
		</div>
	</div>
</body>

<style>

body {
	margin: 0;
	padding: 0;
	background: #000;
	color: #fff;
	font-family: Arial, sans-serif;
}

.main-container {
	display: inline-block;
}

.hidden-block {
	display: inline-block;
	width: 200px;
	height: 50%;
	background: #000;
	color: #000;
}
.success-container {
	display: inline-block;
	width: 75%;
	height: 50%;
	background: #444;
	color: #aaa;
	margin: 20px;
	padding: 15px;
	border: 10px solid #fff;
	border-radius: 25px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	align-items: center;
	justify-content: center;

}
.success-header {
		margin-top: 100px; /* Adjust based on navbar height */
		margin-bottom: 85%;
		height: fit-content;
		padding: 40px;
		text-align: center;
		background: #000;
		color: #fff;
}
</style>

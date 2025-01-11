<body>
	<main class="main">
		<div class="main-window" id="main-window">
			<div class="main-content">
				<p>Hello!</p>
			</div>
		</div>
		<div class="bottom-links">
			<!-- Bottom links content -->
		</div>
	</main>
</body>

<style>

.main {
	display: flex;
	flex-direction: column;
	background: #000;
}

.main-content {
    margin: 0;
    font-family: Arial, sans-serif;
    padding: 0;
    color: rgba(248, 107, 107, 0.87);
    background: #000000;
}

.main-window {

    margin-top: 100px; /* Adjust based on navbar height */
		margin-bottom: 85%;
		height: fit-content;
    padding: 40px;
    text-align: center;
		background: #000;
		color: #fff;
}

.bottom-links {
    width: 100%;
		height: 150px;
    background-color: #111;
    color: white;
    padding: 10px;
    position: sticky;
    bottom: 0;
    left: 0;
}
</style>

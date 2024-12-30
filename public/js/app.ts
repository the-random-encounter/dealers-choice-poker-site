
import { GAME_WIDTH, GAME_HEIGHT } from './bundle.min.js';
import { Debug } from './bundle.min.js';
import { Boot } from './bundle.min.js';
import { PokerGame } from './bundle.min.js';
import { GameOver } from './bundle.min.js';
import { MainMenu } from './bundle.min.js';
import { Preloader } from './bundle.min.js';
import RexUIPlugin from './bundle.min.js';

import { Phaser, Game, Types } from './bundle.min.js';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: GAME_WIDTH,
	height: GAME_HEIGHT,
	dom: {
		createContainer: true,
	},
	parent: 'game-container',
	backgroundColor: '#028af8',
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	plugins: {
		scene: [
			{
				key: 'rexUI',
				plugin: RexUIPlugin,
				mapping: 'rexUI'
			}
		]
	},
	scene: [
		Boot,
		Preloader,
		MainMenu,
		Debug,
		PokerGame,
		GameOver
	]
};

export default new Game(config);

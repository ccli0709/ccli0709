var TopDown = TopDown || {};

TopDown.Preload = function() {
};

TopDown.Preload.prototype = {
	preload : function() {
		this.splash = this.add.sprite(this.game.world.centerX,
				this.game.world.centerY, 'logo');
		this.splash.anchor.setTo(0.5);

		this.preloadBar = this.add.sprite(this.game.world.centerX,
				this.game.world.centerY + 192, 'preloadbar');
		this.preloadBar.anchor.setTo(0.5);
		this.load.setPreloadSprite(this.preloadBar);

		this.load.tilemap('level1',
				'/assets/phaser/topDown/tilemaps/level1.json', null,
				Phaser.Tilemap.TILED_JSON);
		this.load.image('gameTiles',
				'/assets/phaser/topDown/images/town_tiles.png');
		this.load.image('player', '/assets/phaser/topDown/images/player.png');
		this.load.image('chest', '/assets/phaser/topDown/images/chest.png');
	},
	create : function() {
		this.state.start('Game');
	}
};

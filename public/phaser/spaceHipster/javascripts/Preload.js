var SpaceHipster = SpaceHipster || {};

SpaceHipster.Preload = function() {
};

SpaceHipster.Preload.prototype = {
	preload : function() {
		this.splash = this.add.sprite(this.game.world.centerX,
				this.game.world.centerY, 'logo');
		this.splash.anchor.setTo(0.5);

		this.preloadBar = this.add.sprite(this.game.world.centerX,
				this.game.world.centerY + 192, 'preloadbar');
		this.preloadBar.anchor.setTo(0.5);
		this.load.setPreloadSprite(this.preloadBar);

		// load game assets
		this.load.image('space', '/assets/phaser/spaceHipster/images/space.jpg');
		this.load.image('rock', '/assets/phaser/spaceHipster/images/rock.png');
		this.load.spritesheet('playership',
				'/assets/phaser/spaceHipster/images/playership.png', 56, 80, 27);
		this.load.spritesheet('fly', '/assets/phaser/spaceHipster/images/fly.png', 32,
				32, 9);
		this.load.image('playerParticle',
				'/assets/phaser/spaceHipster/images/player-particle.png');

		this.load.audio('explosion',
				'/assets/phaser/spaceHipster/sounds/explosion.ogg');
		this.load.audio('collect',
				'/assets/phaser/spaceHipster/sounds/collect.ogg');

	},
	create : function() {
		this.state.start('MainMenu');
	}
};

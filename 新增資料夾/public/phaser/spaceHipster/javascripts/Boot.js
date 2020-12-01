var SpaceHipster = SpaceHipster || {};

SpaceHipster.Boot = function() {
};

SpaceHipster.Boot.prototype = {
	preload : function() {
		this.load.image('logo', '/assets/phaser/spaceHipster/images/logo.jpg');
		this.load.image('preloadbar',
				'/assets/phaser/spaceHipster/images/preloadbar.png');
	},
	create : function() {
		this.game.stage.backgroundColor = '#000';
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.minWidth = 240;
		this.scale.minHeight = 170;
		this.scale.maxWidth = 2880;
		this.scale.maxHeight = 1920;

		this.scale.pageAlignHorizontally = true;

		// NOT A FUNCTION!?
		// this.scale.setScreenSize(true);

		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.state.start('Preload');
	}
};
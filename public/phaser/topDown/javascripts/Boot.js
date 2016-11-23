var TopDown = TopDown || {};

TopDown.Boot = function() {
};

TopDown.Boot.prototype = {
	preload : function() {
		this.load.image('logo', '/assets/phaser/topDown/images/logo.jpg');
		this.load.image('preloadbar',
				'/assets/phaser/topDown/images/preloadbar.png');
	},
	create : function() {
		this.game.stage.backgroundColor = '#000';
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.state.start('Preload');
	}
};
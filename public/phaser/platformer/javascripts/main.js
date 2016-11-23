var Phaser = Phaser || {};
var Platformer = Platformer || {};

var game = new Phaser.Game("100%", "100%", Phaser.CANVAS, 'phaserGame');
game.state.add("BootState", new Platformer.BootState());
game.state.add("LoadingState", new Platformer.LoadingState());
game.state.add("TiledState", new Platformer.TiledState());

// 這一行串接到BootState.js的Platformer.BootState.prototype.init方法
game.state.start("BootState", true, false,
		"/assets/phaser/platformer/levels/level1.json");
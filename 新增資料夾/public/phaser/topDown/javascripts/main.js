var TopDown = TopDown || {};

TopDown.game = new Phaser.Game(800, 360, Phaser.AUTO, 'phaserGame');

TopDown.game.state.add('Boot', TopDown.Boot);
TopDown.game.state.add('Preload', TopDown.Preload);
TopDown.game.state.add('Game', TopDown.Game);
TopDown.game.state.start('Boot');

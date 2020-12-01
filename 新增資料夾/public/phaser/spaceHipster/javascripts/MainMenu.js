var SpaceHipster = SpaceHipster || {};

SpaceHipster.MainMenu = function() {
};

SpaceHipster.MainMenu.prototype = {
	init : function(score) {
		var score = score || 0;
		this.highestScore = this.highestScore || 0;
		this.highestScore = Math.max(score, this.highestScore);
	},
	create : function() {
		// show the space tile, repeated
		this.background = this.game.add.tileSprite(0, 0, this.game.width,
				this.game.height, 'space');

		// give it speed in x
		this.background.autoScroll(-10, 0);

		// start game text
		var text = "點擊畫面開始遊戲";
		var style = {
			font : "64px 'Noto Sans Mono CJK TC'",
			fill : "#000",
			align : "center"
		};

		var t = this.game.add.text(this.game.width / 2, this.game.height / 2,
				text, style);
		t.anchor.set(0.5);

		// highest score
		text = "目前最高紀錄：" + this.highestScore;
		style = {
			font : "32px 'Noto Sans Mono CJK TC'",
			fill : "#000",
			align : "center"
		};
		var h = this.game.add.text(this.game.width / 2,
				this.game.height / 2 + 90, text, style);
		h.anchor.set(0.5);
	},
	update : function() {
		if (this.game.input.activePointer.justPressed()) {
			this.game.state.start('Game');
		}
	}
};

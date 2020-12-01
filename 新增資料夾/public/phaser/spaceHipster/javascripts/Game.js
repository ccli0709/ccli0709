var SpaceHipster = SpaceHipster || {};

SpaceHipster.Game = function() {
};

SpaceHipster.Game.prototype = {

	create : function() {
		// set world dimensions
		this.game.world.setBounds(0, 0, 1920, 1920);

		// show the space tile, repeated
		this.background = this.game.add.tileSprite(0, 0, this.game.world.width,
				this.game.world.height, 'space');

		// give it speed in x
		this.background.autoScroll(-30, 0);

		// create player
		this.player = this.game.add.sprite(this.game.world.centerX,
				this.game.world.centerY, 'playership');
		this.player.anchor.setTo(0.5, 0.5);
		
		// 設定更精確的碰撞邊緣
		this.game.physics.arcade.enable(this.player);
		// body.setSize(blockWidth,blockHeight,startX,startY)
		this.player.body.setSize(35, 60, 10, 20);

		this.player.scale.setTo(2);
		this.player.animations.add('fly', [ 0, 1, 2 ], 10, true);
		this.player.animations.play('fly');

		this.game.camera.follow(this.player);

		// player initial score of zero
		this.playerScore = 0;

		// enable player physics

		this.game.physics.arcade.enable(this.player);
		this.playerSpeed = 200;
		this.player.body.collideWorldBounds = true;

		// 產生障礙物
		this.generateAsteriods();

		// 產生
		this.generateCollectables();

		// sounds
		this.explosionSound = this.game.add.audio('explosion');
		this.collectSound = this.game.add.audio('collect');

		// show score
		this.createLabels();

	},
	update : function() {

		if (this.player.body.velocity.x > 0) {
			this.player.scale.x = Math.abs(this.player.scale.x);
		}

		if (this.player.body.velocity.x < 0) {
			this.player.scale.x = Math.abs(this.player.scale.x) * -1;
		}

		if (this.game.input.activePointer.justPressed()) {
			// move on the direction of the input
			this.game.physics.arcade.moveToPointer(this.player,
					this.playerSpeed);
		}

		// collide會有碰撞效果會影響主角動作
		this.game.physics.arcade.collide(this.player, this.asteroids,
				this.hitAsteroid, null, this);

		// overlap不會產生碰撞效果
		this.game.physics.arcade.overlap(this.player, this.collectables,
				this.collect, null, this);

		// 調整分數顯示樣式
		this.scoreLabel.text = this.playerScore;
		if (this.playerScore < 20) {
			this.scoreLabel.style.fill = '#999999';
		} else if (this.playerScore >= 20 && this.playerScore < 50) {
			this.scoreLabel.style.fill = '#99CD00';
		} else if (this.playerScore >= 50 && this.playerScore < 80) {
			this.scoreLabel.style.fill = '#3266FF';
		} else if (this.playerScore >= 80 && this.playerScore < 150) {
			this.scoreLabel.style.fill = '#CD99FF';
		} else if (this.playerScore >= 150 && this.playerScore < 230) {
			this.scoreLabel.style.fill = '#FF6600';
		} else if (this.playerScore > 230) {
			this.scoreLabel.style.fill = '#FF0000';
		}

	},
	generateAsteriods : function() {

		this.asteroids = this.game.add.group();

		// enable physics in them
		this.asteroids.enableBody = true;
		this.asteroids.physicsBodyType = Phaser.Physics.ARCADE;

		// phaser's random number generator
		var numAsteroids = this.game.rnd.integerInRange(40, 60);
		var asteriod;

		for (var i = 0; i < numAsteroids; i++) {
			// add sprite
			asteriod = this.asteroids.create(this.game.world.randomX,
					this.game.world.randomY, 'rock');
			asteriod.scale.setTo(this.game.rnd.integerInRange(5, 10) / 10);

			// physics properties
			asteriod.body.velocity.x = this.game.rnd.integerInRange(-100, 100);
			asteriod.body.velocity.y = this.game.rnd.integerInRange(-100, 100);
			asteriod.body.immovable = true;
			asteriod.body.collideWorldBounds = true;
		}

	},
	generateCollectables : function() {

		this.collectables = this.game.add.group();

		// enable physics in them
		this.collectables.enableBody = true;
		this.collectables.physicsBodyType = Phaser.Physics.ARCADE;

		// phaser's random number generator
		// var numCollectables = this.game.rnd.integerInRange(30, 50);
		var numCollectables = 30;
		var collectable;

		for (var i = 0; i < numCollectables; i++) {
			// add sprite
			collectable = this.collectables.create(this.game.world.randomX,
					this.game.world.randomY, 'fly');
			// asteriod.scale.setTo(this.game.rnd.integerInRange(5, 10) / 10);
			collectable.scale.setTo(2);
			collectable.animations.add('fly', [], 10, true);
			collectable.animations.play('fly');

			this.game.physics.arcade.enable(collectable);
			collectable.body.setSize(13, 17, 9, 7);

		}

	},
	hitAsteroid : function(player, asteroid) {
		// play explosion sound
		this.explosionSound.play();

		// 原本主角爆炸改成障礙物爆炸
		var emitter = this.game.add.emitter(asteroid.x, asteroid.y, 100);
		emitter.makeParticles('playerParticle');

		// 每個元素噴發的速度用隨機數值指定
		emitter.minParticleSpeed.setTo(-200, -200);
		emitter.maxParticleSpeed.setTo(200, 200);

		// 0為無重力向四處噴發, 600看起來滿真實的
		emitter.gravity = 600;

		// 1000為持續時間(毫秒),100為元素數量
		emitter.start(true, 1000, null, 100);

		// 原本碰到會掛掉
		// this.player.kill();
		// 改成扣分數以及變慢的懲罰
		asteroid.kill();
		this.playerScore -= 5;
		if (this.playerScore < 0) {
			this.playerScore = 0;
		}

		this.playerSpeed -= 20;
		if (this.playerSpeed < 150) {
			this.playerSpeed = 150;
		}

		// call the gameOver method in 800 milliseconds, we haven't created this
		// method yet
		// this.game.time.events.add(800, this.gameOver, this);
		// 
		// 改成只扣一命的做法
		// this.game.time.events.add(2000, function() {
		// this.game.state.start('MainMenu');
		// }, this);

	},
	collect : function(player, collectable) {

		// play collect sound
		this.collectSound.play();

		// update score
		this.playerScore += 10;
		this.playerSpeed += 50;
		// remove sprite
		collectable.kill();

		// 遊戲結束條件是把所有金幣都吃完
		// group.length是傳回所有項目個數，不論死活
		// collectable.kill並不會減少collectables的數量
		// 使用forEachAlive來檢查是否仍有活的項目
		var isSomeoneAlive = false;
		this.collectables.forEachAlive(function(collectable) {
			isSomeoneAlive = true;
		});
		if (!isSomeoneAlive) {
			this.game.time.events.add(800, function() {
				this.gameOver();
			}, this);
		}

	},
	createLabels : function() {

		var text = "0";
		var style = {
			font : "80px 'Noto Sans Mono CJK TC'",
			fill : "#999",
			align : "left"
		};

		this.scoreLabel = this.game.add.text(this.game.width - 180, 50, text,
				style);

		this.scoreLabel.fixedToCamera = true;
	},
	gameOver : function() {
		// 第二個參數為true表示要刷新game.world
		// 第三個參數為false表示不要清除遊戲快取
		// 只是不懂為何第四個參數這樣寫就可以丟給MainMenu的init去
		this.game.state.start('MainMenu', true, false, this.playerScore);
	}
};

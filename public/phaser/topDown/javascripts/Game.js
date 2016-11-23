var TopDown = TopDown || {};

TopDown.Game = function() {
};

TopDown.Game.prototype = {

	create : function() {
		this.map = this.game.add.tilemap('level1');
		this.map.addTilesetImage('town_tiles', 'gameTiles');
		// create layer
		this.backgroundlayer = this.map.createLayer('backgroundLayer');
		this.blockedLayer = this.map.createLayer('blockedLayer');

		// collision on blockedLayer
		this.map.setCollisionBetween(1, 5000, true, 'blockedLayer');

		this.backgroundlayer.resizeWorld();

		this.createItems();
		this.createPlayer();

		// the camera will follow the player in the world
		this.game.camera.follow(this.player);

		// move player with cursor keys
		this.cursors = this.game.input.keyboard.createCursorKeys();

	},
	update : function() {
		// player movement
		this.player.body.velocity.y = 0;
		this.player.body.velocity.x = 0;

		if (this.cursors.up.isDown) {
			this.player.body.velocity.y -= 50;
		} else if (this.cursors.down.isDown) {
			this.player.body.velocity.y += 50;
		}

		if (this.cursors.left.isDown) {
			this.player.body.velocity.x -= 50;
		} else if (this.cursors.right.isDown) {
			this.player.body.velocity.x += 50;
		}

		// collision
		this.game.physics.arcade.collide(this.player, this.blockedLayer);
		this.game.physics.arcade.overlap(this.player, this.chests, this.collect,
				null, this);

	},
	collect : function(player, collectable) {
		collectable.kill();
	},
	createPlayer : function() {
		var result = this.findObjectsByType('playerStart', this.map,
				'objectsLayer');
		// 取用tiled編輯畫面的坐標建立角色
		this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
		
		// 設定更精確的碰撞邊緣
		this.game.physics.arcade.enable(this.player);
		this.player.body.setSize(13, 14, 2, 1);
		
		this.game.physics.arcade.enable(this.player);
	},
	createItems : function() {
		// create items
		this.chests = this.game.add.group();
		this.chests.enableBody = true;
		var chest;
		result = this.findObjectsByType('chest', this.map, 'objectsLayer');
		result.forEach(function(chest) {
			this.createFromTiledObject(chest, this.chests);
		}, this);
	},
	findObjectsByType : function(type, map, layer) {
		var result = new Array();
		map.objects[layer].forEach(function(element) {
			if (element.properties.type === type) {
				element.y -= map.tileHeight;
				result.push(element);
			}
		});
		return result;
	},
	// create a sprite from an object
	createFromTiledObject : function(element, group) {
		var sprite = group.create(element.x, element.y,
				element.properties.sprite);

		// copy all properties to the sprite
		Object.keys(element.properties).forEach(function(key) {
			sprite[key] = element.properties[key];
		});
	}
};

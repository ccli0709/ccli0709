var Phaser = Phaser || {};
var Platformer = Platformer || {};

Platformer.TiledState = function() {
	"use strict";
	Phaser.State.call(this);
};

Platformer.TiledState.prototype = Object.create(Phaser.State.prototype);
Platformer.TiledState.prototype.constructor = Platformer.TiledState;

Platformer.TiledState.prototype.init = function(level_data) {
	"use strict";
	this.level_data = level_data;

	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;

	// start physics system
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.game.physics.arcade.gravity.y = 1000;

	// create map and set tileset
	this.map = this.game.add.tilemap(level_data.map.key);
	this.map.addTilesetImage(this.map.tilesets[0].name, level_data.map.tileset);
};

Platformer.TiledState.prototype.create = function() {
	"use strict";
	var group_name, object_layer, collision_tiles;

	// create map layers
	this.layers = {};
	this.map.layers.forEach(function(layer) {
		// 只會取得圖層，物件層就不在這裡了。
		console.log("***TiledState***1***:" + layer.name)
		this.layers[layer.name] = this.map.createLayer(layer.name);
		// 這裡是讀取客製屬性(collision)來決定是否為碰撞圖層
		if (layer.properties.collision) { // collision layer
			collision_tiles = [];
			layer.data.forEach(function(data_row) { // find tiles used in the
				// layer
				data_row.forEach(function(tile) {
					// check if it's a valid tile index and isn't already in the
					// list
					// 沒有圖塊就是0，數值表示引用的圖塊索引值
					// 看來這裡是來找出所有被用來做碰撞的圖塊有哪些
					if (tile.index > 0
							&& collision_tiles.indexOf(tile.index) === -1) {
						console.log("***TiledState***2***:" + tile.index)
						collision_tiles.push(tile.index);
					}
				}, this);
			}, this);
			this.map.setCollision(collision_tiles, true, layer.name);
		}
	}, this);
	
	// resize the world to be the size of the current layer
	// 何時設定this.map.layer.name為backgroundLayer呢
	// 前面只有指定載入map的key，所以可能自動預設第一層的layer
	this.layers[this.map.layer.name].resizeWorld();
	console.log("***TiledState***3***:" + this.map.layer.name);

	// create groups
	// 使用json就不用在程式裡寫死一堆參數了
	this.groups = {};
	this.level_data.groups.forEach(function(group_name) {
		this.groups[group_name] = this.game.add.group();
	}, this);

	this.prefabs = {};

	for (object_layer in this.map.objects) {
		if (this.map.objects.hasOwnProperty(object_layer)) {
			// create layer objects
			this.map.objects[object_layer].forEach(this.create_object, this);
		}
	}
};

Platformer.TiledState.prototype.create_object = function(object) {
	"use strict";
	var position, prefab;
	// tiled coordinates starts in the bottom left corner
	// 這裡說的是tiled計算起始點的位置與phaser不同，所以坐標要做調整
	// 每個物件都一定有name,type,x,y
	// properties是客製屬性
	position = {
		"x" : object.x + (this.map.tileHeight / 2),
		"y" : object.y - (this.map.tileHeight / 2)
	};
	// create object according to its type
	// 這裡用到prefab裡的js檔案
	// 四種角色都繼承自Prefab，而Prefab則繼承自Phaser.Sprite，使用JavaScript的call
	// 在Prefab裡設定坐標及材質，在之後衍生出來的類別才去設定專屬的行為
	// 特定類別的資料都做在tiled裡的客製屬性，也就是object.properties，也統一各類別的介面
	switch (object.type) {
	case "player":
		prefab = new Platformer.Player(this, position, object.properties);
		break;
	case "ground_enemy":
		prefab = new Platformer.Enemy(this, position, object.properties);
		break;
	case "flying_enemy":
		prefab = new Platformer.FlyingEnemy(this, position, object.properties);
		break;
	case "goal":
		prefab = new Platformer.Goal(this, position, object.properties);
		break;
	}
	// 用name來當key，所以在tiled裡就要好好指定name
	// 在new完之後該角色就已經被加入遊戲當中了，放在陣列裡做管理
	this.prefabs[object.name] = prefab;
};

Platformer.TiledState.prototype.restart_level = function() {
	"use strict";
	this.game.state.restart(true, false, this.level_data);
};

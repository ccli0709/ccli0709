var Phaser = Phaser || {};
var Platformer = Platformer || {};

// 依照JSON資料載入場景及角色設定

Platformer.LoadingState = function() {
	"use strict";
	Phaser.State.call(this);
};

Platformer.prototype = Object.create(Phaser.State.prototype);
Platformer.prototype.constructor = Platformer.LoadingState;

Platformer.LoadingState.prototype.init = function(level_data) {
	"use strict";
	this.level_data = level_data;
};

Platformer.LoadingState.prototype.preload = function() {
	"use strict";
	var assets, asset_loader, asset_key, asset;
	assets = this.level_data.assets;
	for (asset_key in assets) { // load assets according to asset key
		if (assets.hasOwnProperty(asset_key)) {
			asset = assets[asset_key];
			switch (asset.type) {
			case "image":
				this.load.image(asset_key, asset.source);
				break;
			case "spritesheet":
				this.load.spritesheet(asset_key, asset.source,
						asset.frame_width, asset.frame_height, asset.frames,
						asset.margin, asset.spacing);
				break;
			case "tilemap":
				// 這裡已經讀入tilemaps的level1.json
				// 並且命名為level_tilemap
				this.load.tilemap(asset_key, asset.source, null,
						Phaser.Tilemap.TILED_JSON);
				break;
			}
		}
	}
};

Platformer.LoadingState.prototype.create = function() {
	"use strict";
	this.game.state.start("TiledState", true, false, this.level_data);
};
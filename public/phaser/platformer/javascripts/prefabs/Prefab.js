var Phaser = Phaser || {};
var Platformer = Platformer || {};

Platformer.Prefab = function(game_state, position, properties) {
	"use strict";

	// 在tiled裡放置角色時尚未決定材質，和第一課教的不同，
	// 材質是在LoadingState裡載入，在tiled客製屬性裡註明是用的材質，在這裡把兩者結合起來
	Phaser.Sprite.call(this, game_state.game, position.x, position.y,
			properties.texture);

	this.game_state = game_state;

	this.game_state.groups[properties.group].add(this);
};

Platformer.Prefab.prototype = Object.create(Phaser.Sprite.prototype);
Platformer.Prefab.prototype.constructor = Platformer.Prefab;
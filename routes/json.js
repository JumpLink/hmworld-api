module.exports = function (rpg, resource_manager) {
	return {
		map_manager : require('./map_manager')(rpg, resource_manager),
		tileset_manager : require('./tileset_manager')(rpg, resource_manager),
		spriteset_manager : require('./spriteset_manager')(rpg, resource_manager)
	};
};
//TODO move to librpg-node
function parse_tile_query (rpg, tile) {
	if (tile === undefined) {
		return new rpg.TileJsonParam ();
	} else {
		return new rpg.TileJsonParam({
			tex : (tile.tex == '' || tile.tex == 1),
			gid : (tile.gid == '' || tile.gid == 1),
			size : (tile.size == '' || tile.size == 1),
			tile_type : (tile.tile_type == '' || tile.tile_type == 1)
		});
	}
}

//TODO move to librpg-node
function parse_tileset_query (rpg, tileset) {
	if (tileset === undefined) {
		return new rpg.TilesetJsonParam ();
	} else {
		return new rpg.TilesetJsonParam({
			name : (tileset.name == '' || tileset.name == 1),
			filename : (tileset.filename == '' || tileset.filename == 1),
			tile_size : (tileset.tile_size == '' || tileset.tile_size == 1),
			source : (tileset.source == '' || tileset.source == 1),
			transparency : (tileset.transparency == '' || tileset.transparency == 1),
			size : (tileset.size == '' || tileset.size == 1),
			count : (tileset.count == '' || tileset.count == 1),
			tex : (tileset.tex == '' || tileset.tex == 1),
			tile : parse_tile_query (rpg, tileset.tile)
		});
	}
}

//TODO move to librpg-node
function parse_tileset_manager_query (rpg, params) {
	if (params === undefined) {
		return new rpg.TilesetManagerJsonParam ();
	} else {
		return new rpg.TilesetManagerJsonParam({
			folder : (params.folder == '' || params.folder == 1),
			tileset : parse_tileset_query (rpg, params.tileset)
		});
	}
}

module.exports = function (rpg, resource_manager) {
	return {
		get_tileset_manager : function (req, res) {
			if(Object.keys(req.query).length > 0) {
				var vala_params = parse_tileset_manager_query(rpg, req.query);
				json = resource_manager.tilesetmanager.get_json_indi_as_str(vala_params);
			} else {
				json = '{"error": "no query string passed"}';
			}
			res.setHeader('Content-Type', 'application/json');
			res.send(json);
		},
		get_tileset_from : {
			filename : function (req, res) {
				if(Object.keys(req.query).length > 0) {
					var vala_tileset_params = parse_tileset_query(rpg, req.query);
					json = resource_manager.tilesetmanager.get_from_filename(req.params.filename).get_json_indi_as_str(vala_tileset_params);
				} else {
					json = '{"error": "no query string passed"}';
				}

				res.setHeader('Content-Type', 'application/json');
				res.send(json);
			}
		},
		get_tile_from : {
			index : function (req, res) {
				var param_count = Object.keys(req.query).length;

				if(param_count > 0) {
					var vala_tile_params = parse_tile_query(rpg, req.query);
					json = resource_manager.tilesetmanager.get_from_filename(req.params.filename).get_tile_from_index(req.params.index).get_json_indi_as_str(vala_tile_params);
				} else {
					json = '{"error": "no query string passed"}';
				}

				res.setHeader('Content-Type', 'application/json');
				res.send(json);
			},
		}
	}
}
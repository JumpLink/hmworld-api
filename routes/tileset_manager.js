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

module.exports = function (rpg, resource_manager) {
	return {
		tile : {
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
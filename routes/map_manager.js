
//TODO move to librpg-node
function parse_map_layer_query (rpg, layer) {
	if (layer === undefined) {
		return new rpg.MapLayerJsonParam ();
	} else {
		return new rpg.MapLayerJsonParam({
			with_name : (layer.name == '' || layer.name == 1),
			with_zoff : (layer.zoff == '' || layer.zoff == 1),
			with_size : (layer.size == '' || layer.size == 1),
			with_collision : (layer.collision == '' || layer.collision == 1),
			with_data : (layer.data == '' || layer.data == 1),
			with_texture : (layer.texture == '' || layer.texture == 1)
		});
	}
}

//TODO move to librpg-node
function parse_map_query (rpg, map) {
	console.log(map);
	if (map === undefined) {
		return new rpg.MapJsonParam ();
	} else {
		return new rpg.MapJsonParam ({
			with_filename : (map.filename == '' || map.filename == 1),
			with_orientation : (map.orientation == '' || map.orientation == 1),
			with_version : (map.version == '' || map.version == 1),
			with_size : (map.size == '' || map.size == 1),
			with_tilesize : (map.tilesize == '' || map.tilesize == 1),
			with_property : (map.property == '' || map.property == 1),
			with_merged_layer_pixbuf : (map.pixbuf == '' || map.pixbuf == 1),
			map_layer_params : parse_map_layer_query(rpg, map.layer)
		});
	}
}

function parse_map_manager_query (rpg, map_manager) {
	if (map_manager === undefined) {
		return new rpg.MapManagerJsonParam ();
	} else {
		return new rpg.MapManagerJsonParam ({
			with_folder : (map_manager.folder == '' || map_manager.folder == 1),
			map_params : parse_map_query (rpg, map_manager.map)
		});
	}
}

/*
 * GET users listing.
 */
module.exports = function (rpg, resource_manager) {
	return {
		default: function (req, res){
			var param_count = Object.keys(req.query).length;

			if(param_count > 0) {
				var vala_map_params = parse_map_query(rpg, req.query.map);

				var vala_map_manager_params = parse_map_manager_query (rpg, req.query);

				json = resource_manager.mapmanager.get_json_indi_as_str(vala_map_manager_params);
			} else {
				json = '{"error": "no query string passed"}';
			}

			res.setHeader('Content-Type', 'application/json');
			res.send(json);
		},

		filename: function (req, res) {
			var param_count = Object.keys(req.query).length;

			var map = resource_manager.mapmanager.get_from_filename(req.params.filename);

			var vala_map_params = parse_map_query(rpg, req.query);

			if(map != null) {
				var json;
				if(param_count > 0)
					json = map.get_json_indi_as_str(vala_map_params);
				else
					json = '{"error": "no query string passed"}';
				res.setHeader('Content-Type', 'application/json');
				res.send(json);
			} else {
				res.json({error:"map not found", filename:req.params.filename});
			}
		},

		layer: {
			index: function (req, res) {
				var param_count = Object.keys(req.query).length;

				var layer = resource_manager.mapmanager.get_from_filename(req.params.filename).get_layer_from_index(req.params.layer_index);

				var vala_map_layer_params = parse_map_layer_query(rpg, req.query);

				if(layer != null) {
					var json;
					if(param_count > 0)
						json = layer.get_json_indi_as_str(vala_map_layer_params);
					else
						json = '{"error": "no query string passed"}';
					res.setHeader('Content-Type', 'application/json');
					res.send(json);
				} else {
					res.json({error:"layer not found", filename:req.params.filename});
				}
			}
		}
	};
};
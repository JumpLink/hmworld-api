
//TODO move to librpg-node
function parse_map_query(map) {
	return {
		with_filename: (map.filename == '' || map.filename == 1),
		with_orientation: (map.orientation == '' || map.orientation == 1),
		with_version: (map.version == '' || map.version == 1),
		with_size: (map.size == '' || map.size == 1),
		with_tilesize: (map.tilesize == '' || map.tilesize == 1),
		with_property: (map.property == '' || map.property == 1),
		with_layer: (map.layer == '' || map.layer == 1),
		with_merged_layer_pixbuf: (map.pixbuf == '' || map.pixbuf == 1)
	};
}
//TODO move to librpg-node
function get_map_query_deault(map) {
	return {
		with_filename: true,
		with_orientation: false,
		with_version: false,
		with_size: false,
		with_tilesize: false,
		with_property: false,
		with_layer: false,
		with_merged_layer_pixbuf: false
	};
}
/*
 * GET users listing.
 */
module.exports = function (rpg, resource_manager) {
	return {
		default: function (req, res){

			var param_count = Object.keys(req.query).length;

			if(param_count > 0) {


				var vala_map_params;
				if(map !== undefined) {
					vala_map_params = new rpg.MapJsonParam(parse_map_query(req.map));
				} else {
					vala_map_params = new rpg.MapJsonParam(get_map_query_deault());
				}

				var vala_map_manager_params = new rpg.MapManagerJsonParam({
					with_folder : (req.query.folder == '' || req.query.folder == 1),
					map_params : vala_map_params
				});

				json = resource_manager.mapmanager.get_json_indi_as_str(vala_map_manager_params);
			} else
				json = resource_manager.mapmanager.json_str;

			res.setHeader('Content-Type', 'application/json');
			res.send(json);
		},
		filename: function (req, res){

			var param_count = Object.keys(req.query).length;

			var map = resource_manager.mapmanager.get_from_filename(req.params.filename);

			var vala_map_params = new rpg.MapJsonParam(parse_map_query(req));

			if(map != null) {
				var json;
				if(param_count > 0)
					json = map.get_json_indi_as_str(vala_map_params);
				else
					json = map.json_str;
				res.setHeader('Content-Type', 'application/json');
				res.send(json);
			} else {
				res.json({error:"map not found", filename:req.params.filename});
			}
		}

	};
};
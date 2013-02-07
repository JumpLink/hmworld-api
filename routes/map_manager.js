
/*
 * GET users listing.
 */
module.exports = function (rpg, resource_manager) {
	return {
		default: function (req, res){

			var param_count = Object.keys(req.query).length;

			if(param_count > 0) {


				var vala_map_params;
				if(req.query.map !== undefined) {
					vala_map_params = new rpg.MapJsonParam({
						with_filename: (req.query.map.filename == '' || req.query.map.filename == 1),
						with_orientation: (req.query.map.orientation == '' || req.query.map.orientation == 1),
						with_version: (req.query.map.version == '' || req.query.map.version == 1),
						with_size: (req.query.map.size == '' || req.query.map.size == 1),
						with_tilesize: (req.query.map.tilesize == '' || req.query.map.tilesize == 1),
						with_property: (req.query.map.property == '' || req.query.map.property == 1),
						with_layer: (req.query.map.layer == '' || req.query.map.layer == 1),
						with_merged_layer_pixbuf: (req.query.map.pixbuf == '' || req.query.map.pixbuf == 1)
					});
				} else {
					vala_map_params = new rpg.MapJsonParam({
						with_filename: true,
						with_orientation: false,
						with_version: false,
						with_size: false,
						with_tilesize: false,
						with_property: false,
						with_layer: false,
						with_merged_layer_pixbuf: false
					});
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
		}

	};
};
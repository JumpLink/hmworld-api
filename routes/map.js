
/*
 * GET users listing.
 */
module.exports = function (rpg, rs) {
	return {
		filename: function (req, res){

			var param_count = Object.keys(req.query).length;

			var map = rs.mapmanager.get_from_filename(req.params.filename);

			var vala_map_params = new rpg.MapJsonParam({
				with_filename: (req.query.filename == '' || req.query.filename == 1),
				with_orientation: (req.query.orientation == '' || req.query.orientation == 1),
				with_version: (req.query.version == '' || req.query.version == 1),
				with_size: (req.query.size == '' || req.query.size == 1),
				with_tilesize: (req.query.tilesize == '' || req.query.tilesize == 1),
				with_property: (req.query.property == '' || req.query.property == 1),
				with_layer: (req.query.layer == '' || req.query.layer == 1),
				with_merged_layer_pixbuf: (req.query.pixbuf == '' || req.query.pixbuf == 1)
			});

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
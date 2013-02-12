

module.exports = function (rpg, resource_manager) {
	return {
		map_manager : {
			get_layer_from : {
				index : function (req, res) {
					var layer = resource_manager.mapmanager.get_from_filename(req.params.filename).get_layer_from_index(req.params.layer_index);

					if(layer != null) {
						var json_string = layer.get_json_indi_as_str(new rpg.MapLayerJsonParam ({with_texture : true}));
						var json_data = JSON.parse(json_string);
						var buf = new Buffer(json_data.texture, encoding='Base64');

						res.setHeader('Content-Type', 'image/png');
						res.send(buf);

					} else {
						res.json({error:"layer not found", filename:req.params.filename});
					}
				}
			}
		}
	};
};

module.exports = function (rpg, resource_manager) {
	return {
		map_manager : {
			get_layer_from : {
				index : function (req, res) {
					var layer = resource_manager.mapmanager.get_from_filename(req.params.filename).get_layer_from_index(req.params.layer_index);

					if(layer !== null) {
						var base64 = layer.tex.base64;
						var buf = new Buffer(base64, encoding='Base64');
						res.setHeader('Content-Type', 'image/png');
						res.send(buf);

					} else {
						res.json({error:"layer not found", filename:req.params.filename});
					}
				}
			},
			get_merged_layer_from : {
				type : {
					over : function (req, res) {
						var map = resource_manager.mapmanager.get_from_filename(req.params.filename);

						if(map !== null) {
							var base64 = map.over.base64;
							var buf = new Buffer(base64, encoding='Base64');
							res.setHeader('Content-Type', 'image/png');
							res.send(buf);
						} else {
							res.json({error:"map not found", filename:req.params.filename});
						}
					},
					under : function (req, res) {
						var map = resource_manager.mapmanager.get_from_filename(req.params.filename);

						if(map !== null) {
							var base64 = map.under.base64;
							var buf = new Buffer(base64, encoding='Base64');
							res.setHeader('Content-Type', 'image/png');
							res.send(buf);
						} else {
							res.json({error:"map not found", filename:req.params.filename});
						}
					}
				}
			}
		},
		spriteset_manager : {
			get_spriteset_from : {
				filename : function (req, res) {
					var spriteset = resource_manager.spritesetmanager.get_from_filename(req.params.filename);

					if(spriteset !== null) {
						var base64 = spriteset.merge_layer().base64;
						var buf = new Buffer(base64, encoding='Base64');
						res.setHeader('Content-Type', 'image/png');
						res.send(buf);
					} else {
						res.json({error:"spriteset not found", filename:req.params.filename});
					}
				}
			}
		}
	};
};
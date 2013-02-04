
/*
 * GET users listing.
 */
module.exports = function (rs) {
	return {
		filename: function (req, res){

			var param_count = Object.keys(req.query).length;

			var par = {
				filename : (req.query.filename == '' || req.query.filename == 1),
				orientation : (req.query.orientation == '' || req.query.orientation == 1),
				version : (req.query.version == '' || req.query.version == 1),
				size : (req.query.size == '' || req.query.size == 1),
				tilesize : (req.query.tilesize == '' || req.query.tilesize == 1),
				property : (req.query.property == '' || req.query.property == 1),
				layer : (req.query.layer == '' || req.query.layer == 1),
				pixbuf : (req.query.pixbuf == '' || req.query.pixbuf == 1)
			};

			var map = rs.mapmanager.get_from_filename(req.params.filename);

			if(map != null) {
				if(par.pixbuf)
					map.merge();
				var json;
				if(param_count > 0)
					json = map.get_json_indi_as_str(par.filename, par.orientation, par.version, par.size, par.tilesize, par.property, par.layer, par.pixbuf);
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
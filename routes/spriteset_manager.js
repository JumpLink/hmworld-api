//TODO move to librpg-node
function parse_sprite_query (rpg, sprite) {
	if (sprite === undefined) {
		return new rpg.SpriteJsonParam ();
	} else {
		return new rpg.SpriteJsonParam ({
			size : (sprite.size === '' || sprite.size == 1),
			tex : (sprite.tex === '' || sprite.tex == 1)
		});
	}
}

//TODO move to librpg-node
function parse_sprite_frame_query (rpg, frame) {
	if (frame === undefined) {
		return new rpg.SpriteFrameJsonParam ();
	} else {
		return new rpg.SpriteFrameJsonParam ({
			coord : (frame.coord === '' || frame.coord == 1),
			mirror : (frame.mirror === '' || frame.mirror == 1)
		});
	}
}

//TODO move to librpg-node
function parse_sprite_animation_query (rpg, animation, frame) {
	if (animation === undefined) {
		return new rpg.SpriteAnimationJsonParam ();
	} else {
		return new rpg.SpriteAnimationJsonParam ({
			name : (animation.name === '' || animation.name == 1),
			direction : (animation.direction === '' || animation.direction == 1),
			repeat : (animation.repeat === '' || animation.repeat == 1),
			number_of_frames : (animation.number_of_frames === '' || animation.number_of_frames == 1),
			frame_ps : (animation.frame_ps === '' || animation.frame_ps == 1),
			frame : parse_sprite_frame_query(rpg, frame)
		});
	}
}

//TODO move to librpg-node
function parse_sprite_layer_query (rpg, layer, sprite) {
	if (layer === undefined) {
		return new rpg.SpriteLayerJsonParam ();
	} else {
		return new rpg.SpriteLayerJsonParam ({
			sl_type : (layer.type === '' || layer.type == 1),
			active : (layer.active === '' || layer.active == 1),
			name : (layer.name === '' || layer.name == 1),
			number : (layer.number === '' || layer.number == 1),
			image_filename : (layer.image_filename === '' || layer.image_filename == 1),
			image_size : (layer.image_size === '' || layer.image_size == 1),
			folder : (layer.folder === '' || layer.folder == 1),
			transparency : (layer.transparency === '' || layer.transparency == 1),
			size : (layer.size === '' || layer.size == 1),
			sprite_size : (layer.sprite_size === '' || layer.sprite_size == 1),
			tex : (layer.tex === '' || layer.tex == 1),
			sprite : parse_sprite_query(rpg, sprite)
		});
	}
}

//TODO move to librpg-node
function parse_spriteset_query (rpg, spriteset, layer, animation, frame, sprite) {
	if (spriteset === undefined) {
		return new rpg.SpritesetJsonParam ();
	} else {
		return new rpg.SpritesetJsonParam ({
			filename : (spriteset.filename === '' || spriteset.filename == 1),
			folder : (spriteset.folder === '' || spriteset.folder == 1),
			name : (spriteset.name === '' || spriteset.name == 1),
			size : (spriteset.size === '' || spriteset.size == 1),
			sprite_size : (spriteset.sprite_size === '' || spriteset.sprite_size == 1),
			pixel_size : (spriteset.pixel_size === '' || spriteset.pixel_size == 1),
			version : (spriteset.version === '' || spriteset.version == 1),
			layer : parse_sprite_layer_query(rpg, layer, sprite),
			animation : parse_sprite_animation_query(rpg, animation, frame)
		});
	}
}

module.exports = function (rpg, resource_manager) {
	return {
		get_spriteset_from : {
			filename : function (req, res) {
				var param_count = Object.keys(req.query).length;

				var spriteset = resource_manager.spritesetmanager.get_from_filename(req.params.filename);
				var vala_params = parse_spriteset_query(rpg, req.query, req.query.layer, req.query.animation, req.query.frame, req.query.sprite);

				if(spriteset !== null) {
					var json;
					if(param_count > 0)
						json = spriteset.get_json_indi_as_str(vala_params);
					else
						json = '{"error": "no query string passed"}';
					res.setHeader('Content-Type', 'application/json');

					if(req.query.callback)
						json = req.query.callback+'('+json+');';

					res.send(json);
				} else {
					res.json({error:"spriteset not found", filename:req.params.filename});
				}
			}
		}
	};
};
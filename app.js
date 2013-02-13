
/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    gir = require('gir'),
    rpg = gir.load('rpg'),
    routes = require('./routes');

var app = express();

function init_rpg() {
  rs = new rpg.ResourceManager();
  rs.load_spriteset_manager(__dirname+"/public/data/spriteset/");
  rs.load_tileset_manager(__dirname+"/public/data/tileset/");
  rs.load_map_manager(__dirname+"/public/data/map/");
}
init_rpg();

var image = require('./routes/image')(rpg, rs);
var json = require('./routes/json')(rpg, rs);

app.configure(function(){
  app.set('port', process.env.PORT || 3005);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

app.get('/', routes.index);

/* JSON */ {
  /* MapManager */ {
    app.get('/json/resource_manager/map_manager', json.map_manager.get_map_manager);
    app.get('/json/resource_manager/map_manager/:filename', json.map_manager.get_map_from.filename);
    app.get('/json/resource_manager/map_manager/:filename/:layer_index', json.map_manager.get_layer_from.index);
  }

  /* TilesetManager */ {
    app.get('/json/resource_manager/tileset_manager', json.tileset_manager.get_tileset_manager);
    app.get('/json/resource_manager/tileset_manager/:filename', json.tileset_manager.get_tileset_from.filename);
    app.get('/json/resource_manager/tileset_manager/:filename/:tile_index', json.tileset_manager.get_tile_from.index);
  }

  /* Sprites */ {
    app.get('/json/resource_manager/spriteset_manager/:filename', json.spriteset_manager.get_spriteset_from.filename);
  }
}

/* IMAGE */ {
  /* Layer */ {
    app.get('/image/resource_manager/map_manager/:filename/under', image.map_manager.get_merged_layer_from.type.under);
    app.get('/image/resource_manager/map_manager/:filename/over', image.map_manager.get_merged_layer_from.type.over);
    app.get('/image/resource_manager/map_manager/:filename/:layer_index', image.map_manager.get_layer_from.index);
  }
  /* Sprites */ {
    app.get('/image/resource_manager/spriteset_manager/:filename', image.spriteset_manager.get_spriteset_from.filename);
  }
}

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

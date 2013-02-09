
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

var map_manager = require('./routes/map_manager')(rpg, rs);
var tileset_manager = require('./routes/tileset_manager')(rpg, rs);

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

/* MapManager */
app.get('/resource_manager/map_manager', map_manager.get_map_manager);
app.get('/resource_manager/map_manager/:filename', map_manager.get_map_from.filename);
app.get('/resource_manager/map_manager/:filename/:layer_index', map_manager.get_layer_from.index);

/* TilesetManager */
app.get('/resource_manager/tileset_manager', tileset_manager.get_tileset_manager);
app.get('/resource_manager/tileset_manager/:filename', tileset_manager.get_tileset_from.filename);
app.get('/resource_manager/tileset_manager/:filename/:tile_index', tileset_manager.get_tile_from.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


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

map = require('./routes/map')(rs);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/map/:filename', map.filename);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

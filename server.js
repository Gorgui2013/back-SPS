const express = require('express');
var cors = require('cors');
require('dotenv').config();
const Files = require('gwalk-lib');
// mongoose
const { default: mongoose } = require('mongoose');
//const swaggerUI = require('swagger-ui-express');
//const swaggerDocument = require('./openapi.json');


// init express app
const app = express();
//app.use('/api',swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// body parsers
app.use(cors({origin: '*'}));
app.use(express.urlencoded({extended: false}));
app.use(express.json({extended: false}));
app.use(express.static('public'));

// connecter à la base de données
console.log('connected in DB...');
mongoose.connect(process.env.DB_URL).then((result) => {
    console.log('App is connected to AtlasDB');
    initApp();
}).catch((error) => {
    console.log('error When connected in DB'+error);
});

function initApp() {
  //AUTOLOAD ROUTES
  var routes = Files.walk(__dirname + '/api/modules');

  // IMPORT PUBLIC ROUTES
  for (var i = 0; i < routes.length; i++) {
    if (routes[i].indexOf('public.routes') !== -1) {
        require(routes[i])(app);
    }
  }
      
  // USE GUARD MIDDLEWARE
  require('./api/modules/auth/auth.guard')(app);

  // IMPORT PRIVATE ROUTES
  for (var i = 0; i < routes.length; i++){
    if (routes[i].indexOf('routes') !== -1 && routes[i].indexOf('public.routes') === -1) {
          require(routes[i])(app);
    }
  }

  app.listen(process.env.PORT, () => {
      console.log('Server Listening');
  });
}




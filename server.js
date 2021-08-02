const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
// const routes = require('./controllers');
// const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
// const hbs = exphbs.create({ helpers });

// const sess = {
//   secret: 'Super secret secret',
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize,
//   }),
// };
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({
  layoutsDir: `${__dirname}/views/layouts`
}));


// app.use(session(sess));
app.use(express.static(path.join(__dirname, 'public')));
 app.get("/*", (req, res) => {
   res.render('homepage',{layout: 'main'});
});


// Inform Express.js on which template engine to use


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(routes);

// force = true drops entire db
// sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
// });
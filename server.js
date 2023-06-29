const express = require('express');

const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const routes = require('./routes');

const routes = require('./controllers');

const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Set Handlebars as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
//Correcet file path needs to be added below
//app.use(require('./controllers/'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Establish the database connection and sync sequelize models 
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    return sequelize.sync({ force: false });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

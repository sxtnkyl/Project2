const sequelize = require('../config/connection');
const { User, Instrument, Genre, Connections } = require('../models');

const userData = require('./userData.json');
const instrumentData = require('./instrumentData.json');
const genreData = require('./genreData.json');
const connectionData = require('./connectionData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const instruments = await Instrument.bulkCreate(instrumentData);
  const genres = await Genre.bulkCreate(genreData);
  const connects = await Connections.bulkCreate(connectionData);
  const users = await User.bulkCreate(userData, {
    // individualHooks: true,
    // returning: true,
  });

  process.exit(0);
};

seedDatabase();

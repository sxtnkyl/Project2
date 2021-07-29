const User = require('./User');
const Instrument = require('./Instrument');
const Genre = require('./Genre');
const Connections = require('./Connections');

User.belongsTo(Instrument, {
  foreignKey: 'user_instrument',
});
Instrument.hasMany(User, {
  foreignKey: 'user_instrument',
});

User.belongsTo(Genre, {
  foreignKey: 'user_genre',
});
Genre.hasMany(User, {
  foreignKey: 'user_genre',
});

User.hasMany(Connections, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
User.hasMany(Connections, {
  foreignKey: 'target_id',
  onDelete: 'CASCADE',
});

module.exports = { User, Instrument, Genre, Connections };

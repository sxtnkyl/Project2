const User = require('./User');
const Instrument = require('./Instrument');
const Genre = require('./Genre');
const Connections = require('./Connections');

User.hasOne(Instrument, {
  foreignKey: 'user_instrument',
});
User.hasOne(Genre, {
  foreignKey: 'user_genre',
});
User.hasMany(Connections, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

module.exports = { User };

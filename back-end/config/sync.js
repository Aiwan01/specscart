// sync.js
const { sequelize } = require('./.models');

sequelize.sync({ force: true }) // use { force: true } to drop & recreate
  .then(() => {
    console.log(' Database synced');
    process.exit();
  })
  .catch((err) => {
    console.error(' Error syncing DB:', err);
  });
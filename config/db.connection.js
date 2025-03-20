const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

// test db connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection established successfully.");
    // Sync the model with the database
    sequelize.sync({ force: false }); // 
    console.log("Database synchronized");
  } catch (error) {
    console.error("Error connect to the database:", error);
  }
})();

module.exports = sequelize;

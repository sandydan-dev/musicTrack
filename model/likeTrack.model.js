const sequelize = require("../config/db.connection");
const { DataTypes } = require("sequelize");
const track = require("./track.model");

const like = sequelize.define("like", {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  trackId: {
    type: DataTypes.INTEGER,
    references: {
      model: track,
      key: "id",
    },
  },
});

// Define the association between Like and Track models
like.belongsTo(track, { foreignKey: "trackId" });

like.sync({ force: false }); // Sync the model with the database
module.exports = like;

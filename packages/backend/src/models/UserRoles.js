const mongoose = require("mongoose");

const userRolesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

const UserRoles = mongoose.model("UserRoles", userRolesSchema);

module.exports = UserRoles;

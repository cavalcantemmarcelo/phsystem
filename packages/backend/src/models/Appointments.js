const mongoose = require("mongoose");

const appointmentsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Places",
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pendente", "aprovado", "rejeitado", "realizado"],
    default: "pending",
  },
  userRole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserRoles",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
  },
});

const Appointments = mongoose.model("Appointments", appointmentsSchema);

module.exports = Appointments;

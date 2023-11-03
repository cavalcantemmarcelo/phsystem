const { check, validationResult } = require("express-validator");
const Appointments = require("../models/Appointments");

const validationRules = [];

module.exports = {
  async index(req, res) {
    const appointments = await Appointments.find().populate(
      "user place category"
    );
    return res.json(appointments);
  },

  async validationResult(req, res) {
    validationRules.forEach((rule) => rule(req));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return res.status(200);
  },

  async store(req, res) {
    const { user, place, endTime, status, userRole, category } = req.body;

    const startTime = new Date().toISOString();

    try {
      const appointment = await Appointments.create({
        user,
        place,
        endTime,
        status,
        userRole,
        category,
      });
      return res.status(200).json(appointment);
    } catch (err) {
      return res.status(400).json({ error: "Error creating appointment" });
    }
  },

  async update(req, res) {
    const validationResultResponse = await this.validationResult(req, res);

    if (validationResultResponse.status !== 200) {
      return res
        .status(validationResultResponse.status)
        .json(validationResultResponse);
    }

    const { user, place, endTime, status, userRole, category } = req.body;

    const appointment = await Appointments.findByIdAndUpdate(
      req.params.id,
      {
        user,
        place,
        endTime,
        status,
        userRole,
        category,
      },
      { new: true }
    );

    if (!appointment) {
      return res.status(400).json({ error: "Appointment not found" });
    }

    return res.status(200).json(appointment);
  },

  async destroy(req, res) {
    const appointment = await Appointments.findByIdAndRemove(req.params.id);

    if (!appointment) {
      return res.status(400).json({ error: "Appointment not found" });
    }

    return res.send();
  },

  async show(req, res) {
    try {
      const appointment = await Appointments.findById(req.params.id)
        .populate("user", "email fullname")
        .populate("place", "name")
        .populate("category", "name");

      if (!appointment) {
        return res.status(404).json({ error: "Appointment not found" });
      }

      return res.json(appointment);
    } catch (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

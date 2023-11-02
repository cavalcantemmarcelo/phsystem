const { check, validationResult } = require("express-validator");
const Appointments = require("../models/Appointments");

const validationRules = [
  check("user").isMongoId().withMessage("Invalid user ID"),
  check("place").isMongoId().withMessage("Invalid place ID"),
  check("startTime").isISO8601().withMessage("Invalid start time"),
  check("endTime").isISO8601().withMessage("Invalid end time"),
  check("status")
    .isIn(["pendente", "aprovado", "rejeitado"])
    .withMessage("Invalid status"),
  check("userRole").isMongoId().withMessage("Invalid userRole ID"),
  check("category").isMongoId().withMessage("Invalid category ID"),
];

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
    const validationResultResponse = await this.validationResult(req, res);

    if (validationResultResponse.status !== 200) {
      return validationResultResponse;
    }

    const { user, place, startTime, endTime, status, userRole, category } =
      req.body;

    try {
      const appointment = await Appointments.create({
        user,
        place,
        startTime,
        endTime,
        status,
        userRole,
        category,
      });
      return res.json(appointment);
    } catch (err) {
      return res.status(400).json({ error: "Error creating appointment" });
    }
  },

  async update(req, res) {
    const validationResultResponse = await this.validationResult(req, res);

    if (validationResultResponse.status !== 200) {
      return validationResultResponse;
    }

    const { user, place, startTime, endTime, status, userRole, category } =
      req.body;

    const appointment = await Appointments.findByIdAndUpdate(
      req.params.id,
      {
        user,
        place,
        startTime,
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

    return res.json(appointment);
  },

  async destroy(req, res) {
    const appointment = await Appointments.findByIdAndRemove(req.params.id);

    if (!appointment) {
      return res.status(400).json({ error: "Appointment not found" });
    }

    return res.send();
  },

  async show(req, res) {
    const appointment = await Appointments.findById(req.params.id).populate(
      "user place category"
    );
    return res.json(appointment);
  },
};

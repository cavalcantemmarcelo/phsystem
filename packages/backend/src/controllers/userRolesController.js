const { validationResult, check } = require("express-validator");
const UserRole = require("../models/UserRole");

const userRoleValidationRules = [
  check("name").not().isEmpty().withMessage("User role name is required"),
];

module.exports = {
  async index(req, res) {
    const userRoles = await UserRole.find();
    return res.json(userRoles);
  },

  async show(req, res) {
    const userRole = await UserRole.findById(req.params.id);
    if (!userRole) {
      return res.status(404).json({ error: "User role not found" });
    }
    return res.json(userRole);
  },

  async store(req, res) {
    userRoleValidationRules.forEach((rule) => rule(req));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    try {
      const userRole = await UserRole.create({ name });
      return res.json(userRole);
    } catch (err) {
      return res.status(400).json({ error: "Error creating user role" });
    }
  },

  async update(req, res) {
    // Validate the request
    userRoleValidationRules.forEach((rule) => rule(req));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    const userRole = await UserRole.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!userRole) {
      return res.status(404).json({ error: "User role not found" });
    }

    return res.json(userRole);
  },

  async destroy(req, res) {
    const userRole = await UserRole.findByIdAndRemove(req.params.id);

    if (!userRole) {
      return res.status(404).json({ error: "User role not found" });
    }

    return res.send();
  },
};

const { validationResult, check } = require("express-validator");
const UserRole = require("../models/UserRoles");

const userRoleValidationRules = [
  //   check("name").not().isEmpty().withMessage("User role name is required"),
  //   check("description").optional(),
  //   check("user").isMongoId().withMessage("Invalid user ID"),
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

    const { name, description, user } = req.body;

    try {
      const userRole = await UserRole.create({ name, description, user });
      return res.json(userRole);
    } catch (err) {
      return res.status(400).json({ error: "Error creating user role" });
    }
  },

  async update(req, res) {
    userRoleValidationRules.forEach((rule) => rule(req));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, user } = req.body;

    const userRole = await UserRole.findByIdAndUpdate(
      req.params.id,
      { name, description, user },
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

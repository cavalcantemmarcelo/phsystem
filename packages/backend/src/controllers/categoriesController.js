const { validationResult, check } = require("express-validator");
const Category = require("../models/Categories");

const validationRules = [
  check("name").not().isEmpty().withMessage("Category name is required"),
];

module.exports = {
  async index(req, res) {
    const categories = await Category.find();
    return res.json(categories);
  },

  async show(req, res) {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    return res.json(category);
  },

  async store(req, res) {
    categoriesValidationRules.forEach((rule) => rule(req));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;

    try {
      const category = await Category.create({ name, description });
      return res.status(200).json(category);
    } catch (err) {
      return res.status(400).json({ error: "Error creating category" });
    }
  },

  async update(req, res) {
    categoriesValidationRules.forEach((rule) => rule(req));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.status(200).json(category);
  },

  async destroy(req, res) {
    const category = await Category.findByIdAndRemove(req.params.id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.send();
  },
};

const { validationResult } = require("express-validator");
const Places = require("../models/Places");

module.exports = {
  async index(req, res) {
    const places = await Places.find();
    return res.json(places);
  },

  async store(req, res) {
    const {
      name,
      image,
      link,
      description,
      location,
      tags,
      category,
      city,
      capacity,
    } = req.body;

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const place = await Places.create({
        name,
        image,
        link,
        description,
        location,
        tags,
        category,
        city,
        capacity,
      });
      return res.json(place);
    } catch (err) {
      return res.status(400).json({ error: err.status });
    }
  },

  async update(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {
        name,
        image,
        link,
        description,
        location,
        tags,
        category,
        city,
        capacity,
      } = req.body;
      const place = await Places.findByIdAndUpdate(
        req.params.id,
        {
          name,
          image,
          link,
          description,
          location,
          tags,
          category,
          city,
          capacity,
        },
        { new: true }
      );

      return res.json(place);
    } catch (err) {
      return res.status(400).json({ error: err.status });
    }
  },

  async destroy(req, res) {
    const place = await Places.findByIdAndRemove(req.params.id);

    if (!place) {
      return res.status(400).send({ error: "Local não encontrado" });
    }

    return res.send();
  },

  async show(req, res) {
    const place = await Places.findById(req.params.id);
    return res.json(place);
  },
};

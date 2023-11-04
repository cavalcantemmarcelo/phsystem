const Cities = require("../models/Cities");

module.exports = {
  async index(req, res) {
    const cities = await Cities.find();
    return res.json(cities);
  },

  async store(req, res) {
    const { name, state } = req.body;

    try {
      const city = await Cities.create({
        name,
        state,
      });

      return res.json(city);
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, message: "Error creating city" });
    }
  },

  async update(req, res) {
    try {
      const { name, state } = req.body;

      const city = await Cities.findByIdAndUpdate(
        req.params.id,
        {
          name,
          state,
        },
        { new: true }
      );

      return res.status(200).json(city);
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, message: "Error updating city" });
    }
  },

  async destroy(req, res) {
    try {
      const city = await Cities.findByIdAndRemove(req.params.id);

      if (!city) {
        return res.status(400).send({ error: "Cidade não encontrada" });
      }

      return res.send();
    } catch (error) {
      console.error("Erro ao deletar cidade:", error);
      return res
        .status(500)
        .json({ status: false, message: "Erro ao deletar a cidade." });
    }
  },

  async show(req, res) {
    const city = await Cities.findById(req.params.id);
    return res.json(city);
  },
};

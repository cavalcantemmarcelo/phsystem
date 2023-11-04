const express = require("express");
const router = express.Router();
const citiesController = require("../controllers/citiesController");
const { check, validationResult } = require("express-validator");

const validations = [
  check("name").notEmpty().withMessage("Name cannot be empty"),
  check("state").notEmpty().withMessage("State cannot be empty"),
];

router.get("/", citiesController.index);

router.post("/", validations, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  citiesController.store(req, res);
});

router.get("/:id", citiesController.show);

router.put("/:id", validations, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  citiesController.update(req, res);
});

router.delete("/:id", citiesController.destroy);

module.exports = router;

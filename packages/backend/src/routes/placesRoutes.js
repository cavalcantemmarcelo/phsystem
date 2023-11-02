const express = require("express");
const router = express.Router();
const placesController = require("../controllers/placesController");
const { check, validationResult } = require("express-validator");

const validations = [
  check("name").notEmpty().withMessage("Name cannot be empty"),
  check("city").notEmpty().withMessage("City cannot be empty"),
  check("capacity").notEmpty().withMessage("Capacity cannot be empty"),
];

router.get("/", placesController.index);
router.post("/", validations, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  placesController.store(req, res);
});
router.get("/:id", placesController.show);
router.put("/:id", validations, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  placesController.update(req, res);
});
router.delete("/:id", placesController.destroy);

module.exports = router;

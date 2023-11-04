const express = require("express");
const router = express.Router();
const statesController = require("../controllers/statesController");
const { check, validationResult } = require("express-validator");

const validations = [
  check("name").notEmpty().withMessage("Name cannot be empty"),
  check("abbreviation").notEmpty().withMessage("Abbreviation cannot be empty"),
];

router.get("/", statesController.index);
router.post("/", validations, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  statesController.store(req, res);
});
router.get("/:id", statesController.show);
router.put("/:id", validations, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  statesController.update(req, res);
});
router.delete("/:id", statesController.destroy);

module.exports = router;

const express = require("express");
const router = express.Router();
const appointmentsController = require("../controllers/appointmentsController");
const { check, validationResult } = require("express-validator");

const validations = [
  check("user").isMongoId().withMessage("Invalid user ID"),
  check("place").isMongoId().withMessage("Invalid place ID"),
  check("endTime").isISO8601().withMessage("Invalid end time"),
  check("status")
    .isIn(["pendente", "aprovado", "rejeitado"])
    .withMessage("Invalid status"),
  check("userRole").isMongoId().withMessage("Invalid userRole ID"),
  check("category").isMongoId().withMessage("Invalid category ID"),
];

router.get("/", appointmentsController.index);
router.get("/:id", appointmentsController.show);
router.post("/", validations, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  appointmentsController.store(req, res);
});
router.put("/:id", validations, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  appointmentsController.update(req, res);
});
router.delete("/:id", appointmentsController.destroy);

module.exports = router;

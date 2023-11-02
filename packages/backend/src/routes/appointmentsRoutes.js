const express = require("express");
const router = express.Router();
const appointmentsController = require("../controllers/appointmentsController");

router.get("/", appointmentsController.index);
router.get("/:id", appointmentsController.show);
router.post("/", appointmentsController.store);
router.put("/:id", appointmentsController.update);
router.delete("/:id", appointmentsController.destroy);

module.exports = router;

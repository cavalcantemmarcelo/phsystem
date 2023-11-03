const express = require("express");
const router = express.Router();
const userRolesController = require("../controllers/userRolesController");

router.get("/", userRolesController.index);
router.get("/:id", userRolesController.show);
router.post("/", userRolesController.store);
router.put("/:id", userRolesController.update);
router.delete("/:id", userRolesController.destroy);

module.exports = router;

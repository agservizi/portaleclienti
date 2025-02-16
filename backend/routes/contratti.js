const express = require("express");
const contrattoController = require("../controllers/contrattoController");

const router = express.Router();

router.get("/:userId", contrattoController.getContrattiByUserId);

module.exports = router;
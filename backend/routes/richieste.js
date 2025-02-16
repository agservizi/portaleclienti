const express = require("express");
const richiestaController = require("../controllers/richiestaController");

const router = express.Router();

router.get("/:userId", richiestaController.getRichiesteByUserId);
router.post("/", richiestaController.createRichiesta);

module.exports = router;
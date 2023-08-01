// express
const express = require("../../src/tiny-express");
const router = express.Router();

// controllers
const deletePollController = require("../controllers/delete/deletePollController");

router.get("/:id", deletePollController);

module.exports = router;

// express
const express = require("../../../src/tiny-express");
const router = express.Router();

// controllers
const deletePollController = require("../controllers/delete/deletePollController");

router.delete("/:id", deletePollController);

module.exports = router;

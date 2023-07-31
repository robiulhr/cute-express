// express
const express = require("../../src/tiny-express");
const router = express.Router();

// controllers
const createPollController = require("../controllers/create/createPollController");
const submitPollController = require("../controllers/create/submitPollController");

router.get("/create", createPollController);
router.post("/create", submitPollController);

module.exports = router;

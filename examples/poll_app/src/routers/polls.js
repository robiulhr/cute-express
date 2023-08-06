// cuteExpress
const cuteExpress = require("../../../../src/cute-express")
const router = cuteExpress.Router()

// controllers
const viewPollController = require("../controllers/poll/viewPollController");
const voteToPollController = require("../controllers/poll/voteToPollController");

router.get("/:id", viewPollController);
router.post("/:id", voteToPollController);

module.exports = router
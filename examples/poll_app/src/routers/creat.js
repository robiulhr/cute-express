// cuteExpress
const cuteExpress = require("../../../../src/cute-express")
const router = cuteExpress.Router();

// controllers
const createPollController = require("../controllers/create/createPollController");
const submitPollController = require("../controllers/create/submitPollController");

router.get("/create", createPollController);
router.post("/create", submitPollController);

module.exports = router;

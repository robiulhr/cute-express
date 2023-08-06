// cuteExpress
const cuteExpress = require("../../../../src/cute-express")
const router = cuteExpress.Router();

// controllers
const editPollController = require("../controllers/edit/editPollController");
const editSubmitPollController = require("../controllers/edit/editSubmitController")
router.get("/:id", editPollController);
router.put("/:id",editSubmitPollController);

module.exports = router;

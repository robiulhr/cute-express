// cuteExpress
const cuteExpress = require("../../../../src/cute-express")
const router = cuteExpress.Router();

// controllers
const deletePollController = require("../controllers/delete/deletePollController");

router.delete("/:id", deletePollController);

module.exports = router;

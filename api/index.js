const router = require("express").Router();

//file handles all routes under /api
router.use("/players", require("./players"));

module.exports = router;

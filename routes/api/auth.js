const express = require("express");
const router = express.Router();

//@route GET api/auth
//test route
//public

router.get("/", (req, res)  => res.send("Authoriztion route"));

module.exports = router;
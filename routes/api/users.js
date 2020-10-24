const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

//@route Post api/users
//register user
//public

router.post("/", 
[
    check("name", "Name must not be left empty").not().isEmpty(),
    check("email", "Please use a valid email address").isEmail(),
    check("password", "Your password must be at least six characters long").isLength({ min: 6 })
], 
(req, res)  => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    res.send('User route');
});

module.exports = router;
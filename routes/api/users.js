const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator/check");
const User = require("../../models/User");

//@route Post api/users
//register user
//public

router.post("/", 
[
    check("name", "Name must not be left empty").not().isEmpty(),
    check("email", "Please use a valid email address").isEmail(),
    check("password", "Your password must be at least six characters long").isLength({ min: 6 })
], 
async (req, res)  => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, password } = req.body;

    try {
    // see if the user exists
     let user = await User.findOne({ email });

     if(user){
         return res.status(400).json({ errors: [{ msg: "user already exists" }] });
     }

    // get the user's gravatar
    const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
    })

    user = new User({
        name,
        email,
        avatar,
        password
    });

    // encrypt password using bcrypt
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // return jsonwebtoken

    res.send('User successfully registerd!');
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
    
});

module.exports = router;
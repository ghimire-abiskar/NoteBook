const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/Users');
const { ExpressValidator } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser')
const JWT_SECRET = "Abiskarisagoodboy"

//ROUTE 1 for creating the user
router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(404).json({ success: success, error: errors.array() });
    }
    try {
        //check whether the user with same email already exists or not
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(404).json({ success: success, error: "User already exists with this email-ID" });

        let salt = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const jwtdata = jwt.sign(data, JWT_SECRET);
        res.json({success:true,authtoken:jwtdata});
    }

    //catch the errors
    catch (error) {
        res.status(400).send(error + "  There has been some error");
    }
})

//Route-2:verify login credentials
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter your password').exists()
], async (req, res) => {
    const errors = validationResult(req);
    let success = true;
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) { return res.status(400).json({ error: "Please provide correct credentials" }) };
        const passwordcompare = await bcrypt.compare(password, user.password);
        if (!passwordcompare) {
            success = false
            return res.json({ success: success, error: "Please provide correct credentials" });
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(payload, JWT_SECRET);
        res.json({ success: success, authtoken: authtoken });
    } catch (error) {
        res.status(500).json({ success, error: "Internal server Error!!!!" });
    }
})

router.post('/getuser', fetchUser, async (req, res) => {
    try {
        UserId = req.user.id;
        const user = await User.findById(UserId).select("-password");
        res.json(user);
    }
    catch (error) {
        res.status(400).send(error);
    }
})
module.exports = router;
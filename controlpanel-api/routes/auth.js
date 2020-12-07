const router = require('express').Router();
const {user, userValidate, loginValidate} = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const expjwt = require('express-jwt');

const jwtSecret = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    const {error} = userValidate(req.body);
    if(error) return res.status(400).send({"error" : error.details[0].message});

    const emailExist = await user.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send({"error": "Email already exists."});

    const salt = bcrypt.genSaltSync(10);
    const hashedPw = bcrypt.hashSync(req.body.password, salt);
    const newUser = new user({
        name: req.body.name,
        email: req.body.email,
        password: hashedPw
    });
    try {
        const savedUser = await newUser.save();
        res.send({id: savedUser._id});
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    var {error} = loginValidate(req.body);
    if(error) {
        return res.status(400).send({"error" : error.details[0].message});
    } 

    try {
        const userRecord = await user.findOne({email : req.body.email});
        if(!userRecord) return res.status(400).send({"error" : "Email and/or password invalid."});
        
        const matchPass = bcrypt.compareSync(req.body.password, userRecord.password);
        if(matchPass) {
            const token = jwt.sign({id: userRecord._id}, process.env.JWT_SECRET);
            res.cookie('token', token, {httpOnly: true})
            const {email, name, _id, date} = userRecord;
            return res.send({email, name, _id, date});
        }
        return res.status(400).send({"error" : "Email and/or password invalid."});
    }
    catch(e) {
        return res.status(500).send({"error" : e});
    }
});


router.post('/logout', async (req, res) => {
    res.clearCookie('token')
    return res.status(200).send({"success" : "User logged out"});
});

const mdl = expjwt({
    secret: jwtSecret, 
    algorithms: ['HS256'],
    getToken: req => {
        return req.cookies.token
    }
});

router.post('/getuser', mdl, async (req, res) => {
   const userObj = jwt.verify(req.cookies.token, jwtSecret);
   var userRecord = await user.findOne({_id : userObj.id});
   const {email, name, _id, date} = userRecord;
   return res.send({email, name, _id, date});
});

module.exports = router; 


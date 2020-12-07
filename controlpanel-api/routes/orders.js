const router = require('express').Router();
const jwt = require('express-jwt');
// const {user, userValidate, loginValidate} = require('../models/user');

const jwtSecret = process.env.JWT_SECRET;
router.use(jwt({
    secret: jwtSecret, 
    algorithms: ['HS256'],
    getToken: req => req.cookies.token 
}));

router.post('/listorders', async (req, res) => {
    res.send({success: true});
    // const {error} = userValidate(req.body);
    // if(error) return res.status(400).send({"error" : error.details[0].message});

    // const emailExist = await user.findOne({ email: req.body.email });
    // if (emailExist) return res.status(400).send({"error": "Email already exists."});

    // const salt = bcrypt.genSaltSync(10);
    // const hashedPw = bcrypt.hashSync(req.body.password, salt);
    // const newUser = new user({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: hashedPw
    // });
    // try {
    //     const savedUser = await newUser.save();
    //     res.send({id: savedUser._id});
    // }
    // catch (err) {
    //     res.status(400).send(err);
    // }
});

module.exports = router; 


const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const ethWallet = require('ethereumjs-wallet');
var ethers = require('ethers');  
var crypto = require('crypto');

const solanaWeb3 = require('@solana/web3.js');
const {Keypair} = require("@solana/web3.js");
const bs58 = require('bs58')

var nodemailer = require('nodemailer');

const User = require('../../models/User');

const supportEmail = config.get("supportEmail");
const supportEmailPassword = config.get("supportEmailPassword");

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


// @route    POST api/auth/loginWithPhantom
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/loginWithPhantom',
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.body;

    try {
      let user = await User.findOne({ solanaAddress: address });

      if (!user) {
        user = new User({
          solanaAddress: address
        });
        await user.save();
        console.log('created wallet')
        user = await User.findOne({ solanaAddress: address });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


// @route    POST api/auth/loginWithMetamask
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/loginWithMetamask',
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.body;

    try {
      let user = await User.findOne({ address });

      if (!user) {
        user = new User({
          ethereumAddress: address
        });
        await user.save();
        user = await User.findOne({ ethereumAddress: address });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


// @route    POST api/auth/createNewWallet
// @desc     Create new Wallet
// @access   Public
router.post(
  '/createNewWallet',
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      // Create new E Wallet
      var e_id = crypto.randomBytes(32).toString('hex');
      var e_privateKey = "0x"+e_id;      
      var e_wallet = new ethers.Wallet(e_privateKey).address;

      // Create new S Wallet
      let keypair = Keypair.generate();
      const s_wallet = keypair.publicKey.toString();
      const s_privateKey = bs58.encode(keypair.secretKey);

      // Send Email
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: supportEmail,
          pass: supportEmailPassword
        }
      });
      
      var mailOptions = {
        from: supportEmail,
        to: email,
        subject: 'Success to create new Wallets',
        text: 'Hi, You successed to create new wallet. <br/> Ethereum: ' + e_wallet + '<br/> Solana: '+ s_wallet+'<br/> Thanks.'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      res.status(200).json({
        e_wallet, 
        s_wallet
      })

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;

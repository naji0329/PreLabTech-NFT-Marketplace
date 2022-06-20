const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const User = require('../../models/User');
const Collection = require('../../models/Collection');


var formidable = require('formidable');
var fs = require('fs');
var path = require('path')

// @route    POST api/collection/createCollection
// @desc     Create Collection
// @access   Public
router.post(
  '/createCollection',
  async (req, res) => {


    try {
      // To Do 

      const form = new formidable.IncomingForm();
      form.parse(req, async function (err, fields, files) {

        let errors = {};
        if(fields.name == null || fields.name == "" || fields.name == "null") errors.name = "Name is empty.";
        if(fields.name == null || fields.symbol == "" || fields.symbol == "null") errors.symbol = "Name is empty.";
        if(fields.name == null || fields.shortUrl == "" || fields.shortUrl == "null") errors.shortUrl = "shortUrl is empty.";

        if(errors) {
          return res.json({errors});
        } 



        let coverImageName = null; 
        if(files.coverImage) {
          const oldpath = files.coverImage.filepath;
          coverImageName = Date.now() + path.extname(files.coverImage.originalFilename);
          const newpath = './../frontend/src/images/collections/cover/' + coverImageName;
          const readStream=fs.createReadStream(oldpath);
          const writeStream=fs.createWriteStream(newpath);
          readStream.pipe(writeStream);
          readStream.on('end',function(){
           fs.unlinkSync(oldpath);
          });
        }
  
        let logoImageName = null; 
        if(files.logoImage) {
          const oldpath = files.logoImage.filepath;
          logoImageName = Date.now() + path.extname(files.logoImage.originalFilename);
          const newpath = './../frontend/src/images/collections/logo/' + logoImageName;
          const readStream=fs.createReadStream(oldpath);
          const writeStream=fs.createWriteStream(newpath);
          readStream.pipe(writeStream);
          readStream.on('end',function(){
           fs.unlinkSync(oldpath);
          });
        }
  
  
        const collection = new Collection({
          name: fields.name,
          symbol: fields.symbol,
          description: fields.description,
          shortUrl: fields.shortUrl,
          owner: fields.owner,
          chain: fields.chain,
          logoImage: logoImageName,
          coverImage: coverImageName,
        });
  
        
        const newCollection = await collection.save();
        
        res.status(200).json({ newCollection });
        
      });

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;

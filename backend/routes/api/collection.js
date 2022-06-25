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

        // let errors = {};
        // if(fields.name == null || fields.name == "" || fields.name == "null") errors.name = "Name is empty.";
        // if(fields.symbol == null || fields.symbol == "" || fields.symbol == "null") errors.symbol = "Name is empty.";
        // if(fields.shortUrl == null || fields.shortUrl == "" || fields.shortUrl == "null") errors.shortUrl = "shortUrl is empty.";

        // if(errors) {
        //   return res.json({errors});
        // } 

        let coverImageName = null; 
        if(files.coverImage) {
          const oldpath = files.coverImage.filepath;
          coverImageName = Date.now() + path.extname(files.coverImage.originalFilename);
          const newpath = './../frontend/public/files/collections/cover/' + coverImageName;
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
          const newpath = './../frontend/public/files/collections/logo/' + logoImageName;
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

router.post('/verifyCollection', async (req, res) => {
  try {
    const {_id, contract_address} = req.body;

    let collection = await Collection.findOne({ _id: _id });

    let collectinFields = {
      status: 1,
      contract_address: contract_address
    }
    if (collection) {
      // Using upsert option (creates new doc if no match is found):
      collection = await Collection.findOneAndUpdate(
        { _id: _id },
        { $set: collectinFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      
      return res.json(collection);

    }

    
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
})

router.post('/getCollections', async (req, res) => {
  try {
    const {address, chain} = req.body;

    let searchForm = {status: 1};
    if(address) searchForm.owner = address;
    if(chain) searchForm.chain = chain;

    console.log("get collections with this search", searchForm)

    let collections = await Collection.find(searchForm);
    res.json(collections);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
})

router.post('/getCollectionData', async (req, res) => {
  try {
    const {shortUrl, chain} = req.body;
    let collectionData = await Collection.findOne({ shortUrl: shortUrl, status: 1 });
    res.json(collectionData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
})

router.get('/getNFTData/:_id', async (req, res) => {
  try {
    const NFTData = await Collection.findById(req.params._id);
    res.json(NFTData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
})

module.exports = router;

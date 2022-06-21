const express = require('express');
const router = express.Router();

const Collection = require('../../models/Collection');
const NFT = require('../../models/Nft');


var formidable = require('formidable');
var fs = require('fs');
var path = require('path')

const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

// @route    POST api/collection/createCollection
// @desc     Create Collection
// @access   Public
router.post(
  '/createNFT',
  async (req, res) => {
    try {
      // To Do 

      const form = new formidable.IncomingForm();
      form.parse(req, async function (err, fields, files) {

        let fileName = null; 
        if(files.file) {
          const oldpath = files.file.filepath;
          fileName = Date.now() + path.extname(files.file.originalFilename);
          const newpath = './../frontend/src/images/nfts/' + fileName;
          const readStream=fs.createReadStream(oldpath);
          const writeStream=fs.createWriteStream(newpath);
          readStream.pipe(writeStream);
          readStream.on('end',function(){
           fs.unlinkSync(oldpath);
          });
        }
  
  
        const _nft = new NFT({
          name: fields.name,
          description: fields.description,
          file: fileName,
          chain: fields.chain,
          creater: fields.creater,
          collection_id: fields.collection._id,
          collection_name: fields.collection.name,
          collection_symbol: fields.collection.symbol,
          contract_address: fields.collection.contract_address,
        });
  
        
        const _newNFT = await _nft.save();

        // Upload File to IPFS

        let uploadFile = fs.readFileSync(files.file.filepath);
        let tempBuffer = new Buffer(uploadFile);
        ipfs.files.add(tempBuffer, function (err, file) {
          if (err) {
            console.log(err);
          }
          console.log(file)
        })

        
        console.log(_newNFT);
        
        res.status(200).json({ _newNFT });
        
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

    let collections = await Collection.find({ owner: address, status: 1 });

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

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

        console.log(fields);
        
        let _nft = new NFT({
          name: fields.name,
          description: fields.description,
          file: "",
          ipfs_path: "",
          chain: fields.chain,
          creater: fields.creater,
          collection_id: fields.collection_id,
          collection_name: fields.collection_name,
          collection_symbol: fields.collection_symbol,
          contract_address: fields.contract_address,
        });

        if(files.file) {
          const oldpath = files.file.filepath;
          const cTimestamp = Date.now();
          const fileName = cTimestamp + path.extname(files.file.originalFilename);
          const newpath = './../frontend/public/files/nfts/file/' + fileName;
          const readStream=fs.createReadStream(oldpath);
          const writeStream=fs.createWriteStream(newpath);
          readStream.pipe(writeStream);
          readStream.on('end',function(){
            fs.unlinkSync(oldpath);


            // Upload File to IPFS
            let uploadFile = fs.readFileSync('./../frontend/public/files/nfts/file/' + fileName);
            let tempBuffer = new Buffer(uploadFile);
            ipfs.files.add(tempBuffer, async function (err, file) {
              if (err) {
                console.log(err);
              }

              _nft.ipfs_path = file[0].hash;
              _nft.file = fileName;

              // Metadata Generate
              const metadata = {
                "name": _nft.name,
                "description": _nft.description,
                "image": "https://ipfs.io/ipfs/"+_nft.ipfs_path,
                "animation_url": "",
                "external_url": "",
              }
              const jsonString = JSON.stringify(metadata)

              fs.writeFile(`./../frontend/public/files/nfts/metadata/${cTimestamp}.json`, jsonString, err => {
                if (err) {
                    console.log('Error writing file', err)
                } else {

                  // Upload Metadata to IPFS
                  let uploadFile = fs.readFileSync(`./../frontend/public/files/nfts/metadata/${cTimestamp}.json`);
                  let tempMetadataBuffer = new Buffer(uploadFile);
                  ipfs.files.add(tempMetadataBuffer, async function (err, file_metadata) {
                    if (err) {
                      console.log(err);
                    }

                    _nft.metadata_url = file_metadata[0].hash;

                    const _newNFT = await _nft.save();
                    return res.status(200).json({ _newNFT });

                  })


                }
              })



            })
          });
        }

      });

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.get('/getNFTs/:collectionId', async (req, res) => {
  try {
    console
    const NFTs = await NFT.find({ collection_id: req.params.collectionId});
    res.json(NFTs);
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


router.post('/verifyNFT', async (req, res) => {
  try {
    const {_id, contract_address} = req.body;

    let nft = await NFT.findOne({ _id: _id });

    let collectinFields = {
      status: 1,
    }
    if (nft) {
      // Using upsert option (creates new doc if no match is found):
      nft = await NFT.findOneAndUpdate(
        { _id: _id },
        { $set: collectinFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      
      return res.json(nft);

    }

    
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
})

module.exports = router;

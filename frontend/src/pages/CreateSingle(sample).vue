<template>
  <div class="page-wrap">
    <!-- header  -->
    <header class="header-section has-header-main bg-pattern-3">
      <!-- Header main -->
      <HeaderMain></HeaderMain>
    </header>
    <!-- create -->
    <section class="create-section section-space-b pt-4 pt-md-5 mt-md-4">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="section-head-sm">
              <router-link
                :to="SectionData.createSingleData.path"
                class="btn-link fw-semibold"
                ><em class="ni ni-arrow-left"></em>
                {{ SectionData.createSingleData.btnText }}</router-link
              >
              <h1 class="mt-2">{{ SectionData.createSingleData.title }}</h1>
            </div>
          </div>
          <!-- end col -->
          <div class="col-lg-8">
            <form action="#" class="form-create mb-5 mb-lg-0">
              <div class="form-item mb-4">
                <h5 class="mb-3">Upload file</h5>
                <div class="file-upload-wrap">
                  <p class="file-name mb-4" id="file-name">
                    PNG, GIF, WEBP, MP4 or MP3. Max 100mb.
                  </p>
                  <input
                    id="file-upload"
                    class="file-upload-input"
                    data-target="file-name"
                    type="file"
                    @change="uploadFile"
                    hidden
                    ref="file"
                  />
                  <label for="file-upload" class="input-label btn btn-primary"
                    >Choose File</label
                  >
                </div>
                <p class="px-3 text-red">
                  <small v-if="errors.file">{{ errors.file }}</small>
                </p>
              </div>
              <!-- end form-item -->
              <!-- <div class="form-item mb-4">
                                <h5 class="mb-3">Select Method</h5>
                                <ul class="row g-3 nav nav-tabs nav-tabs-s2" id="myTab" role="tablist">
                                    <li class="nav-item col-4 col-sm-4 col-lg-3" role="presentation" v-for="list in SectionData.selectMethodTabNav" :key="list.id">
                                        <button class="nav-link" :class="list.isActive" :id="list.slug" data-bs-toggle="tab" :data-bs-target="list.bsTarget" type="button">
                                            <em class="ni nav-link-icon" :class="list.icon"></em>
                                            <span class="nav-link-title mt-1 d-block">{{list.title }}</span>
                                        </button>
                                    </li>
                                </ul>
                                <div class="tab-content mt-4" id="myTabContent">
                                    <div class="tab-pane fade show active" id="fixed-price" role="tabpanel" aria-labelledby="fixed-price-tab">
                                        <div class="form-create-tab-wrap">
                                            <label class="mb-2 form-label">Price</label>
                                            <input type="text" class="form-control form-control-s1" placeholder="Enter a price for item">
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="timed-auction" role="tabpanel" aria-labelledby="timed-auction-tab">
                                        <div class="form-create-tab-wrap">
                                            <label class="mb-2 form-label">Minimum bid</label>
                                            <input type="text" class="form-control form-control-s1" placeholder="Enter Minimum bid">
                                            <div class="row mt-3">
                                                <div class="col-lg-6">
                                                    <label class="mb-2 form-label">Starting date</label>
                                                    <input type="date" class="form-control form-control-s1">
                                                </div>
                                                <div class="col-lg-6">
                                                    <label class="mb-2 form-label">Expiration date</label>
                                                    <input type="date" class="form-control form-control-s1">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="open-for-bids" role="tabpanel" aria-labelledby="open-for-bids-tab">
                                        <div class="form-create-tab-wrap">
                                            <label class="mb-2 form-label">Minimum bid</label>
                                            <input type="text" class="form-control form-control-s1" placeholder="Enter Minimum bid">
                                        </div>
                                    </div>
                                </div>
                            </div> -->
              <!-- <div class="form-item mb-3">
                                <div class="switch-wrap">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="me-2">
                                            <h5 class="mb-1">Unlock once purchased</h5>
                                            <p class="form-text">Content will be unlocked after successful transaction</p>
                                        </div>
                                        <div class="form-check form-switch form-switch-s1">
                                            <input class="form-check-input checkbox-switcher" data-target="switch-content-unlock" type="checkbox">
                                        </div>
                                    </div>
                                    <div class="switch-content-unlock mt-4" id="switch-content-unlock">
                                        <input type="text" name="text" class="form-control form-control-s1" placeholder="Access key, code to redeem or link to a file...">
                                    </div>
                                </div>
                            </div> -->
              <div class="form-item mb-4">
                <h5 class="mb-1">Choose collection</h5>
                <p class="form-text mb-3">
                  This is the collection where your item will appear.
                </p>
                <!-- <v-select class="generic-select" v-model="selected" :options="options"></v-select> -->

                <v-select
                  v-model="NFTData.collection"
                  :options="collections"
                  label="name"
                ></v-select>
                <p class="px-3 text-red">
                  <small v-if="errors.collection">{{
                    errors.collection
                  }}</small>
                </p>
              </div>
              <!-- end form-item -->
              <div class="form-item mb-4">
                <div class="mb-4">
                  <label class="mb-2 form-label">Name</label>
                  <input
                    type="text"
                    class="form-control form-control-s1"
                    v-model="NFTData.name"
                    placeholder="e. g. Redeemable T-Shirt with logo"
                  />
                  <p class="px-3 text-red">
                    <small v-if="errors.name">{{ errors.name }}</small>
                  </p>
                </div>
                <div class="mb-4">
                  <label class="mb-2 form-label">Description</label>
                  <textarea
                    name="message"
                    class="form-control form-control-s1"
                    v-model="NFTData.description"
                    placeholder="e. g. After purchasing you’ll be able to get the real T-Shirt"
                  ></textarea>
                  <p class="px-3 text-red">
                    <small v-if="errors.description">{{
                      errors.description
                    }}</small>
                  </p>
                </div>
                <!-- <div class="mb-3">
                                    <label class="mb-2 form-label">Royalties</label>
                                    <input type="text" class="form-control form-control-s1" placeholder="e.g 10%">
                                    <p class="form-text mt-1">Suggested: 0, 10%, 20%, 30%. Maximum is 70%</p>
                                </div> -->
              </div>
              <!-- end form-item -->
              <button
                class="btn btn-primary"
                type="button"
                v-on:click="createNFT"
                v-if="!isLoading"
              >
                Create Item
              </button>
              <button class="btn btn-primary" type="button" disabled v-else>
                Loading...
              </button>
            </form>
          </div>
          <!-- endn col -->
        </div>
        <!-- row-->
      </div>
      <!-- container -->
    </section>
    <!-- create-section -->
    <!-- Footer  -->
    <Footer></Footer>
  </div>
  <!-- end page-wrap -->
</template>

<script>

// import { computed } from 'vue'
import { mapState, mapGetters, mapActions } from "vuex";
import Web3 from "web3";
// Import component data. You can change the data in the store to reflect in all component
import SectionData from "@/store/store.js";
import NFTService from "@/services/nft.service.js";
import CollectionService from "@/services/collection.service.js";

import { 
  ERC721NFT_json, 
  SolanaNFT_json, 
  programId,
  TOKEN_METADATA_PROGRAM_ID
} from "@/constants/constant.js";


import * as anchor from "@project-serum/anchor";

import { 
  MintLayout, Token, 
  TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID 
} from "@solana/spl-token";

import {
  Keypair,
  PublicKey,
  Transaction,
  Connection,
  clusterApiUrl,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";

export async function getAssociateTokenAddress(mint, owner) {
  let [address] = await PublicKey.findProgramAddress(
    [owner.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
    ASSOCIATED_TOKEN_PROGRAM_ID,
  );
  return address;
}


async function sendTransaction(transaction, signers) {
  // const wallet = useWallet();
  // const connection = useConnection().connection
  // const wallet = window.solana;
  // const connection = window.solana.connect();
  const wallet = window.solana;
  const preflightCommitment = '"finalized"'
  const commitment = '"finalized"'
  const connection = new Connection(clusterApiUrl('testnet'))
  const provider = new anchor.Provider(connection, wallet, { preflightCommitment, commitment })
  const owner = provider.wallet;
  
  // const connection = useConnection().connection
    try{
      transaction.feePayer = owner.publicKey
      transaction.recentBlockhash = (await connection.getRecentBlockhash('max')).blockhash;
      transaction.setSigners(owner.publicKey,...signers.map(s => s.publicKey));
      if(signers.length !== 0)
        transaction.partialSign(...signers)
      const signedTransaction = await owner.signTransaction(transaction);
      let hash = await connection.sendRawTransaction(signedTransaction.serialize());
      await connection.confirmTransaction(hash);
      // Store.addNotification({
      console.log({
        title: "Success",
        message: "Success",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 1000,
          onScreen: true
        }
      });
    } catch(err) {
      console.log(err)
      // Store.addNotification({
      console.log({
        title: "ERROR",
        message: "Error",
        type: "warning",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 1000,
          onScreen: true
        }
      });
    }
  }


export default {
  name: "CreateSingle",
  data() {
    return {
      SectionData,
      collections: ["Custom", "Second"],
      NFTData: {
        name: null,
        description: null,
        file: null,
        collection: null,
      },
      errors: {
        collection: null,
      },
      isLoading: false,
    };
  },
  computed: {
    ...mapState(["auth"]),
    ...mapGetters({ currentChain: ["auth/currentChain"] }),
  },
  async mounted() {
    /*==============File upload =============== */
    function fileUpload(selector) {
      let elem = document.querySelectorAll(selector);
      if (elem.length > 0) {
        elem.forEach((item) => {
          item.addEventListener("change", function () {
            var target = document.getElementById(item.dataset.target);
            var allowedExtensions = ["jpg", "png", "gif", "webp", "mp4", "mp3"];
            var fileExtension = this.value.split(".").pop();
            var lastDot = this.value.lastIndexOf(".");
            var ext = this.value.substring(lastDot + 1);
            var extTxt = (target.value = ext);

            if (!allowedExtensions.includes(fileExtension)) {
              alert(
                extTxt +
                  " file type not allowed, Please upload jpg, png, gif, webp, mp4 or mp3 file"
              );
              target.innerHTML =
                "Please upload jpg, png, gif, webp, mp4 or mp3 file";
            } else {
              target.innerHTML = item.files[0].name;
            }
          });
        });
      }
    }

    fileUpload(".file-upload-input");

    /*  ============== Unlock once purchased Checkbox switcher ============= */
    function checkboxSwitcher(selector) {
      let elem = document.querySelectorAll(selector);
      if (elem.length > 0) {
        elem.forEach((item) => {
          item.addEventListener("change", function () {
            let target = document.getElementById(item.dataset.target);
            if (this.checked) {
              target.classList.add("is-shown");
            } else {
              target.classList.remove("is-shown");
            }
          });
        });
      }
    }

    checkboxSwitcher(".checkbox-switcher");

    const _colletions = await CollectionService.getCollections(
      this.auth.user.address,
      this.auth.user.chain
    );
    this.collections = _colletions;
  },
  methods: {
    ...mapActions({
      loginWithPhantom: "auth/loginWithPhantom",
      getCollections: "collection/getCollections",
    }),
    uploadFile() {
      this.NFTData.file = this.$refs.file.files[0];
    },
    async createNFT() {
      this.errors = {};
      if (this.NFTData.file == null) {
        this.errors.file = "Please select file";
        return false;
      }
      if (this.NFTData.collection == null) {
        this.errors.collection = "Please select collection.";
        return false;
      }
      if (!this.NFTData.name) {
        this.errors.name = "Please select file";
        return false;
      }
      if (!this.NFTData.description) {
        this.errors.description = "Please select file";
        return false;
      }

      this.isLoading = true;

      const formData = new FormData();
      console.log("========================================================");
      // console.log("File : ", this.NFTData.file);
      // console.log("Name : ", this.NFTData.name);
      // console.log("description : ", this.NFTData.description);
      // console.log("ID : ", this.NFTData.collection._id);
      // console.log("Collection : ", this.NFTData.collection.name);
      // console.log("symbol : ", this.collection.symbol);
      formData.append("file", this.NFTData.file);
      formData.append("name", this.NFTData.name);
      formData.append("description", this.NFTData.description);
      formData.append("collection_id", this.NFTData.collection._id);
      formData.append("collection_name", this.NFTData.collection.name);
      formData.append("collection_symbol", this.NFTData.collection.symbol);
      formData.append("collection_id", "0");
      formData.append("collection_name", "AlphaWOlf");
      formData.append("collection_symbol", "WOLF");

      console.log("File ------------------ ", this.NFTData.file);
      console.log("Collection ------------------ ", this.NFTData.collection._id, this.NFTData.collection.name, this.NFTData.collection.symbol);
      console.log("Name ------------------ ", this.NFTData.name);
      console.log("Description ------------------ ", this.NFTData.description);

      if ((await this.currentChain()) == "ethereum") {
        // Create web3.
        
        formData.append(
          "contract_address",
          this.NFTData.collection.contract_address
        );
        let web3 = new Web3(window.ethereum);
        let contract = new web3.eth.Contract(
          ERC721NFT_json.abi,
          this.NFTData.collection.contract_address
        );

        const supply = await contract.methods.supply().call();

        formData.append("creater", this.auth.user.address);
        formData.append("creater", this.auth.user.address);
        formData.append("chain", this.auth.user.chain);
        formData.append("tokenId", supply);

        const response = await NFTService.createNFT(formData);

        if (response.errors) {
          console.log(response.errors);
          this.errors = response.errors;
          this.isLoading = false;
          return;
        } else {
          // Call Mint Function
          contract.methods
            .mint(
              this.auth.user.address,
              supply,
              "" + response._newNFT.metadata_url
            )
            .send({ from: this.auth.user.address })
            .once("error", (err) => {
              console.log(err, "Error");
              this.isLoading = false;
            })
            .then(async (receipt) => {
              console.log(receipt);

              const response1 = await NFTService.verifyNFT(
                response._newNFT._id
              );
              console.log(response1);

              this.isLoading = false;
              alert("NFT created successfully!");
              this.$router.push(
                "/collection/" + this.NFTData.collection.shortUrl
              );
            });
        }
      } else if ((await this.currentChain()) == "solana") {
        // Create web3.
        
        const { solana } = window;
        
        {console.log("ererer")}
        const wallet = window.solana;
        const GLOBAL_SIZE = 81
        const CLAIMER_SIZE = 72
        
        // const preflightCommitment = 'processed'
        // const commitment = 'confirmed'
        const preflightCommitment = '"finalized"'
        const commitment = '"finalized"'

        const connection = new Connection(clusterApiUrl('testnet'))
        
        const provider = new anchor.Provider(connection, wallet, { preflightCommitment, commitment })
        const program = new anchor.Program(SolanaNFT_json, programId, provider)

        // if (solana) {
          const response = await solana.connect();
            this.phantomWallet = response.publicKey.toString();
            this.loginWithPhantom(this.phantomWallet);
            console.log("Phantom wallet --------------------------", provider.wallet.publicKey)
          const walletPublicKey = provider.wallet.publicKey;
        // }

        // await program.instruction.mintNFT(
        //   data,
        //     {
        //       accounts: {
        //         owner: wallet,
        //         collection: this.NFTData.collection.shortUrl,
        //         mint: mint.publicKey,
        //         tokenAccount: ata,
        //         metadata: metadata,
        //         masterEdition: master_edition,
        //         tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
        //         tokenProgram: TOKEN_PROGRAM_ID,
        //         systemProgram: anchor.web3.SystemProgram.programId,
        //         rent: SYSVAR_RENT_PUBKEY
        //       }
        //     }
        // )
        
        const owner = provider.wallet.publicKey;
        const mint = Keypair.generate();
        let ata = await getAssociateTokenAddress(mint.publicKey, owner);
        let metadata = (await PublicKey.findProgramAddress([Buffer.from('metadata'),TOKEN_METADATA_PROGRAM_ID.toBuffer(),mint.publicKey.toBuffer()],TOKEN_METADATA_PROGRAM_ID))[0];
        let master_edition = (await PublicKey.findProgramAddress([Buffer.from('metadata'),TOKEN_METADATA_PROGRAM_ID.toBuffer(),mint.publicKey.toBuffer(),Buffer.from('edition')],TOKEN_METADATA_PROGRAM_ID))[0];

  
        let data = {
          name: "Warrior",
          symbol: "WR",
          uri: "https://bafybeidw3bvtcvodlqv3vj4x75pm63ak5nly72rjf42bnidomjy64hkony.ipfs.nftstorage.link/9988.json",
          sellerFeeBasisPoints: 350,
          // description: this.NFTData.description,
          creators: [
            {address: walletPublicKey, verified: false, share: 100}
          ],
          isMutable: true,
        }
        let resp = await connection.getProgramAccounts(
          programId,
          {
            dataSlice: {length: 0, offset: 0},
            filters: [
              {
                dataSize: GLOBAL_SIZE
              }
            ]
          }
        )
        // let global = await program.value.account.global.fetch(resp[0].pubkey)
        let global = await program.account.global.fetch(resp[0].pubkey)
        let claimer = await connection.getProgramAccounts(
          programId, {
            dataSlice: {length: 0, offset: 0},
            filters: [
              {
                dataSize: CLAIMER_SIZE,
              },
              {
                memcmp: {
                  offset: 8,
                  bytes: walletPublicKey
                }
              }
            ]
          }
        )
        
        console.log("Final Step000000000000000000000000000000")
        const mintRent = await connection.getMinimumBalanceForRentExemption(MintLayout.span)
        
        // let transaction = new Transaction()
        // transaction.add(
        //   SystemProgram.createAccount({
        //     fromPubkey: walletPublicKey,
        //     newAccountPubkey: mint.publicKey,
        //     lamports: mintRent,
        //     space: MintLayout.span,
        //     programId: TOKEN_PROGRAM_ID
        //   })
        // )
    
        // transaction.add(
        //   Token.createInitMintInstruction(
        //     TOKEN_PROGRAM_ID,
        //     mint.publicKey,
        //     0,
        //     provider.wallet.publicKey,
        //     provider.wallet.publicKey
        //   )
        // )

        let transaction = new Transaction()
        transaction.add(
          SystemProgram.createAccount({
            fromPubkey: owner,
            newAccountPubkey: mint.publicKey,
            lamports: mintRent,
            space: MintLayout.span,
            programId: TOKEN_PROGRAM_ID
          })
        )
    
        console.log("Final Step11111111111111111111111111", owner)
        transaction.add(
          Token.createInitMintInstruction(
            TOKEN_PROGRAM_ID,
            mint.publicKey,
            0,
            owner,
            owner
          )
        )
    
        console.log("Final Step2222222222222222222222222222")
        transaction.add(
          Token.createAssociatedTokenAccountInstruction(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            mint.publicKey,
            ata,
            owner,
            owner,
          )
        )
        
        console.log("Final Step3333333333333333333333333333")
        transaction.add(
          // program.instruction.claimWarrior(
            program.instruction.battle(
            data,
            {
              accounts: {
                signer: owner,
                global: resp[0].pubkey,
                creator: resp[0].pubkey,
                rand: global.rand,
                claimer: claimer[0].pubkey,
                metadata: metadata,
                masterEdition: master_edition,
                mint: mint.publicKey,
                tokenAccount: ata,
                tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
                tokenProgram: TOKEN_PROGRAM_ID,
                systemProgram: anchor.web3.SystemProgram.programId,
                rent: SYSVAR_RENT_PUBKEY,
              }
            }    
          )
        )

        // const rand = Keypair.generate()
        // transaction.add(
        //   // program.instruction.mintNFT(
        //     data,
        //     {
        //       accounts: {
        //         owner: wallet,
        //         collection: this.NFTData.collection.shortUrl,
        //         mint: mint.publicKey,
        //         tokenAccount: ata,
        //         metadata: metadata,
        //         masterEdition: master_edition,
        //         tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
        //         tokenProgram: TOKEN_PROGRAM_ID,
        //         systemProgram: anchor.web3.SystemProgram.programId,
        //         rent: SYSVAR_RENT_PUBKEY
        //       }
        //     }
        //   // )
        // )
        console.log("Final Step!!!!!!!!!!!!!!!!!!!!!")
        await sendTransaction(transaction, [mint]).then(() => {
          console.log("Mint Success!!!!!!!!")
      
          this.isLoading = false;
          alert("NFT created successfully!");
          this.$router.push(
            "/collection/" + this.NFTData.collection.shortUrl
          );
          }
        )
      } else {
        this.isLoading = false;
      }
    },
  },
};
</script>

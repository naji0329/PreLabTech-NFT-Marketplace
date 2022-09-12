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
              <router-link to="/my-collections" class="btn-link fw-semibold"
                ><em class="ni ni-arrow-left"></em>
                {{ SectionData.createSingleData.btnText }}</router-link
              >
              <h1 class="mt-2">Create a Multiple Collection</h1>
            </div>
          </div>
          <!-- end col -->
          <div class="col-lg-8">
            <form action="#" class="form-create mb-5 mb-lg-0">
              <div class="form-item mb-4 row">
                <div class="col-md-6">
                  <h5 class="mb-3">Upload Logo Image</h5>
                  <div class="file-upload-wrap">
                    <p class="file-name mb-4" id="logo-file-name">
                      PNG, GIF, JPG. Max 100mb.
                    </p>
                    <input
                      id="logo-file-upload"
                      class="file-upload-input"
                      data-target="logo-file-name"
                      type="file"
                      @change="uploadLogoImage"
                      hidden
                      ref="logoImage"
                    />
                    <label
                      for="logo-file-upload"
                      class="input-label btn btn-primary"
                      >Choose File</label
                    >
                    <p class="px-3 text-red">
                      <small v-if="errors.logoImage">{{
                        errors.logoImage
                      }}</small>
                    </p>
                  </div>
                </div>
                <div class="col-md-6">
                  <h5 class="mb-3">Upload Coveer Image</h5>
                  <div class="file-upload-wrap">
                    <p class="file-name mb-4" id="cover-file-name">
                      PNG, GIF, JPG. Max 100mb.
                    </p>
                    <input
                      id="cover-file-upload"
                      class="file-upload-input"
                      data-target="cover-file-name"
                      type="file"
                      @change="uploadCoverImage"
                      hidden
                      ref="coverImage"
                    />
                    <label
                      for="cover-file-upload"
                      class="input-label btn btn-primary"
                      >Choose File</label
                    >
                    <p class="px-3 text-red">
                      <small v-if="errors.coverImage">{{
                        errors.coverImage
                      }}</small>
                    </p>
                  </div>
                </div>
              </div>
              <div class="form-item mb-4">
                <div class="mb-4">
                  <label class="mb-2 form-label"
                    >Display name <small>(required)</small></label
                  >
                  <input
                    type="text"
                    class="form-control form-control-s1"
                    placeholder="Enter collection name"
                    v-model="contractData.name"
                  />
                  <p class="px-3 text-red">
                    <small v-if="errors.name">{{ errors.name }}</small>
                  </p>
                </div>
                <div class="mb-4">
                  <label class="mb-2 form-label"
                    >Symbol <small>(required)</small></label
                  >
                  <input
                    type="text"
                    class="form-control form-control-s1"
                    placeholder="Enter collection name"
                    v-model="contractData.symbol"
                  />
                  <p class="px-3 text-red">
                    <small v-if="errors.name">{{ errors.symbol }}</small>
                  </p>
                </div>
                <div class="mb-4">
                  <label class="mb-2 form-label"
                    >Description <small>(optional)</small></label
                  >
                  <textarea
                    name="message"
                    class="form-control form-control-s1"
                    placeholder="Spread some words about your token collection"
                    v-model="contractData.description"
                  ></textarea>
                  <p class="px-3 text-red">
                    <small v-if="errors.description">{{
                      errors.description
                    }}</small>
                  </p>
                </div>
                <div class="mb-4">
                  <label class="mb-2 form-label"
                    >Short url
                    <small>(will be used as public url)</small></label
                  >
                  <div class="d-flex align-items-center">
                    <p>https://prelabtech.com/collection/</p>
                    <input
                      type="text"
                      class="form-control form-control-s1"
                      placeholder="Enter short url"
                      v-model="contractData.shortUrl"
                    />
                  </div>
                  <p class="px-3 text-red">
                    <small v-if="errors.shortUrl">{{ errors.shortUrl }}</small>
                  </p>
                </div>
              </div>
              <!-- end form-item -->
              <button
                class="btn btn-primary"
                type="button"
                v-on:click="createCollection"
                v-if="!isLoading"
              >
                Create
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
// Import component data. You can change the data in the store to reflect in all component

import { mapState, mapGetters } from "vuex";
import Web3 from "web3";

import {
  ERC1155Factory_address,
  ERC1155Factory_json,
  SolanaNFT_json,
  programId,
  // TOKEN_METADATA_PROGRAM_ID
} from "@/constants/constant.js";

import {
  Keypair,
  PublicKey,
  Transaction,
  Connection,
  clusterApiUrl,
  // SystemProgram,
  // SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";

import * as anchor from "@project-serum/anchor";

import SectionData from "@/store/store.js";
import CollectionService from "@/services/collection.service.js";

async function sendTransaction(transaction, signers) {
  const wallet = window.solana;
  const preflightCommitment = '"finalized"'
  const commitment = '"finalized"'
  const connection = new Connection(clusterApiUrl('devnet'))
  const provider = new anchor.Provider(connection, wallet, { preflightCommitment, commitment })
  const owner = provider.wallet;
  
  try{
    transaction.feePayer = owner.publicKey
    transaction.recentBlockhash = (await connection.getRecentBlockhash('max')).blockhash;
    transaction.setSigners(owner.publicKey,...signers.map(s => s.publicKey));
    if(signers.length !== 0)
      await transaction.partialSign(...signers)
    const signedTransaction = await owner.signTransaction(transaction);
    let hash = await connection.sendRawTransaction(await signedTransaction.serialize());
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
  name: "CreateMultipleCollection",
  data() {
    return {
      SectionData,
      contractData: {
        name: null,
        symbol: null,
        description: null,
        shortUrl: null,
        logoImage: null,
        coverImage: null,
      },
      errors: {},
      isLoading: false,
    };
  },
  mounted() {
    /*==============File upload =============== */
    function fileUpload(selector) {
      let elem = document.querySelectorAll(selector);
      if (elem.length > 0) {
        elem.forEach((item) => {
          item.addEventListener("change", function () {
            var target = document.getElementById(item.dataset.target);
            var allowedExtensions = ["jpg", "png", "gif", "jpeg"];
            var fileExtension = this.value.split(".").pop();
            var lastDot = this.value.lastIndexOf(".");
            var ext = this.value.substring(lastDot + 1);
            var extTxt = (target.value = ext);

            if (!allowedExtensions.includes(fileExtension)) {
              alert(
                extTxt + " file type not allowed, Please upload jpg, png, gif."
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
  },
  computed: {
    ...mapState(["auth"]),
    ...mapGetters({ currentChain: ["auth/currentChain"] }),
  },
  methods: {
    uploadLogoImage() {
      this.contractData.logoImage = this.$refs.logoImage.files[0];
    },
    uploadCoverImage() {
      this.contractData.coverImage = this.$refs.coverImage.files[0];
    },
    async createCollection() {
      this.errors = {};
      if (this.contractData.logoImage == null) {
        this.errors.logoImage = "Please select logo image";
        return false;
      }
      if (this.contractData.coverImage == null) {
        this.errors.coverImage = "Please select cover image";
        return false;
      }
      if (this.contractData.name == null) {
        this.errors.name = "Please input name.";
        return false;
      }
      if (this.contractData.symbol == null) {
        this.errors.symbol = "Please input symbol.";
        return false;
      }
      if (this.contractData.description == null) {
        this.errors.description = "Please input description.";
        return false;
      }
      if (this.contractData.shortUrl == null) {
        this.errors.shortUrl = "Please input short url.";
        return false;
      }

      this.isLoading = true;

      const formData = new FormData();
      formData.append("logoImage", this.contractData.logoImage);
      formData.append("coverImage", this.contractData.coverImage);
      formData.append("name", this.contractData.name);
      formData.append("symbol", this.contractData.symbol);
      formData.append("description", this.contractData.description);
      formData.append("shortUrl", this.contractData.shortUrl);

      if ((await this.currentChain()) == "ethereum") {
        formData.append("owner", this.auth.user.address);
        formData.append("chain", this.auth.user.chain);
        formData.append("type", "1155");
        const response = await CollectionService.createCollection(formData);

        if (response.errors) {
          console.log(response.errors);
          this.errors = response.errors;
          this.isLoading = false;
          return;
        } else {
          // Create web3.
          let web3 = new Web3(window.ethereum);
          let contract = new web3.eth.Contract(
            ERC1155Factory_json.abi,
            ERC1155Factory_address.Token
          );

          console.log("contract", contract);

          contract.methods
            .createToken(this.contractData.name, this.contractData.symbol)
            .send({ from: this.auth.user.address })
            .once("error", (err) => {
              console.log(err, "Error");
              this.isLoading = false;
            })
            .then(async (receipt) => {
              console.log(receipt);

              const response1 = await CollectionService.verifyCollection(
                response.newCollection._id,
                receipt.events[0].address
              );
              console.log(response1);
              alert("contract created successfully!");
              this.isLoading = false;
              this.$router.push({ name: "my-collections" });
            });
        }
      } else if ((await this.currentChain()) == "solana") {
        formData.append("owner", this.auth.user.address);
        formData.append("chain", this.auth.user.chain);
        formData.append("type", "multi");

        const { solana } = window;
        const solanaRes = await solana.connect();
        this.phantomWallet = solanaRes.publicKey.toString();
        const wallet = window.solana;
        console.log(this.phantomWallet)
        console.log("Solana Start")

        const preflightCommitment = "finalized"
        const commitment = "finalized"
        
        const connection = new Connection(clusterApiUrl('devnet'))
        
        const provider = new anchor.Provider(connection, wallet, { preflightCommitment, commitment })
        const program = new anchor.Program(SolanaNFT_json, programId, provider)
        const owner = provider.wallet.publicKey;
        this.phantomWallet = owner;

        let randPair = Keypair.generate();
        let initTransaction = new Transaction();
        let [ collection, bump ] = await PublicKey.findProgramAddress([randPair.publicKey.toBuffer()], programId)
        console.log(collection.toBase58(), bump);
        const maxsupply = new anchor.BN(10000);
        const _bump = new anchor.BN(bump);

        initTransaction.add(
          program.instruction.initCollection(
            maxsupply,
            _bump,
            {
              accounts: {
                collection: collection,
                owner: owner,
                rand: randPair.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId
              }
            }
          )
        );

        await sendTransaction(initTransaction, [])
        .then( async () => {
          console.log;
          formData.append("collection_address", collection.toBase58());
          console.log(collection.toBase58())

          const response = await CollectionService.createCollection(formData);
          console.log(response);
          this.Loading = false;
          this.$router.push("/my-collections");
        }).catch(err => console.log(err, "ERRRORRRR"));
        this.Loading = true;
        return false;
      } else {
        alert("connect your wallet")
      }
    },
  },
};
</script>

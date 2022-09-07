<template>
<div class="page-wrap">
    <!-- header  -->
    <header class="header-section has-header-main">
        <!-- Header main -->
        <HeaderMain></HeaderMain>
    </header>
    <section class="item-detail-section section-space">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 pe-xl-5">
                        <div class="item-detail-content">
                            <div class="item-detail-img-container mb-4">
                                <img :src="imgLg" alt="" class="w-100 rounded-3">
                            </div><!-- end item-detail-img-container -->
                            <div class="item-detail-tab">
                                <ul class="nav nav-tabs nav-tabs-s1" id="myTab" role="tablist">
                                    <li class="nav-item" role="presentation" v-for="list in SectionData.itemDetailData.itemDetailTabNav" :key="list.id">
                                        <button class="nav-link" :class="list.isActive" :id="list.slug" data-bs-toggle="tab" :data-bs-target="list.bsTarget" type="button">{{ list.title }} </button>
                                    </li>
                                </ul>
                                <div class="tab-content mt-3" id="myTabContent">
                                    <div class="tab-pane fade show active" id="owners" role="tabpanel" aria-labelledby="owners-tab">
                                        <div class="item-detail-tab-wrap">
                                            <div class="card-media card-media-s2 mb-3" v-for="item in SectionData.itemDetailData.itemDetailOwnerList" :key="item.id">
                                                <router-link :to="item.path" class="card-media-img flex-shrink-0 d-block">
                                                    <img :src="item.avatar" alt="avatar">
                                                </router-link>
                                                <div class="card-media-body text-truncate">
                                                    <p class="fw-semibold text-truncate"><a :href="item.path" class="text-black">{{ item.title }}</a></p>
                                                    <p class="small">{{ item.subTitle }}</p>
                                                </div>
                                            </div><!-- end card -->
                                        </div><!-- end item-detail-tab-wrap -->
                                    </div><!-- end tab-pane -->
                                    <div class="tab-pane fade" id="bids" role="tabpanel" aria-labelledby="bids-tab">
                                        <div class="item-detail-tab-wrap">
                                            <div class="card-media card-media-s2 mb-3" v-for="item in SectionData.itemDetailData.itemDetailBidsList" :key="item.id">
                                                <router-link :to="item.path" class="card-media-img flex-shrink-0 d-block">
                                                    <img :src="item.avatar" alt="avatar">
                                                </router-link>
                                                <div class="card-media-body text-truncate">
                                                    <p class="fw-semibold text-black text-truncate">{{ item.title }}</p>
                                                    <p class="small">{{ item.date }}</p>
                                                </div>
                                                <!-- <div>
                                                    <p class="text-success" data-bs-toggle="modal" data-bs-target="#acceptModal" >Accept</p>
                                                    <p class="text-danger"  data-bs-toggle="modal" data-bs-target="#declineModal" >Decline</p>
                                                </div> -->
                                            </div><!-- end card -->
                                        </div><!-- end item-detail-tab-wrap -->
                                    </div><!-- end tab-pane -->
                                    <div class="tab-pane fade" id="history" role="tabpanel" aria-labelledby="history-tab">
                                        <div class="item-detail-tab-wrap">
                                            <div class="card-media card-media-s2 mb-3" v-for="item in SectionData.itemDetailData.itemDetailHistoryList" :key="item.id">
                                                <router-link :to="item.path" class="card-media-img flex-shrink-0 d-block">
                                                    <img :src="item.avatar" alt="avatar">
                                                </router-link>
                                                <div class="card-media-body text-truncate">
                                                    <p class="fw-semibold text-black text-truncate">{{ item.title }}</p>
                                                    <p class="small text-truncate">{{ item.subTitle }}</p>
                                                </div>
                                            </div><!-- end card -->
                                        </div><!-- end item-detail-tab-wrap -->
                                    </div><!-- end tab-pane -->
                                </div>
                            </div>
                        </div><!-- end item-detail-content -->
                    </div><!-- end col -->
                    <div class="col-lg-6">
                        <div class="item-detail-content mt-4 mt-lg-0">
                            <h1 class="item-detail-title mb-2">{{ title }}</h1>
                            <div class="item-detail-meta d-flex flex-wrap align-items-center mb-3">
                                <span class="item-detail-text-meta">{{ metaText }}</span>
                                <span class="dot-separeted"></span>
                                <span class="item-detail-text-meta">{{ metaTextTwo }}</span>
                                <span class="dot-separeted"></span>
                                <span class="item-detail-text-meta" v-html="metaTextThree"></span>
                            </div>
                            <p class="item-detail-text mb-4">{{ content }}</p>
                            <div class="item-credits">
                                <div class="row g-4">
                                    <div class="col-xl-6" v-for="item in SectionData.itemDetailData.itemDetailList" :key="item.id">
                                        <div class="card-media card-media-s1">
                                            <router-link :to="item.path" class="card-media-img flex-shrink-0 d-block">
                                                <img :src="item.avatar" alt="avatar">
                                            </router-link>
                                            <div class="card-media-body">
                                                <router-link :to="item.path" class="fw-semibold">{{ item.title }}</router-link>
                                                <p class="fw-medium small">{{ item.subTitle }}</p>
                                            </div>
                                        </div><!-- end card -->
                                    </div><!-- end col-->
                                    <div class="col-xl-12" v-for="item in SectionData.itemDetailData.itemDetailListTwo" :key="item.id">
                                        <div class="card-media card-media-s1">
                                            <router-link :to="item.path" class="card-media-img flex-shrink-0 d-block">
                                                <img :src="item.avatar" alt="avatar">
                                            </router-link>
                                            <div class="card-media-body">
                                                <p class="fw-semibold text-black">{{ item.title }}</p>
                                                <span class="fw-medium small">{{ item.subTitle }}</span>
                                            </div>
                                        </div><!-- end card -->
                                    </div><!-- end col-->
                                </div><!-- end row -->
                            </div><!-- end row -->
                            <div class="item-detail-btns mt-4">
                                <ul class="btns-group d-flex">
                                    <li class="flex-grow-1">
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#placeBidModal" class="btn btn-primary d-block">{{ SectionData.itemDetailData.btnText }}</a>
                                    </li>
                                    <li class="flex-grow-1">
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#buyModal" class="btn btn-primary d-block">Buy</a>
                                    </li>
                                    <li class="flex-grow-1">
                                        <div class="dropdown">
                                            <a href="#" class="btn bg-dark-dim d-block" data-bs-toggle="dropdown">{{ SectionData.itemDetailData.btnTextTwo }}</a>
                                            <div class="dropdown-menu card-generic p-2 keep-open w-100 mt-1">
                                                <router-link :to="icon.path" class="dropdown-item card-generic-item" v-for="(icon, i) in SectionData.socialShareList" :key="i"><em class="ni me-2" :class="icon.btnClass"></em>{{ icon.title }}</router-link>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <!-- <p class="mt-4">When user is owner of this NFT</p>
                                <ul class="btns-group d-flex">
                                    <li class="flex-grow-1">
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#listModal" class="btn btn-primary d-block">Sell</a>
                                    </li>
                                    <li class="flex-grow-1">
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#cancelListModal" class="btn btn-primary d-block">Cancel listing</a>
                                    </li>
                                    <li class="flex-grow-1">
                                        <div class="dropdown">
                                            <a href="#" class="btn bg-dark-dim d-block" data-bs-toggle="dropdown">{{ SectionData.itemDetailData.btnTextTwo }}</a>
                                            <div class="dropdown-menu card-generic p-2 keep-open w-100 mt-1">
                                                <router-link :to="icon.path" class="dropdown-item card-generic-item" v-for="(icon, i) in SectionData.socialShareList" :key="i"><em class="ni me-2" :class="icon.btnClass"></em>{{ icon.title }}</router-link>
                                            </div>
                                        </div>
                                    </li>
                                </ul> -->
                            </div><!-- end item-detail-btns -->
                        </div><!-- end item-detail-content -->
                    </div><!-- end col -->
                </div><!-- end row -->
            </div><!-- .container -->



             <!-- Modal -->
            <div class="modal fade" id="placeBidModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">{{ SectionData.placeBidModal.title }}</h4>
                            <button type="button" class="btn-close icon-btn" data-bs-dismiss="modal" aria-label="Close">
                                <em class="ni ni-cross"></em>
                            </button>
                        </div><!-- end modal-header -->
                        <div class="modal-body">
                            <p class="mb-3" v-html="SectionData.placeBidModal.content"></p>
                            <div class="mb-3">
                                <label class="form-label">{{ SectionData.placeBidModal.labelText }}</label>
                                <input type="text" class="form-control form-control-s1" placeholder="Enter bid" v-model="BidData.bidETH">
                            </div>
                            <div class="mb-3">
                                <label class="form-label" v-html="SectionData.placeBidModal.labelTextTwo"></label>
                                <input type="text" class="form-control form-control-s1" v-model="BidData.bidAmount">
                            </div>
                            <ul class="total-bid-list mb-4">
                                <li v-for="(list, i) in SectionData.placeBidModal.totalBidList" :key="i"><span>{{ list.title }}</span> <span>{{ list.price }}</span></li>
                            </ul>
                            <!-- <a :href="SectionData.placeBidModal.btnLink" class="btn btn-primary d-block">{{ SectionData.placeBidModal.btnText }}</a> -->
                            <button class="btn btn-primary d-block" type="button" v-on:click="placeBid">{{SectionData.placeBidModal.btnText}}</button>
                        </div><!-- end modal-body -->
                    </div><!-- end modal-content -->
                </div><!-- end modal-dialog -->
            </div><!-- end modal-->



             <!-- Modal -->
            <div class="modal fade" id="buyModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Buy</h4>
                            <button type="button" class="btn-close icon-btn" data-bs-dismiss="modal" aria-label="Close">
                                <em class="ni ni-cross"></em>
                            </button>
                        </div><!-- end modal-header -->
                        <div class="modal-body">
                            <p class="mb-3">You are about to buy a NFT of <b>Meebits</b>.</p>
                            <!-- <div class="mb-3">
                                <label class="form-label">{{ SectionData.placeBidModal.labelText }}</label>
                                <input type="text" class="form-control form-control-s1" placeholder="Enter bid">
                            </div>
                            <div class="mb-3">
                                <label class="form-label" v-html="SectionData.placeBidModal.labelTextTwo"></label>
                                <input type="text" class="form-control form-control-s1" value="1">
                            </div> -->
                            <ul class="total-bid-list mb-4">
                                <li><span>Your balance</span> <span>10.67856 ETH</span></li>
                                <li><span>NFT price</span> <span>3.75 ETH</span></li>
                                <li><span>Service fee</span> <span>3.5%</span></li>
                                <li><span>You will pay</span> <span>0.013325 ETH</span></li>
                            </ul>
                            <a :href="SectionData.placeBidModal.btnLink" class="btn btn-primary d-block">Buy</a>
                        </div><!-- end modal-body -->
                    </div><!-- end modal-content -->
                </div><!-- end modal-dialog -->
            </div><!-- end modal-->

            <div class="modal fade" id="listModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">List item for sale</h4>
                            <button type="button" class="btn-close icon-btn" data-bs-dismiss="modal" aria-label="Close">
                                <em class="ni ni-cross"></em>
                            </button>
                        </div><!-- end modal-header -->
                        <div class="modal-body">
                            <p class="mb-3">You are about to list your NFT of <b>Meebits</b>.</p>
                            <div class="mb-3">
                                <label class="form-label">List Price</label>
                                <input type="text" class="form-control form-control-s1" placeholder="Enter list price">
                            </div>
                            <!-- <div class="mb-3">
                                <label class="form-label" v-html="SectionData.placeBidModal.labelTextTwo"></label>
                                <input type="text" class="form-control form-control-s1" value="1">
                            </div> -->
                            <!-- <ul class="total-bid-list mb-4">
                                <li><span>Your balance</span> <span>10.67856 ETH</span></li>
                                <li><span>NFT price</span> <span>3.75 ETH</span></li>
                                <li><span>Service fee</span> <span>3.5%</span></li>
                                <li><span>You will pay</span> <span>0.013325 ETH</span></li>
                            </ul> -->
                            <a :href="SectionData.placeBidModal.btnLink" class="btn btn-primary d-block">List</a>
                        </div><!-- end modal-body -->
                    </div><!-- end modal-content -->
                </div><!-- end modal-dialog -->
            </div><!-- end modal-->

            <div class="modal fade" id="cancelListModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Are you sure you want to cancel your listing?</h4>
                            <button type="button" class="btn-close icon-btn" data-bs-dismiss="modal" aria-label="Close">
                                <em class="ni ni-cross"></em>
                            </button>
                        </div><!-- end modal-header -->
                        <div class="modal-body">
                            <p class="mb-3">Canceling your listing will unpublish this sale from Our Marketplace and requires a transaction to make sure it will never be fulfillable.</p>
                            
                            <div class="d-flex justify-content-center gap-5">
                                <a href="#" data-bs-dismiss="modal" aria-label="Close" class="btn btn-normal d-block">Never mind</a>
                                <a :href="SectionData.placeBidModal.btnLink" class="btn btn-primary d-block">Cancel listing</a>
                            </div>
                        </div><!-- end modal-body -->
                    </div><!-- end modal-content -->
                </div><!-- end modal-dialog -->
            </div><!-- end modal-->
            
            <div class="modal fade" id="acceptModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Are you sure you want to accept this bid?</h4>
                            <button type="button" class="btn-close icon-btn" data-bs-dismiss="modal" aria-label="Close">
                                <em class="ni ni-cross"></em>
                            </button>
                        </div><!-- end modal-header -->
                        <div class="modal-body">
                            <p class="mb-3">Accepting this bid will transfer ownership of this NFT and requires a transaction to make sure it will never be fulfillable.</p>
                            
                            <div class="d-flex justify-content-center gap-5">
                                <a href="#" data-bs-dismiss="modal" aria-label="Close" class="btn btn-normal d-block">Never mind</a>
                                <a :href="SectionData.placeBidModal.btnLink" class="btn btn-primary d-block">Accpet</a>
                            </div>
                        </div><!-- end modal-body -->
                    </div><!-- end modal-content -->
                </div><!-- end modal-dialog -->
            </div><!-- end modal-->

            <div class="modal fade" id="declineModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Are you sure you want to decline this bid?</h4>
                            <button type="button" class="btn-close icon-btn" data-bs-dismiss="modal" aria-label="Close">
                                <em class="ni ni-cross"></em>
                            </button>
                        </div><!-- end modal-header -->
                        <div class="modal-body">
                            <p class="mb-3">Declining this bid action requires a transaction to make sure it will never be fulfillable.</p>
                            
                            <div class="d-flex justify-content-center gap-5">
                                <a href="#" data-bs-dismiss="modal" aria-label="Close" class="btn btn-normal d-block">Never mind</a>
                                <a :href="SectionData.placeBidModal.btnLink" class="btn btn-primary d-block">Decline</a>
                            </div>
                        </div><!-- end modal-body -->
                    </div><!-- end modal-content -->
                </div><!-- end modal-dialog -->
            </div><!-- end modal-->
    </section><!-- end item-detail-section -->
        <!-- Related product -->
        <!-- <RelatedProduct></RelatedProduct> -->
        <!-- Footer  -->
        <Footer></Footer>
</div><!-- end page-wrap -->
</template>

<script>
//import ProductDetailSection from '@/components/section/Products'
// Import component data. You can change the data in the store to reflect in all component

import { mapState, mapGetters } from "vuex";

import {
  // ERC721Factory_address,
  // ERC721Factory_json,
  // SolanaNFT_json,
  // programId,
  // TOKEN_METADATA_PROGRAM_ID
} from "@/constants/constant.js";

import {
  // Keypair,
  // PublicKey,
  // Transaction,
  Connection,
  clusterApiUrl,
  // SystemProgram,
  // SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";

import * as anchor from "@project-serum/anchor";

// async function sendTransaction(transaction, signers) {
//   // const wallet = useWallet();
//   // const connection = useConnection().connection
//   // const wallet = window.solana;
//   // const connection = window.solana.connect();
//   const wallet = window.solana;
//   const preflightCommitment = '"finalized"'
//   const commitment = '"finalized"'
//   const connection = new Connection(clusterApiUrl('devnet'))
//   const provider = new anchor.Provider(connection, wallet, { preflightCommitment, commitment })
//   const owner = provider.wallet;
  
//   // const connection = useConnection().connection
//   try{
//     transaction.feePayer = owner.publicKey
//     transaction.recentBlockhash = (await connection.getRecentBlockhash('max')).blockhash;
//     transaction.setSigners(owner.publicKey,...signers.map(s => s.publicKey));
//     if(signers.length !== 0)
//       await transaction.partialSign(...signers)
//     const signedTransaction = await owner.signTransaction(transaction);
//     let hash = await connection.sendRawTransaction(await signedTransaction.serialize());
//     await connection.confirmTransaction(hash);
//     // Store.addNotification({
//     console.log({
//       title: "Success",
//       message: "Success",
//       type: "success",
//       insert: "top",
//       container: "top-right",
//       animationIn: ["animate__animated", "animate__fadeIn"],
//       animationOut: ["animate__animated", "animate__fadeOut"],
//       dismiss: {
//         duration: 1000,
//         onScreen: true
//       }
//     });
//   } catch(err) {
//     console.log(err)
//     // Store.addNotification({
//     console.log({
//       title: "ERROR",
//       message: "Error",
//       type: "warning",
//       insert: "top",
//       container: "top-right",
//       animationIn: ["animate__animated", "animate__fadeIn"],
//       animationOut: ["animate__animated", "animate__fadeOut"],
//       dismiss: {
//         duration: 1000,
//         onScreen: true
//       }
//     });
//   }
// }

import SectionData from '@/store/store.js'

export default {
  name: 'ProductDetail',
  data(){
    return{
      SectionData,
      id: this.$route.params.id,
      title: '',
      imgLg: '',
      metaText: '',
      metaTextTwo: '',
      metaTextThree: '',
      content: '',
      BidData: {
        bidETH: '',
        bidAmount: '1'
      }
    }
  },
  computed: {
    ...mapState(["auth"]),
    ...mapGetters({ currentChain: ["auth/currentChain"] }),
  },
  mounted() {
    SectionData.productData.products.forEach( element => {
      if(this.id == element.id){
        this.imgLg = element.imgLg;
        this.title = element.title;
        this.metaText = element.metaText;
        this.metaTextTwo = element.metaTextTwo;
        this.metaTextThree = element.metaTextThree;
        this.content = element.content;
      }
    });
  },
  methods: {
    async placeBid() {
      console.log("Place a bid clicked")
      console.log(this.BidData.bidETH, this.BidData.bidAmount)
      if ((await this.currentChain()) == "ethereum") {
        console.log("Ethereum Auction bid")
        return false;
      } else if ((await this.currentChain()) == "solana" && this.auth.user.address.length != 0) {
        console.log("Solana Auction bid")
        
        const wallet = window.solana;
        const preflightCommitment = '"finalized"'
        const commitment = '"finalized"'

        const connection = new Connection(clusterApiUrl('devnet'))
        const provider = new anchor.Provider(connection, wallet, { preflightCommitment, commitment })
        // const program = new anchor.Program(SolanaNFT_json, programId, provider)
        const owner = provider.wallet.publicKey;
        
        if(typeof owner != "undefined") {
          console.log("Phantom wallet --------------------------", owner)
        }
        return false;
      }
      console.log("Chain not selected")
      return false;
    }
  }
}
</script>
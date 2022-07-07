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
                <img
                  :src="'/files/nfts/file/' + NFT.file"
                  alt=""
                  class="w-100 rounded-3"
                />
              </div>
              <!-- end item-detail-img-container -->
              <div class="item-detail-tab">
                <ul class="nav nav-tabs nav-tabs-s1" id="myTab" role="tablist">
                  <li class="nav-item" role="presentation" key="1">
                    <button
                      class="nav-link active"
                      id="owners-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#owners"
                      type="button"
                    >
                      Owners
                    </button>
                  </li>
                  <li class="nav-item" role="presentation" key="2">
                    <button
                      class="nav-link"
                      id="history-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#history"
                      type="button"
                    >
                      History
                    </button>
                  </li>
                </ul>
                <div class="tab-content mt-3" id="myTabContent">
                  <div
                    class="tab-pane fade show active"
                    id="owners"
                    role="tabpanel"
                    aria-labelledby="owners-tab"
                  >
                    <div class="item-detail-tab-wrap">
                      <div
                        class="card-media card-media-s2 mb-3"
                        v-for="item in SectionData.itemDetailData
                          .itemDetailOwnerList"
                        :key="item.id"
                      >
                        <router-link
                          :to="item.path"
                          class="card-media-img flex-shrink-0 d-block"
                        >
                          <!-- <img :src="item.avatar" alt="avatar" /> -->
                        </router-link>
                        <div class="card-media-body text-truncate">
                          <p class="fw-semibold text-truncate">
                            <a :href="item.path" class="text-black">{{
                              item.title
                            }}</a>
                          </p>
                          <p class="small">{{ item.subTitle }}</p>
                        </div>
                      </div>
                      <!-- end card -->
                    </div>
                    <!-- end item-detail-tab-wrap -->
                  </div>
                  <!-- end tab-pane -->
                  <div
                    class="tab-pane fade"
                    id="bids"
                    role="tabpanel"
                    aria-labelledby="bids-tab"
                  >
                    <div class="item-detail-tab-wrap">
                      <div
                        class="card-media card-media-s2 mb-3"
                        v-for="item in SectionData.itemDetailData
                          .itemDetailBidsList"
                        :key="item.id"
                      >
                        <router-link
                          :to="item.path"
                          class="card-media-img flex-shrink-0 d-block"
                        >
                          <!-- <img :src="item.avatar" alt="avatar" /> -->
                        </router-link>
                        <div class="card-media-body text-truncate">
                          <p class="fw-semibold text-black text-truncate">
                            {{ item.title }}
                          </p>
                          <p class="small">{{ item.date }}</p>
                        </div>
                        <!-- <div>
                                                    <p class="text-success" data-bs-toggle="modal" data-bs-target="#acceptModal" >Accept</p>
                                                    <p class="text-danger"  data-bs-toggle="modal" data-bs-target="#declineModal" >Decline</p>
                                                </div> -->
                      </div>
                      <!-- end card -->
                    </div>
                    <!-- end item-detail-tab-wrap -->
                  </div>
                  <!-- end tab-pane -->
                  <div
                    class="tab-pane fade"
                    id="history"
                    role="tabpanel"
                    aria-labelledby="history-tab"
                  >
                    <div class="item-detail-tab-wrap">
                      <div
                        class="card-media card-media-s2 mb-3"
                        v-for="item in SectionData.itemDetailData
                          .itemDetailHistoryList"
                        :key="item.id"
                      >
                        <router-link
                          :to="item.path"
                          class="card-media-img flex-shrink-0 d-block"
                        >
                          <img :src="item.avatar" alt="avatar" />
                        </router-link>
                        <div class="card-media-body text-truncate">
                          <p class="fw-semibold text-black text-truncate">
                            {{ item.title }}
                          </p>
                          <p class="small text-truncate">{{ item.subTitle }}</p>
                        </div>
                      </div>
                      <!-- end card -->
                    </div>
                    <!-- end item-detail-tab-wrap -->
                  </div>
                  <!-- end tab-pane -->
                </div>
              </div>
            </div>
            <!-- end item-detail-content -->
          </div>
          <!-- end col -->
          <div class="col-lg-6">
            <div class="item-detail-content mt-4 mt-lg-0">
              <div class="align-items-center">
                <h1 class="item-detail-title mb-2">
                  {{ NFT.name + " # " + NFT.tokenId }}
                </h1>
                <div>
                  <span class="item-detail-text-meta"
                    >Owned by
                    <span class="text-primary" v-if="NFT.owner">
                      {{
                        NFT.owner.substring(0, 5) +
                        "..." +
                        NFT.owner.substring(
                          NFT.owner.length - 4,
                          NFT.owner.length
                        )
                      }}</span
                    >
                  </span>
                </div>
              </div>
              <div
                class="item-detail-meta d-flex flex-wrap align-items-center mb-3 mt-3"
              >
                <span class="item-detail-text-meta">{{ NFT.description }}</span>
              </div>
              <div class="" v-if="NFT.status == 2">
                <p>Current Price</p>

                <p class="d-flex align-items-center gap-3 mt-2 fs-2 text-dark">
                  <img
                    src="@/images/tokens/eth.png"
                    width="20"
                    height="20"
                    alt="eth icon"
                  />
                  {{ NFT.price }}
                </p>
              </div>
              <div class="item-detail-btns mt-4">
                <div
                  v-if="
                    isLoggedIn() &&
                    NFT.owner != auth.user.address &&
                    NFT.status == 2
                  "
                >
                  <ul class="btns-group d-flex">
                    <!-- <li class="">
                      <a
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#placeBidModal"
                        class="btn btn-primary d-block"
                        >Place a Bid</a
                      >
                    </li> -->
                    <li class="">
                      <a
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#buyModal"
                        class="btn btn-primary d-block"
                        >Buy</a
                      >
                    </li>
                  </ul>
                </div>
                <div v-if="isLoggedIn() && NFT.owner == auth.user.address">
                  <ul class="btns-group d-flex">
                    <li class="" v-if="NFT.status == 1">
                      <a
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#listModal"
                        class="btn btn-primary d-block"
                      >
                        List
                      </a>
                    </li>
                    <li class="" v-if="NFT.status == 2">
                      <a
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#cancelListModal"
                        class="btn btn-primary d-block"
                      >
                        Cancel listing
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- end item-detail-btns -->
            </div>
            <!-- end item-detail-content -->
          </div>
          <!-- end col -->
        </div>
        <!-- end row -->
      </div>
      <!-- .container -->
      <!-- Modal -->
      <div
        class="modal fade"
        id="placeBidModal"
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Place a Bid</h4>
              <button
                type="button"
                class="btn-close icon-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <em class="ni ni-cross"></em>
              </button>
            </div>
            <!-- end modal-header -->
            <div class="modal-body">
              <p class="mb-3">
                You are about to place a bid for
                <b>{{ NFT.name + " # " + NFT.tokenId }}</b
                >.
              </p>
              <div class="mb-3">
                <label class="form-label">{{
                  SectionData.placeBidModal.labelText
                }}</label>
                <input
                  type="text"
                  class="form-control form-control-s1"
                  placeholder="Enter bid"
                  v-model="bidPrice"
                />
              </div>
              <ul class="total-bid-list mb-4">
                <li>
                  <span>Your bidding balance</span>
                  <span>{{ bidPrice }} ETH</span>
                </li>
                <li><span>Service fee 3.5%</span> <span>0 ETH</span></li>
                <li>
                  <span>You will pay</span> <span>{{ bidPrice }} ETH</span>
                </li>
              </ul>
              <a
                :href="SectionData.placeBidModal.btnLink"
                class="btn btn-primary d-block"
                data-bs-dismiss="modal"
                v-on:click="bidItem"
              >
                Place a Bid
              </a>
            </div>
            <!-- end modal-body -->
          </div>
          <!-- end modal-content -->
        </div>
        <!-- end modal-dialog -->
      </div>
      <!-- end modal-->
      <!-- Modal -->
      <div class="modal fade" id="buyModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Buy</h4>
              <button
                type="button"
                class="btn-close icon-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <em class="ni ni-cross"></em>
              </button>
            </div>
            <!-- end modal-header -->
            <div class="modal-body">
              <p class="mb-3">
                You are about to buy a NFT of
                <b>{{ NFT.name + " # " + NFT.tokenId }}</b
                >.
              </p>
              <!-- <div class="mb-3">
                                <label class="form-label">{{ SectionData.placeBidModal.labelText }}</label>
                                <input type="text" class="form-control form-control-s1" placeholder="Enter bid">
                            </div>
                            <div class="mb-3">
                                <label class="form-label" v-html="SectionData.placeBidModal.labelTextTwo"></label>
                                <input type="text" class="form-control form-control-s1" value="1">
                            </div> -->
              <ul class="total-bid-list mb-4">
                <li>
                  <span>NFT price</span> <span>{{ NFT.price }} ETH</span>
                </li>
                <li><span>Service fee</span> <span>0 %</span></li>
                <li><span>You will pay</span> <span>1 ETH</span></li>
              </ul>
              <a
                v-on:click="buyItem"
                class="btn btn-primary d-block"
                data-bs-dismiss="modal"
                >Buy</a
              >
            </div>
            <!-- end modal-body -->
          </div>
          <!-- end modal-content -->
        </div>
        <!-- end modal-dialog -->
      </div>
      <!-- end modal-->

      <div class="modal fade" id="listModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">List item for sale</h4>
              <button
                type="button"
                class="btn-close icon-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <em class="ni ni-cross"></em>
              </button>
            </div>
            <!-- end modal-header -->
            <div class="modal-body">
              <p class="mb-3">
                You are about to list your NFT of
                <b>{{ NFT ? NFT.name + " # " + NFT.tokenId : "" }}</b
                >.
              </p>
              <div class="mb-3">
                <label class="form-label">List Price</label>
                <input
                  type="number"
                  class="form-control form-control-s1"
                  placeholder="Enter list price"
                  v-model="NFT.price"
                />
              </div>
              <a
                v-on:click="list"
                data-bs-dismiss="modal"
                class="btn btn-primary d-block"
              >
                List
              </a>
            </div>
            <!-- end modal-body -->
          </div>
          <!-- end modal-content -->
        </div>
        <!-- end modal-dialog -->
      </div>
      <!-- end modal-->

      <div
        class="modal fade"
        id="cancelListModal"
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">
                Are you sure you want to cancel your listing?
              </h4>
              <button
                type="button"
                class="btn-close icon-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <em class="ni ni-cross"></em>
              </button>
            </div>
            <!-- end modal-header -->
            <div class="modal-body">
              <p class="mb-3">
                Canceling your listing will unpublish this sale from Our
                Marketplace and requires a transaction to make sure it will
                never be fulfillable.
              </p>

              <div class="d-flex justify-content-center gap-5">
                <a
                  href="#"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  class="btn btn-normal d-block"
                  >Never mind</a
                >
                <a
                  v-on:click="cancelListing"
                  class="btn btn-primary d-block"
                  data-bs-dismiss="modal"
                  >Cancel listing</a
                >
              </div>
            </div>
            <!-- end modal-body -->
          </div>
          <!-- end modal-content -->
        </div>
        <!-- end modal-dialog -->
      </div>
      <!-- end modal-->

      <div class="modal fade" id="acceptModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">
                Are you sure you want to accept this bid?
              </h4>
              <button
                type="button"
                class="btn-close icon-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <em class="ni ni-cross"></em>
              </button>
            </div>
            <!-- end modal-header -->
            <div class="modal-body">
              <p class="mb-3">
                Accepting this bid will transfer ownership of this NFT and
                requires a transaction to make sure it will never be
                fulfillable.
              </p>

              <div class="d-flex justify-content-center gap-5">
                <a
                  href="#"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  class="btn btn-normal d-block"
                  >Never mind</a
                >
                <a
                  :href="SectionData.placeBidModal.btnLink"
                  class="btn btn-primary d-block"
                  >Accpet</a
                >
              </div>
            </div>
            <!-- end modal-body -->
          </div>
          <!-- end modal-content -->
        </div>
        <!-- end modal-dialog -->
      </div>
      <!-- end modal-->

      <div
        class="modal fade"
        id="declineModal"
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">
                Are you sure you want to decline this bid?
              </h4>
              <button
                type="button"
                class="btn-close icon-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <em class="ni ni-cross"></em>
              </button>
            </div>
            <!-- end modal-header -->
            <div class="modal-body">
              <p class="mb-3">
                Declining this bid action requires a transaction to make sure it
                will never be fulfillable.
              </p>

              <div class="d-flex justify-content-center gap-5">
                <a
                  href="#"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  class="btn btn-normal d-block"
                  >Never mind</a
                >
                <a
                  :href="SectionData.placeBidModal.btnLink"
                  class="btn btn-primary d-block"
                  >Decline</a
                >
              </div>
            </div>
            <!-- end modal-body -->
          </div>
          <!-- end modal-content -->
        </div>
        <!-- end modal-dialog -->
      </div>

      <div class="loading_modal" v-if="isLoading">
        <div class="loading_content">
          <div class="d-flex align-items-center gap-3">
            <ring-loader
              :loading="loading"
              color="#ffffff"
              size="45px"
            ></ring-loader>
            <p class="">{{ loadingTxt }}</p>
          </div>
        </div>
      </div>
      <!-- end modal-->
    </section>
    <!-- end item-detail-section -->
    <!-- Related product -->
    <!-- <RelatedProduct></RelatedProduct> -->
    <!-- Footer  -->
    <Footer></Footer>
  </div>
  <!-- end page-wrap -->
</template>

<script>
//import ProductDetailSection from '@/components/section/Products'
// Import component data. You can change the data in the store to reflect in all component
import SectionData from "@/store/store.js";
import { mapState, mapGetters } from "vuex";

import NFTService from "../services/nft.service";
import RingLoader from "vue-spinner/src/RingLoader.vue";
import { createToast } from "mosha-vue-toastify";
import Web3 from "web3";
import "mosha-vue-toastify/dist/style.css";

import {
  buildERC721NFTContract,
  ERC721Factory,
} from "@/utils/buildNFTContract";
import { ERC721Factory_address } from "@/constants/constant";

export default {
  name: "NFTDetail",
  data() {
    return {
      SectionData,
      id: this.$route.params.id,
      title: "",
      imgLg: "",
      metaText: "",
      metaTextTwo: "",
      metaTextThree: "",
      content: "",
      NFT: "",
      isLoading: false,
      loadingTxt: "",
      bidPrice: "",
    };
  },
  components: {
    RingLoader,
  },
  async mounted() {
    SectionData.productData.products.forEach((element) => {
      if (this.id == element.id) {
        this.imgLg = element.imgLg;
        this.title = element.title;
        this.metaText = element.metaText;
        this.metaTextTwo = element.metaTextTwo;
        this.metaTextThree = element.metaTextThree;
        this.content = element.content;
      }
    });
    this.getNFT();
  },
  computed: {
    ...mapState(["auth"]),
    ...mapGetters({ isLoggedIn: ["auth/isLoggedIn"] }),
  },
  methods: {
    list: async function () {
      this.isLoading = true;

      console.log(
        Web3,
        ERC721Factory_address,
        buildERC721NFTContract,
        ERC721Factory
      );

      try {
        this.loadingTxt = "Loading...";

        // Check Get Listed Token
        const isListed = await ERC721Factory.methods
          .getListing(this.NFT.contract_address, this.NFT.tokenId)
          .call();
        console.log("listed? ", isListed);
        if (isListed.price != 0) {
          createToast("This NFT was already listed.");
          this.loadingTxt = "";
          this.isLoading = false;
          return false;
        }

        console.log("nft", this.NFT);
        console.log("user", this.auth.user);

        // NFT Smart Contract
        const NFT_Contract = buildERC721NFTContract(this.NFT.contract_address);
        console.log("ERC711NFT Smart Contract", NFT_Contract);

        // Call Approve Function
        this.loadingTxt = "Approving...";
        console.log(
          "approve to ",
          ERC721Factory_address.Token,
          " nft :",
          this.NFT.tokenId
        );
        await NFT_Contract.methods
          .approve(ERC721Factory_address.Token, this.NFT.tokenId)
          .send({ from: this.auth.user.address });

        // Call List function of ERC721Factory function
        this.loadingTxt = "Listing...";
        console.log(
          "list function on the ERC721Factory",
          this.NFT.contract_address,
          this.NFT.tokenId,
          Web3.utils.toWei(this.NFT.price.toString(), "ether")
        );
        await ERC721Factory.methods
          .listItem(
            this.NFT.contract_address,
            this.NFT.tokenId,
            Web3.utils.toWei(this.NFT.price.toString(), "ether")
          )
          .send({
            from: this.auth.user.address,
          });

        // Save data to database.
        this.loadingTxt = "Saving Data ...";
        const res = await NFTService.listItem(this.NFT, this.auth.user);
        console.log("save data to db", res);
        createToast("Successfully listed.");
        this.getNFT();
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        createToast(error);
        console.log("error", error);
      }
    },
    cancelListing: async function () {
      this.isLoading = true;
      try {
        this.loadingTxt = "Loading...";

        // Check Get Listed Token
        const isListed = await ERC721Factory.methods
          .getListing(this.NFT.contract_address, this.NFT.tokenId)
          .call();

        if (isListed.price == 0) {
          createToast("This NFT was not listed yet.");
          this.loadingTxt = "";
          this.isLoading = false;
          return false;
        }

        // Call List function of ERC721Factory function
        this.loadingTxt = "Cancel listing...";
        await ERC721Factory.methods
          .cancelListing(this.NFT.contract_address, this.NFT.tokenId)
          .send({
            from: this.auth.user.address,
          });

        // Save data to database.
        this.loadingTxt = "Saving Data ...";
        const res = await NFTService.cancelListing(this.NFT, this.auth.user);
        console.log(res);

        createToast("Successfully cancelled.");
        this.getNFT();
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        createToast(error);
        console.log("error", error);
      }
    },
    buyItem: async function () {
      this.isLoading = true;
      try {
        this.loadingTxt = "Loading...";

        // Check Get Listed Token
        const isListed = await ERC721Factory.methods
          .getListing(this.NFT.contract_address, this.NFT.tokenId)
          .call();

        if (isListed.price == 0) {
          createToast("This NFT was not listed yet.");
          this.loadingTxt = "";
          this.isLoading = false;
          return false;
        }

        // Call List function of ERC721Factory function
        this.loadingTxt = "Buying...";
        await ERC721Factory.methods
          .buyItem(this.NFT.contract_address, this.NFT.tokenId)
          .send({
            from: this.auth.user.address,
            value: Web3.utils.toWei(this.NFT.price, "ether"),
          });

        // Save data to database.
        this.loadingTxt = "Saving Data ...";
        const res = await NFTService.buyItem(this.NFT, this.auth.user);
        console.log(res);

        createToast("Successfully buyied.");
        this.getNFT();
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        createToast(error);
        console.log("error", error);
      }
    },
    getNFT: async function () {
      const _nft_id = this.$route.params.id;
      const _data = await NFTService.getNFTData(_nft_id);
      this.NFT = _data;
      console.log("NFT", _data);
    },
  },
};
</script>

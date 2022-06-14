<template>
  <section class="author-section section-space">
    <div class="container">
      <div class="row">
        <div class="col-xl-3">
          <AuthorSidebar
            :content="SectionData.authorSidebarDataTwo.sidebarWidget.content"
            :followingnum="
              SectionData.authorSidebarDataTwo.sidebarWidget.followingNum
            "
            :followingtext="
              SectionData.authorSidebarDataTwo.sidebarWidget.followingText
            "
            :followernum="
              SectionData.authorSidebarDataTwo.sidebarWidget.followerNum
            "
            :followertext="
              SectionData.authorSidebarDataTwo.sidebarWidget.followerText
            "
            :avatars="
              SectionData.authorSidebarDataTwo.sidebarWidget.followersAvatar
            "
            :links="SectionData.authorSidebarDataTwo.sidebarWidgetTwo.links"
            :datetext="SectionData.authorSidebarDataTwo.sidebarWidgetThree.date"
          ></AuthorSidebar>
        </div>
        <!-- end col -->
        <div class="col-xl-9 ps-xl-4">
          <div class="author-items-wrap">
              <ul class="nav nav-tabs nav-tabs-s1" id="myTab" role="tablist">
                  <li class="nav-item" role="presentation" v-for="list in SectionData.profile.profileNav" :key="list.id">
                      <button class="nav-link" :class="list.isActive" :id="list.slug" data-bs-toggle="tab" :data-bs-target="list.bsTarget" type="button">{{ list.title }}</button>
                  </li>
              </ul>
              <div class="gap-2x"></div><!-- end gap-2x -->
              <div class="tab-content" id="myTabContent">
                  <div class="tab-pane fade show active" id="my-items" role="tabpanel" aria-labelledby="my-items-tab">
                      <div class="row g-gs">
                          <div class="col-md-4" v-for="item in SectionData.productData.onSaleList" :key="item.id">
                              <div class="card card-full">
                                  <div class="card-image">
                                      <img :src="item.img" class="card-img-top" alt="art image">
                                  </div>
                                  <div class="card-body p-4">
                                      <h5 class="card-title text-truncate mb-0">{{ item.title }}</h5>
                                      <div class="card-author mb-1 d-flex align-items-center">
                                          <span class="me-1 card-author-by">By</span>
                                          <div class="custom-tooltip-wrap">
                                              <router-link :to="item.authorLink" class="custom-tooltip author-link">{{ item.author }}</router-link>
                                          </div><!-- end custom-tooltip-wrap -->
                                      </div><!-- end card-author -->
                                      <div class="d-flex justify-content-between mt-3">
                                        <p class="btn btn-sm btn-primary text-light" data-bs-toggle="modal" data-bs-target="#listModal" >List</p>
                                        <router-link to="item.path" class="btn btn-sm btn-primary">VIew</router-link>
                                      </div>
                                  </div><!-- end card-body -->
                                  <router-link
                                      class="details"
                                      :to="{
                                          name: 'ProductDetail',
                                          params: {
                                          id: item.id,
                                          title: item.title,
                                          imgLg: item.imgLg,
                                          metaText: item.metaText,
                                          metaTextTwo: item.metaTextTwo,
                                          metaTextThree: item.metaTextThree,
                                          content: item.content,
                                          }
                                      }"
                              >
                              </router-link>
                              </div><!-- end card -->
                          </div><!-- end col -->
                      </div><!-- row -->
                  </div><!-- end tab-pane -->
                  <div class="tab-pane fade" id="listed-items" role="tabpanel" aria-labelledby="listed-items-tab">
                      <div class="row g-gs">
                          <div class="col-md-4" v-for="item in SectionData.productData.ownedList" :key="item.id">
                              <div class="card card-full">
                                  <div class="card-image">
                                      <img :src="item.img" class="card-img-top" alt="art image">
                                  </div>
                                  <div class="card-body p-4">
                                      <h5 class="card-title text-truncate mb-0">{{ item.title  }}</h5>
                                      <div class="card-author mb-1 d-flex align-items-center">
                                          <span class="me-1 card-author-by">By</span>
                                          <div class="custom-tooltip-wrap">
                                              <router-link :to="item.authorLink" class="custom-tooltip author-link">{{ item.author }}</router-link>
                                          </div><!-- end custom-tooltip-wrap -->
                                      </div><!-- end card-author -->
                                      <div class="card-price-wrap d-flex align-items-center justify-content-between">
                                          <div class="me-2">
                                              <span class="card-price-title">Listed Price</span>
                                              <span class="card-price-number">10 ETH</span>
                                          </div>
                                          <div>
                                              <span class="card-price-title">Offer Price</span>
                                              <span class="card-price-number">15 ETH</span>
                                          </div>
                                      </div><!-- end card-price-wrap -->
                                  <div class="d-flex justify-content-between mt-3">
                                    <router-link to="item.path" class="btn btn-sm btn-primary">View</router-link>
                                  </div>
                                  </div><!-- end card-body -->
                                  <router-link
                                      class="details"
                                      :to="{
                                          name: 'ProductDetail',
                                          params: {
                                          id: item.id,
                                          title: item.title,
                                          imgLg: item.imgLg,
                                          metaText: item.metaText,
                                          metaTextTwo: item.metaTextTwo,
                                          metaTextThree: item.metaTextThree,
                                          content: item.content,
                                          }
                                      }"
                                  >
                                  </router-link>
                              </div><!-- end card -->
                          </div><!-- end col -->
                      </div><!-- row -->
                  </div><!-- end tab-pane -->
                  <div class="tab-pane fade" id="offers" role="tabpanel" aria-labelledby="offers-tab">
                      <div class="row g-gs">
                          <div class="col-md-4" v-for="item in SectionData.productData.ownedList" :key="item.id">
                              <div class="card card-full">
                                  <div class="card-image">
                                      <img :src="item.img" class="card-img-top" alt="art image">
                                  </div>
                                  <div class="card-body p-4">
                                      <h5 class="card-title text-truncate mb-0">{{ item.title  }}</h5>
                                      <div class="card-author mb-1 d-flex align-items-center">
                                          <span class="me-1 card-author-by">By</span>
                                          <div class="custom-tooltip-wrap">
                                              <router-link :to="item.authorLink" class="custom-tooltip author-link">{{ item.author }}</router-link>
                                          </div><!-- end custom-tooltip-wrap -->
                                      </div><!-- end card-author -->
                                      <div class="card-price-wrap d-flex align-items-center justify-content-between">
                                          <div class="me-2">
                                              <span class="card-price-title">Listed Price</span>
                                              <span class="card-price-number">10 ETH</span>
                                          </div>
                                          <div>
                                              <span class="card-price-title">Offered Price</span>
                                              <span class="card-price-number">15 ETH</span>
                                          </div>
                                      </div><!-- end card-price-wrap -->
                                  <div class="d-flex justify-content-between mt-3">
                                    <p class="btn btn-sm btn-primary text-light" data-bs-toggle="modal" data-bs-target="#cancelListModal" >Delist</p>
                                    <p class="btn btn-sm btn-primary text-light" data-bs-toggle="modal" data-bs-target="#acceptModal" >Accpet</p>
                                    <!-- <router-link to="item.path" class="btn btn-sm btn-primary">Accpet</router-link> -->
                                  </div>
                                  </div><!-- end card-body -->
                                  <router-link
                                      class="details"
                                      :to="{
                                          name: 'ProductDetail',
                                          params: {
                                          id: item.id,
                                          title: item.title,
                                          imgLg: item.imgLg,
                                          metaText: item.metaText,
                                          metaTextTwo: item.metaTextTwo,
                                          metaTextThree: item.metaTextThree,
                                          content: item.content,
                                          }
                                      }"
                                  >
                                  </router-link>
                              </div><!-- end card -->
                          </div><!-- end col -->
                      </div><!-- row -->
                  </div><!-- end tab-pane -->
                  <!-- <div class="tab-pane fade" id="auctions" role="tabpanel" aria-labelledby="auctions-tab">
                    <h1>auctinos</h1>
                  </div> -->
                  <div class="tab-pane fade" id="offer-made" role="tabpanel" aria-labelledby="offer-made-tab">
                      <div class="d-flex justify-content-between w-100">
                        <p>You made offer to <router-link to="/product-details-v1-1"><span class="text-primary">Palliman #1208</span></router-link>. <small>(Offer price: 0.072 ETH)</small></p> 
                        <p>1 week ago</p>
                        <p class="text-danger" data-bs-toggle="modal" data-bs-target="#cancelBidModal">Cancel</p>
                      </div>
                      <div class="d-flex justify-content-between w-100">
                        <p>You made offer to <router-link to="/product-details-v1-1"><span class="text-primary">Palliman #1208</span></router-link>. <small>(Offer price: 0.072 ETH)</small></p> 
                        <p>1 week ago</p>
                        <p class="text-danger" data-bs-toggle="modal" data-bs-target="#cancelBidModal">Cancel</p>
                      </div>
                      <div class="d-flex justify-content-between w-100">
                        <p>You made offer to <router-link to="/product-details-v1-1"><span class="text-primary">Palliman #1208</span></router-link>. <small>(Offer price: 0.072 ETH)</small></p> 
                        <p>1 week ago</p>
                        <p class="text-success">Confirmed</p>
                      </div>
                      <div class="d-flex justify-content-between w-100">
                        <p>You made offer to <router-link to="/product-details-v1-1"><span class="text-primary">Palliman #1208</span></router-link>. <small>(Offer price: 0.072 ETH)</small></p> 
                        <p>1 week ago</p>
                        <p class="text-success">Confirmed</p>
                      </div>
                  </div>
                  <div class="tab-pane fade" id="offer-received" role="tabpanel" aria-labelledby="offer-received-tab">
                      <div class="d-flex justify-content-between w-100">
                        <p><b>Kamran Ahmed</b> bidded to your <router-link to="/product-details-v1-1"><span class="text-primary">Palliman #1208</span></router-link>. <small>(bid price: 0.072 ETH)</small></p> 
                        <p>1 week ago</p>
                        <div class="d-flex gap-2">
                          <p class="text-success" data-bs-toggle="modal" data-bs-target="#acceptModal">Accept</p>
                          <p class="text-danger" data-bs-toggle="modal" data-bs-target="#declineModal">Decline</p>
                        </div>
                      </div>
                      <div class="d-flex justify-content-between w-100">
                        <p><b>Kamran Ahmed</b> bidded to your <router-link to="/product-details-v1-1"><span class="text-primary">Palliman #1208</span></router-link>. <small>(bid price: 0.072 ETH)</small></p> 
                        <p>1 week ago</p>
                        <p class="text-success">Confirmed</p>
                      </div>
                      <div class="d-flex justify-content-between w-100">
                        <p><b>Kamran Ahmed</b> bidded to your <router-link to="/product-details-v1-1"><span class="text-primary">Palliman #1208</span></router-link>. <small>(bid price: 0.072 ETH)</small></p> 
                        <p>1 week ago</p>
                        <p class="text-success">Confirmed</p>
                      </div>
                  </div>
                  <div class="tab-pane fade" id="activities" role="tabpanel" aria-labelledby="activities-tab">
                    <h1>activities</h1>
                  </div>
              </div><!-- end tab-content -->
          </div><!-- end author-items-wrap -->
          
        </div>
        <!-- end col-lg-8 -->
      </div>
      <!-- end row -->
    </div>
    <!-- .container -->
    <!-- Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body text-center">
            <img :src="SectionData.deleteModal.img" alt="" class="mb-3" />
            <h4 class="modal-tilte mb-2">
              {{ SectionData.deleteModal.title }}
            </h4>
            <p class="modal-text">{{ SectionData.deleteModal.content }}</p>
          </div>
          <!-- end modal-body -->
          <div class="modal-footer">
            <button type="button" class="btn btn-sm" data-bs-dismiss="modal">
              {{ SectionData.deleteModal.btnText }}
            </button>
            <button
              type="button"
              class="btn btn-sm btn-danger"
              data-bs-dismiss="modal"
            >
              {{ SectionData.deleteModal.btnTextTwo }}
            </button>
          </div>
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
    
    <div class="modal fade" id="cancelBidModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Are you sure you want to cancel your Bid?</h4>
                    <button type="button" class="btn-close icon-btn" data-bs-dismiss="modal" aria-label="Close">
                        <em class="ni ni-cross"></em>
                    </button>
                </div><!-- end modal-header -->
                <div class="modal-body">
                    <p class="mb-3">Canceling your listing will unpublish this sale from Our Marketplace and requires a transaction to make sure it will never be fulfillable.</p>
                    
                    <div class="d-flex justify-content-center gap-5">
                        <a href="#" data-bs-dismiss="modal" aria-label="Close" class="btn btn-normal d-block">Never mind</a>
                        <a :href="SectionData.placeBidModal.btnLink" class="btn btn-primary d-block">Cancel Bid</a>
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

    <!-- Modal -->
  </section>
  <!-- end author-section -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from "@/store/store.js";

import {mapState, mapGetters} from "vuex"

export default {
  name: "ProfileSection",
  data() {
    return {
      SectionData,
      items: [
        {
          id: 1,
          img: require("@/images/thumb/nft-2.jpg"),
          imgLg: require("@/images/thumb/nft-lg.jpg"),
          title: "One Tribe Black Edition",
          content:
            'Limited Edition *digital-only* "CB Galaxy" style Coke Boys LA sneakers wearable in the Decentraland metaverse',
          author: "ZeniconStudio",
          authorLink: "author",
          price: "$14.20",
          priceTwo: "1.32 ETH",
          metaText: "Not for sale",
          metaTextTwo: "200 editions",
          metaTextThree:
            'Highest bid <span class="text-primary fw-semibold">1.072 wETH</span>',
        },
        {
          id: 2,
          img: require("@/images/thumb/nft3.jpg"),
          imgLg: require("@/images/thumb/nft-lg2.jpg"),
          title: "Operation Jade Fury",
          content:
            'Limited Edition *digital-only* "CB Galaxy" style Coke Boys LA sneakers wearable in the Decentraland metaverse',
          author: "ZeniconStudio",
          authorLink: "author",
          price: "$14.20",
          priceTwo: "1.32 ETH",
          metaText: "Not for sale",
          metaTextTwo: "200 editions",
          metaTextThree:
            'Highest bid <span class="text-primary fw-semibold">1.072 wETH</span>',
        },
        {
          id: 3,
          img: require("@/images/thumb/nft4.jpg"),
          imgLg: require("@/images/thumb/nft-lg3.jpg"),
          title: "Unboxing The Compass",
          content:
            'Limited Edition *digital-only* "CB Galaxy" style Coke Boys LA sneakers wearable in the Decentraland metaverse',
          author: "ZeniconStudio",
          authorLink: "author",
          price: "$14.20",
          priceTwo: "1.32 ETH",
          metaText: "Not for sale",
          metaTextTwo: "200 editions",
          metaTextThree:
            'Highest bid <span class="text-primary fw-semibold">1.072 wETH</span>',
        },
        {
          id: 4,
          img: require("@/images/thumb/nft5.jpg"),
          imgLg: require("@/images/thumb/nft-lg4.jpg"),
          title: "Rendering by the Water",
          content:
            'Limited Edition *digital-only* "CB Galaxy" style Coke Boys LA sneakers wearable in the Decentraland metaverse',
          author: "ZeniconStudio",
          authorLink: "author",
          price: "$14.20",
          priceTwo: "1.32 ETH",
          metaText: "Not for sale",
          metaTextTwo: "200 editions",
          metaTextThree:
            'Highest bid <span class="text-primary fw-semibold">1.072 wETH</span>',
        },
        {
          id: 5,
          img: require("@/images/thumb/nft6.jpg"),
          imgLg: require("@/images/thumb/nft-lg5.jpg"),
          title: "Divine Opulence",
          content:
            'Limited Edition *digital-only* "CB Galaxy" style Coke Boys LA sneakers wearable in the Decentraland metaverse',
          author: "DvisionNetwork",
          authorLink: "author",
          price: "$12.00",
          priceTwo: "1.44 ETH",
          metaText: "Not for sale",
          metaTextTwo: "200 editions",
          metaTextThree:
            'Highest bid <span class="text-primary fw-semibold">1.072 wETH</span>',
        },
        {
          id: 6,
          img: require("@/images/thumb/nft7.jpg"),
          imgLg: require("@/images/thumb/nft-lg6.jpg"),
          title: "Sacral Metatron Cube",
          content:
            'Limited Edition *digital-only* "CB Galaxy" style Coke Boys LA sneakers wearable in the Decentraland metaverse',
          author: "KamranMedia",
          authorLink: "author",
          price: "$11.00",
          priceTwo: "2.33 ETH",
          metaText: "Not for sale",
          metaTextTwo: "200 editions",
          metaTextThree:
            'Highest bid <span class="text-primary fw-semibold">1.072 wETH</span>',
        },
      ],
      currentPage: 6,
    };
  },
  methods: {
    loadMore() {
      if (this.currentPage > this.items.currentPage) return;
      this.currentPage = this.currentPage + 3;
    },
  },
  computed: {
    itemsLoaded() {
      return this.items.slice(0, this.currentPage);
    },
    ...mapState(['auth']),
    ...mapGetters({isLoggedIn: ['auth/isLoggedIn']})

  },
  mounted () {
    if (!this.auth.status.loggedIn) {
        this.$router.push({ name: 'login' })
    }
  }
};
</script>

<style lang="css" scoped>
.details {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.btn,
.author-link {
  z-index: 2;
  position: relative;
}
</style>

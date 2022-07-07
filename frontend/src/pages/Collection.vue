<template>
  <div class="page-wrap">
    <!-- header  -->
    <header class="header-section has-header-main">
      <!-- Header main -->
      <HeaderMain></HeaderMain>

      <div class="hero-wrap">
        <div style="height: 300px; overflow: hidden; width: 100%">
          <img
            v-bind:src="'/files/collections/cover/' + collectionData.coverImage"
            style="width: 100%"
          />
        </div>
        <div class="sub-header" style="margin: 0; padding: 0">
          <div class="container">
            <div>
              <img
                v-bind:src="
                  '/files/collections/logo/' + collectionData.logoImage
                "
                style="
                  width: 200px;
                  height: 200px;
                  border-radius: 20px;
                  border: 4px solid white;
                  margin-top: -150px;
                "
              />
            </div>
            <div class="hero-content py-0">
              <div class="d-flex gap-4 align-items-center">
                <h1 :class="classname">{{ collectionData.name }}</h1>
                <div
                  class="d-flex align-items-center justify-content-center gap-2 mt-3"
                >
                  <img src="@/images/tokens/eth.png" alt="eth" width="14" />
                  <p>{{ address(collectionData.contract_address) }}</p>
                </div>
              </div>
              <p :class="classname">{{ collectionData.description }}</p>
            </div>
            <!-- hero-content -->
          </div>
        </div>
        <!-- .container-->
      </div>
      <!-- end hero-wrap -->
    </header>

    <section class="explore-section py-4 mt-4">
      <div class="container">
        <div class="row g-gs">
          <div
            class="col-xl-3 col-lg-4 col-sm-6"
            v-for="nft in NFTs"
            :key="nft._id"
          >
            <router-link class="details" :to="'/nft/' + nft._id">
              <div class="card card-product mb-0">
                <div class="card-image">
                  <img
                    v-bind:src="'/files/nfts/file/' + nft.file"
                    class="card-img-top"
                    alt="art image"
                  />
                </div>
                <div class="card-body p-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <h5 class="card-title text-truncate mb-0">
                      {{ nft.name }} # {{ nft.tokenId }}
                    </h5>
                    <p
                      class="card-price-number d-flex align-items-center gap-1"
                      v-if="nft.status == 2"
                    >
                      {{ nft.price }}
                      <img
                        src="@/images/tokens/eth.png"
                        width="10"
                        height="10"
                        alt="eth icon"
                      />
                    </p>
                  </div>
                  <div class="card-author d-flex align-items-center">
                    <span class="me-1 card-author-by">Ownered By</span>
                    <div class="custom-tooltip-wrap">
                      <p>
                        {{
                          nft.owner.substring(0, 5) +
                          "..." +
                          nft.owner.substring(
                            nft.owner.length - 4,
                            nft.owner.length
                          )
                        }}
                      </p>
                    </div>
                    <!-- end custom-tooltip-wrap -->
                  </div>
                  <!-- <div class="card-author mb-1 d-flex align-items-center">
                          <span class="me-1 card-author-by">By</span>
                          <div class="custom-tooltip-wrap">
                              <router-link :to="product.authorLink" class="custom-tooltip author-link">{{ product.author }}</router-link>
                          </div>
                      </div> -->
                  <!-- <div class="card-price-wrap d-flex align-items-center justify-content-sm-between">
                          <div class="me-5 me-sm-2">
                              <span class="card-price-title">Price</span>
                              <span class="card-price-number">{{ product.price }} ETH</span>
                          </div>
                          <div class="text-sm-end">
                              <span class="card-price-title">Current bid</span>
                              <span class="card-price-number">{{ product.priceTwo }} ETH</span>
                          </div>
                      </div> -->
                  <!-- <router-link to="product" class="btn btn-sm btn-primary">View NFT</router-link> -->
                </div>
                <!-- end card-body -->
              </div>
            </router-link>
            <!-- end card -->
          </div>
        </div>
        <!-- end row -->
      </div>
      <!-- .container -->
    </section>
    <!-- end explore-section -->

    <Footer></Footer>
  </div>
  <!-- end page-wrap -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from "@/store/store.js";

import { mapState } from "vuex";
import CollectionService from "@/services/collection.service.js";
import NFTService from "@/services/nft.service.js";

export default {
  name: "Explore",
  components: {},
  data() {
    return {
      SectionData,
      collectionData: {
        name: "",
      },
      NFTs: null,
    };
  },
  computed: {
    ...mapState(["auth"]),
  },
  async mounted() {
    // GEt Collection Data by ShortUrl
    const shortUrl = this.$route.params.shortUrl;
    const response = await CollectionService.getCollectionData(shortUrl);
    this.collectionData = response;

    const response1 = await NFTService.getNFTsByCollectionId(
      this.collectionData._id
    );
    this.NFTs = response1;

    console.log("response1", response1);
  },
  methods: {
    address: function (str) {
      if (str) {
        return (
          str.substring(0, 5) +
          "..." +
          str.substring(str.length - 4, str.length)
        );
      } else {
        return "";
      }
    },
  },
};
</script>

/* eslint-disable no-undef */
<template>
  <!-- <swiper
     :modules="modules"
     :slides-per-view="4"
     :breakpoints="{
        0: {
          slidesPerView: 1
        },
        767: {
          slidesPerView: 2
        },
        992: {
          slidesPerView: 4
        }
     }"
     :loop="true"
     :pagination="{ clickable: true }" class="swiper-container-space">
        <swiper-slide v-for="item in collectionData" :key="item.id" class="h-auto">
            <router-link :to="'/collection/'+item.shortUrl" class="card card-full card-collection">
              <div style="height: 200px; overflow: hidden;">
                <img v-bind:src="'/files/collections/cover/'+item.coverImage" class="card-img-top" >
              </div>
                <div class="card-body card-body-s1">
                    <div class="avatar avatar-1">
                          <img v-bind:src="'/files/collections/logo/'+item.logoImage" class="rounded-circle">
                    </div>
                    <h4 class="card-title mt-4 mb-2 pt-1">{{ item.title }}</h4>
                    <p class="fw-semibold text-secondary">{{ item.description }}</p>
                </div>
            </router-link>
        </swiper-slide>
    </swiper> -->

  <div class="row g-gs">
    <div v-for="item in collectionData" :key="item.id" class="h-auto col-md-4">
      <router-link
        :to="'/collection/' + item.shortUrl"
        class="card card-full card-collection"
      >
        <div style="height: 200px; overflow: hidden">
          <img
            v-bind:src="'/files/collections/cover/' + item.coverImage"
            class="card-img-top"
          />
        </div>
        <div class="card-body card-body-s1">
          <div class="avatar avatar-1">
            <img
              v-bind:src="'/files/collections/logo/' + item.logoImage"
              class="rounded-circle"
            />
          </div>
          <h4 class="card-title mt-4 mb-2 pt-1">{{ item.name }}</h4>
          <p class="fw-semibold text-secondary">{{ item.description }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from "@/store/store.js";

// core version + navigation, pagination modules:
// import SwiperCore, { Pagination } from "swiper";

// // configure Swiper to use modules
// SwiperCore.use([Pagination]);

// Import Swiper Vue.js components
// import { Swiper, SwiperSlide } from "swiper/vue";
import { mapState, mapGetters } from "vuex";

import CollectionService from "@/services/collection.service.js";

export default {
  name: "CollectionSlider",
  components: {
    // Swiper,
    // SwiperSlide,
  },
  data() {
    return {
      SectionData,
      collectionData: null,
    };
  },
  computed: {
    ...mapState(["auth"]),
    ...mapGetters({ currentChain: ["auth/currentChain"] }),
  },
  async beforeMount() {
    // Get user colleciton data by address
    const response = await CollectionService.getCollections(
      null,
      this.auth.user.chain
    );
    this.collectionData = response;
  },
  // setup() {
  //   return {
  //     modules: [Pagination],
  //   };
  // },
};
</script>

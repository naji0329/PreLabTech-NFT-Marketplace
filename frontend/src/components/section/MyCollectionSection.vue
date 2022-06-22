<template>
<section class="collection-section section-space">

    <div class="container">
       <div class="section-head-sm">
         <h2>My Collections</h2>
       </div>
        <!-- collection slider -->
        <div>
          <swiper
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
              <swiper-slide v-for="item in collectionData" :key="item._id" class="h-auto">
                  <router-link :to="'/collection/'+item.shortUrl" class="card card-full card-collection">
                    <div style="height: 100px; overflow: hidden;">
                      <img v-bind:src="require(`@/images/collections/cover/`+item.logoImage)" class="card-img-top" alt="birds art image">
                    </div>
                      <div class="card-body card-body-s1">
                          <div class="avatar avatar-1">
                                <img v-bind:src="require(`@/images/collections/logo/`+item.logoImage)" alt="avatar" class="rounded-circle">
                          </div><!-- end avatar -->
                          <h4 class="card-title mt-4 mb-2 pt-1">{{ item.title }}</h4>
                          <p class="fw-semibold text-secondary">{{ item.description }}</p>
                      </div><!-- end card-body -->
                  </router-link><!-- end card -->
              </swiper-slide>
          </swiper>
        </div>
    </div><!-- .container -->

</section><!-- end collection-section -->
</template>

<script>

import { mapState, mapGetters } from 'vuex';
// Import component data. You can change the data in the store to reflect in all component
import SectionData from '@/store/store.js'
import CollectionService from "@/services/collection.service.js";

// core version + navigation, pagination modules:
import SwiperCore, { Pagination } from 'swiper';
// configure Swiper to use modules
SwiperCore.use([Pagination]);
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

export default {
  name: 'MyCollectionSection',
  components: {
      Swiper,
      SwiperSlide,
  },
  data () {
    return {
      SectionData,
      collectionData: null,
      coverImage: "1655742395919.jpg"
    }
  },
  computed: {
      ...mapState(['auth']),
      ...mapGetters({currentChain: ['auth/currentChain']})
  },
  async beforeMount () {

    // Get user colleciton data by address
    const response = await CollectionService.getCollections(this.auth.user.address, this.auth.user.chain);
    this.collectionData = response;
    
    
  },
  methods: {
  },
  setup() {
      return{
        modules: [Pagination]
    }
  }
}
</script>

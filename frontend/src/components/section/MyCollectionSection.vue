<template>
  <section class="collection-section section-space">
    <div class="container">
      <div class="section-head-sm">
        <h2>My Collections</h2>
      </div>
      <!-- collection slider -->
      <div>
        <div class="row g-gs">
          <div
            v-for="item in collectionData"
            :key="item.id"
            class="h-auto col-md-4"
          >
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
      </div>
    </div>
    <!-- .container -->
  </section>
  <!-- end collection-section -->
</template>

<script>
import { mapState, mapGetters } from "vuex";
// Import component data. You can change the data in the store to reflect in all component
import SectionData from "@/store/store.js";
import CollectionService from "@/services/collection.service.js";

export default {
  name: "MyCollectionSection",
  components: {},
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
      this.auth.user.address,
      this.auth.user.chain
    );
    this.collectionData = response;
  },
  methods: {},
};
</script>

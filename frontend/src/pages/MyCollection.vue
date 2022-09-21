<template>
  <div class="page-wrap">
    <!-- header  -->
    <header class="header-section has-header-main">
      <!-- Header main -->
      <HeaderMain></HeaderMain>
      <!-- hero -->
      <HeroFour classname="hero-title" title="My Collections"></HeroFour>
    </header>
    <!-- Explore section  -->

    <div class="container">
      <!-- <router-link
        class="dropdown-item card-generic-item"
        to="/create-collection"
      > -->
      <!-- <button class="btn btn-primary" type="button"  data-bs-toggle="modal" data-bs-target="#cctModal">Create Collection</button> -->
      <button
        class="btn btn-primary mx-5"
        type="button"
        v-on:click="createSingleCollection()"
      >
        Create Single Collection
      </button>
      <button
        class="btn btn-primary mx-5"
        type="button"
        v-on:click="createMultipleCollection()"
      >
        Create Multiple Collection
      </button>
      <!-- </router-link> -->
    </div>

    <!-- Modal -->
    <div class="modal fade" id="cctModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <h2>Choose Type</h2>
            <p>
              Choose “Single” for one of a kind or “Multiple” if you want to
              sell one collectible multiple times
            </p>

            <div class="row g-gs">
              <div class="col-sm-6 col-6">
                <router-link
                  to="create-collection"
                  class="card text-center card-full"
                  v-on:click="createSingleCollection()"
                  data-bs-dismiss="modal"
                >
                  <div class="card-body card-body-s1 d-block">
                    <img
                      class="mb-4 create-img"
                      src="@/images/thumb/single-mobile.png"
                      alt=""
                    />
                    <span class="text-black fw-bold d-block">Single</span>
                  </div>
                </router-link>
              </div>
              <!-- enbd col -->

              <div class="col-sm-6 col-6">
                <router-link
                  to="create-singleCollection"
                  class="card text-center card-full"
                  v-on:click="createMultipleCollection()"
                  data-bs-dismiss="modal"
                >
                  <div class="card-body card-body-s1 d-block">
                    <img
                      class="mb-4 create-img"
                      src="@/images/thumb/multiple-mobile.png"
                      alt=""
                    />
                    <span class="text-black fw-bold d-block">Multiple</span>
                  </div>
                </router-link>
              </div>
              <!-- enbd col -->
            </div>
            <!-- end row -->
          </div>
        </div>
        <!-- end modal-content -->
      </div>
      <!-- end modal-dialog -->
    </div>
    <!-- end modal-->

    <MyCollectionSection></MyCollectionSection>
    <Footer></Footer>
  </div>
  <!-- end page-wrap -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from "@/store/store.js";
import HeroFour from "@/components/section/HeroFour.vue";

export default {
  name: "MyCollection",
  components: {
    HeroFour,
  },
  data() {
    return {
      SectionData,
    };
  },
  mounted() {},
  methods: {
    createSingleCollection: function () {
      this.$router.push({ name: "create-single-collection" });
    },
    createMultipleCollection: function () {
      this.$router.push({ name: "create-multiple-collection" });
    },
  },
};
</script>

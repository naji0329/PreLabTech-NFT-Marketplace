<template>
  <div class="page-wrap">
    <!-- header  -->
    <header class="header-section has-header-main bg-pattern-3">
      <!-- Header main -->
      <HeaderDashboard></HeaderDashboard>
      <!-- hero -->
      <AuthorHero
        avatarSize="avatar-3"
        :coverimg="SectionData.authorPersonalData.coverImg"
        :img="SectionData.authorPersonalData.img"
        :title="userData.fullname"
        :username="userData.username"
        :btntext="SectionData.authorPersonalData.btnText"
        :btnlink="SectionData.authorPersonalData.btnLink"
        v-model="userData"
      ></AuthorHero>
    </header>
    <!-- offer section -->
    <section class="user-panel-section section-space">
      <div class="container">
        <div class="row">
          <!-- user sidebar -->
          <UserSidebar
            :title="SectionData.offerSidebarData.title"
            :lists="SectionData.offerSidebarData.navList"
            :navs="SectionData.offerTabNavMobile"
          ></UserSidebar>
          <!-- offer -->
          <OfferSection></OfferSection>
        </div>
        <!-- end row -->
      </div>
      <!-- end container -->
    </section>
    <!-- end user-panel-section -->
    <!-- Footer  -->
    <Footer></Footer>
  </div>
  <!-- end page-wrap -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from "@/store/store.js";
export default {
  name: "Offers",
  data() {
    return {
      SectionData,
    };
  },
  computed: {
    userData() {
      var user = localStorage.getItem("user");
      console.log(user);
      user = user.split(',');
      var userData = {};
      userData.username = user[2].split(":")[1].replaceAll('"','');
      userData.fullname = user[1].split(":")[1].replaceAll('"','');
      return userData;
    },
  },
};
</script>

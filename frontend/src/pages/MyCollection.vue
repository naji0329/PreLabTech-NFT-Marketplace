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
    <router-link class="dropdown-item card-generic-item" to="/create-collection">
      <button class="btn btn-primary" type="button" >Create Collection</button>
    </router-link>
  </div>

  <CreateCollectionSection></CreateCollectionSection>
  <Footer></Footer>
</div><!-- end page-wrap -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from '@/store/store.js'
import HeroFour from '@/components/section/HeroFour.vue'


export default {
  name: 'MyCollection',
  components: {
    HeroFour
  },
  data () {
    return {
      SectionData
    }
  }
}
</script>

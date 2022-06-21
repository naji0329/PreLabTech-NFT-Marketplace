<template>
  <nav class="header-menu menu nav">
      <!-- menu list -->
      <MenuList></MenuList>

      <ul class="menu-btns menu-btns-2">
        <!-- <li class="d-none d-lg-inline-block">
          <router-link to="wallet" class="icon-btn icon-btn-s1" title="Wallet"
            ><em class="ni ni-wallet"></em
          ></router-link>
        </li> -->
        <li class="d-none d-lg-inline-block dropdown">
          <button
            type="button"
            class="icon-btn icon-btn-s1"
            data-bs-toggle="dropdown"
          >
            <em class="ni ni-user"></em>
          </button>
          <ul
            class="dropdown-menu card-generic card-generic-s3 dropdown-menu-end mt-2"
          >
            <!-- <li><h6 class="dropdown-header">Hello kamran!</h6></li> -->
            <li v-for="list in SectionData.authorNav" :key="list.id">
              <router-link class="dropdown-item card-generic-item" :to="list.path">
                <em class="ni me-2" :class="list.icon"></em>{{ list.title }}
              </router-link>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li v-if="loginFlag">
              <p
                class="dropdown-item card-generic-item"
                href=""
                @click="this.logout()"
              >
                <em class="ni ni-power me-2"></em>Logout
              </p>
            </li>
            <li v-else>
              <router-link class="dropdown-item card-generic-item" to="/login">
                <em class="ni ni-power me-2"></em>Login
              </router-link>
            </li>
          </ul>
      </li>
        <li class="d-lg-none">
          <ButtonLink
            :text="SectionData.headerData.btnText"
            link="/wallet"
            classname="btn btn-lg"
            :class="classname"
          ></ButtonLink>
        </li>
      </ul>

      <!-- header btn -->
      <!-- <ul class="menu-btns">
          <li><ButtonLink :text="SectionData.headerData.btnText" link="/wallet" classname="btn" :class="classname"></ButtonLink></li>
          <li>
             <ThemeSwitcher></ThemeSwitcher>
          </li>
      </ul> -->
  </nav><!-- .header-menu -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from '@/store/store.js'

// @ is an alias to /src
import MenuList from '@/components/common/MenuList.vue'

import { mapActions, mapState } from 'vuex'

export default {
  name: 'Menu',
  props: ['classname'],
  components: {
    MenuList
  },
  data () {
    return {
      SectionData,
      loginFlag: false
    }
  },
  computed: {
    ...mapState(['auth'])
  },
  methods : {
    ...mapActions({_logout: "auth/logout"}),
    logout: function () {
      this._logout();
      this.$router.push({ name: "Home"})
    }
  },
  mounted () {
      if (this.auth.status.loggedIn) {
        this.loginFlag = true;
      }
  }
}
</script>

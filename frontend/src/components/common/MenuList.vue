<template>
  <ul class="menu-list ms-lg-auto">
    <!-- <li class="menu-item">
            <router-link to="/" class="menu-link">Home</router-link>
          </li> -->
    <li class="menu-item">
      <router-link to="/explore" class="menu-link">Explore</router-link>
    </li>
    <li class="menu-item">
      <router-link to="/create-single" class="menu-link">Create</router-link>
    </li>
    <li class="menu-item has-sub">
      <a href="#" class="menu-link menu-toggle">{{
        SectionData.headerData.menuList3.title
      }}</a>
      <div class="menu-sub">
        <ul class="menu-list">
          <li
            class="menu-item"
            v-for="nav in SectionData.headerData.menuList3.navList"
            :key="nav.id"
          >
            <router-link :to="nav.path" class="menu-link">{{
              nav.title
            }}</router-link>
          </li>
        </ul>
      </div>
    </li>
    <li class="menu-item has-sub">
      <a href="#" class="menu-link menu-toggle">{{
        SectionData.headerData.menuList4.title
      }}</a>
      <div class="menu-sub menu-mega">
        <div class="menu-mega-row">
          <ul class="menu-list menu-list-mega">
            <li
              class="menu-item"
              v-for="nav in SectionData.headerData.menuList4.navList"
              :key="nav.id"
            >
              <router-link :to="nav.path" class="menu-link">{{
                nav.title
              }}</router-link>
            </li>
          </ul>
          <ul class="menu-list menu-list-mega">
            <li
              class="menu-item"
              v-for="nav in SectionData.headerData.menuList4.navListTwo"
              :key="nav.id"
            >
              <router-link :to="nav.path" class="menu-link">{{
                nav.title
              }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from "@/store/store.js";

export default {
  name: "MenuList",
  data() {
    return {
      SectionData,
    };
  },
};
</script>

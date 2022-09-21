<template>
  <section class="wallet-section section-space-b">
    <div class="container">
      <div class="row g-gs">
        <div class="col-sm-6 col-md-4 col-xl-4">
          <div
            class="card-media card-full card-media-s1 flex-column justify-content-center flex-wrap p-4"
          >
            <div
              class="d-flex flex-column align-items-center justify-content-center py-1"
            >
              <img
                src="@/images/brand/metamask.svg"
                alt="logo"
                class="card-media-img flex-shrink-0 me-0 mb-3"
              />
              <h6>Metamask</h6>
            </div>
            <div
              class="card-media-body flex-grow-0 mt-3"
              v-on:click="connectMetamaskWallet"
            >
              <span class="btn btn-sm btn-outline-secondary">
                {{
                  metamaskWallet
                    ? metamaskWallet.slice(0, 5) +
                      "..." +
                      metamaskWallet.slice(
                        metamaskWallet.length - 5,
                        metamaskWallet.length
                      )
                    : "Connect"
                }}
              </span>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-md-4 col-xl-4">
          <div
            class="card-media card-full card-media-s1 flex-column justify-content-center flex-wrap p-4"
          >
            <div
              class="d-flex flex-column align-items-center justify-content-center py-1"
            >
              <img
                src="@/images/brand/phantom.png"
                alt="logo"
                class="card-media-img flex-shrink-0 me-0 mb-3"
              />
              <h6>Phantom</h6>
            </div>
            <div
              class="card-media-body flex-grow-0 mt-3"
              v-on:click="connectPhantomWallet"
            >
              <span class="btn btn-sm btn-outline-secondary">
                {{
                  phantomWallet
                    ? phantomWallet.slice(0, 5) +
                      "..." +
                      phantomWallet.slice(
                        phantomWallet.length - 5,
                        phantomWallet.length
                      )
                    : "Connect"
                }}
              </span>
            </div>
          </div>
        </div>

        <!-- <div class="col-sm-6 col-md-4 col-xl-4" v-for="item in SectionData.walletDataTwo" :key="item.id">
                        <router-link class="card-media card-full card-media-s1 flex-column justify-content-center flex-wrap p-4">
                            <div class="d-flex flex-column align-items-center justify-content-center py-1">
                                <img :src="item.img" alt="logo" class="card-media-img flex-shrink-0 me-0 mb-3">
                                <h6>{{ item.title }}</h6>
                            </div>
                            <div class="card-media-body flex-grow-0 mt-3">
                                 <span class="btn btn-sm btn-outline-secondary">{{ item.btnText }}</span>
                            </div>
                        </router-link>
                    </div> -->
      </div>
    </div>
    <!-- .container -->
  </section>
  <!-- end wallet-section -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from "@/store/store.js";
// import AuthService from "@/services/AuthService.js";

import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "WalletSection",
  data() {
    return {
      SectionData,
      metamaskWallet: null,
      phantomWallet: null,
    };
  },
  computed: {
    ...mapState(["auth"]),
    ...mapGetters({ isLoggoedIn: ["auth/isLoggoedIn"] }),
  },
  methods: {
    ...mapActions({
      loginWithMetamask: "auth/loginWithMetamask",
      loginWithPhantom: "auth/loginWithPhantom",
    }),
    connectMetamaskWallet: async function () {
        const [userAddress] = await window.ethereum.enable();
        this.metamaskWallet = userAddress;

        if (userAddress) {
          try {
            await this.loginWithMetamask(this.metamaskWallet);
            console.log("asdfasdfas", this.auth);
            if (this.auth.status.loggedIn) {
              this.$router.push({ name: "profile" });
            }
          } catch (error) {
            this.msg = error.response.data.msg;
            alert(this.msg);
          }
        } else {
        window.open("https://metamask.io/download/");
      }
    },
    connectPhantomWallet: async function () {
      console.log()
      if (typeof window.solana == "undefined") {
        window.open("https://phantom.app");
      } else {
        const solana = window.solana; 
        const response = await solana.connect();
        this.phantomWallet = response.publicKey.toString();

        await this.loginWithPhantom(this.phantomWallet);
        if (this.auth.status.loggedIn) {
          this.$router.push({ name: "profile" });
        }

      }
    },
  },
};
</script>

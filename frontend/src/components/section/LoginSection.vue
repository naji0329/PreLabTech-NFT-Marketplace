<template>
  <section class="login-section section-space-b pt-4 pt-md-5 mt-md-3">
    <div class="container">
      <div class="row align-items-center justify-content-center">
        <div class="col-lg-6 mb-5 mb-lg-0 d-none d-lg-block">
          <img :src="SectionData.loginData.img" alt="" class="img-fluid" />
        </div>
        <div class="col-lg-6">
          <div class="section-head-sm">
            <h2 class="mb-1">Welcome to the PreLabTech</h2>
            <p>{{ SectionData.loginData.subTitle }}</p>
          </div>
          <!-- <form action="#">
            <div class="form-floating mb-4">
              <input
                type="email"
                class="form-control"
                id="emailAddress"
                placeholder="name@example.com"
                v-model="email"
              />
              <label for="emailAddress">Email address</label>
            </div>
            <div class="form-floating mb-4">
              <input
                type="password"
                class="form-control password"
                id="password"
                placeholder="Password"
                v-model="password"
              />
              <label for="password">Password</label>
              <a
                href="password"
                class="password-toggle"
                title="Toggle show/hide pasword"
              >
                <em class="password-shown ni ni-eye-off"></em>
                <em class="password-hidden ni ni-eye"></em>
              </a>
            </div>
            <div
              class="d-flex flex-wrap align-items-center justify-content-between mb-4"
            >
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="logMeIn"
                />
                <label
                  class="form-check-label form-check-label-s1"
                  for="logMeIn"
                >
                  Remember me
                </label>
              </div>
              <router-link to="login" class="btn-link form-forget-password"
                >Forgot Password</router-link
              >
            </div>
            <button class="btn btn-primary w-100" type="button" @click="login">
              {{ SectionData.loginData.btnText }}
            </button>
            <span class="d-block my-4">— or login with —</span>
            <p class="mt-3 form-text">
              {{ SectionData.loginData.haveAccountText }}
              <router-link
                :to="SectionData.loginData.btnTextLink"
                class="btn-link"
                >{{ SectionData.loginData.btnTextTwo }}</router-link
              >
            </p>
          </form> -->
          <WalletSection></WalletSection>

          <div>
            <p>If you don't have wallet, You can <span style="cursor: pointer"  data-bs-toggle="modal" data-bs-target="#createNewWalletModal"><b>create</b></span> a new wallet from website.</p>
          </div>
        </div>
        <!-- end col-lg-6 -->
      </div>
      <!-- end row -->
    </div>
    <!-- end container -->

    
    <div class="modal fade" id="createNewWalletModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Create New Wallet.</h4>
                    <button type="button" class="btn-close icon-btn" data-bs-dismiss="modal" aria-label="Close">
                        <em class="ni ni-cross"></em>
                    </button>
                </div><!-- end modal-header -->
                <div class="modal-body">
                    <p class="mb-3">Please input email, We will send Private key to your email.</p>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      placeholder="Please enter your email"
                      v-model="email"
                    />
                    
                    <div class="d-flex justify-content-center gap-5 mt-4">
                        <a href="#" data-bs-dismiss="modal" aria-label="Close" class="btn btn-normal d-block">Cancel</a>
                        <a href="#" v-on:click="createNewWallet" class="btn btn-primary d-block">Create</a>
                    </div>
                </div><!-- end modal-body -->
            </div><!-- end modal-content -->
        </div><!-- end modal-dialog -->
    </div><!-- end modal-->
  </section>
</template>
<script>
// Import component data. You can change the data in the store to reflect in all component

import SectionData from "@/store/store.js";
// import AuthService from "@/services/AuthService.js";

import { mapActions } from 'vuex';

export default {
  name: "LoginSection",
  data() {
    return {
      SectionData,
      email: "",
      password: "",
      msg: "",
    };
  },
  mounted() {
    /*  ======== Show/Hide passoword ======== */
    function showHidePassword(selector) {
      let elem = document.querySelectorAll(selector);
      if (elem.length > 0) {
        elem.forEach((item) => {
          item.addEventListener("click", function (e) {
            e.preventDefault();
            let target = document.getElementById(item.getAttribute("href"));
            if (target.type == "password") {
              target.type = "text";
              item.classList.add("is-shown");
            } else {
              target.type = "password";
              item.classList.remove("is-shown");
            }
          });
        });
      }
    }

    showHidePassword(".password-toggle");
  },
  methods: {
    ...mapActions({_createNewWallet: 'auth/createNewWallet'}),
    async login() {
      try {
        // const credentials = {
        //   email: this.email,
        //   password: this.password,
        // };
        // const response = await AuthService.login(credentials);
        // this.msg = response.msg;
        // alert(this.msg);
        this.$router.push("/offers");
      } catch (error) {
        this.msg = error.response.data.msg;
        alert(this.msg);
      }
    },
    async createNewWallet() {
      try {
        console.log('create new wallet', this.email);
        this._createNewWallet(this.email);
      } catch (error) {
        this.msg = error.response.data.msg;
        alert(this.msg);
      }
    }
  },
};
</script>

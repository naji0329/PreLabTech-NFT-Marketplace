<template>
  <section class="register-section section-space-b pt-4 pt-md-5 mt-md-3">
    <div class="container">
      <div class="row align-items-center justify-content-center">
        <div class="col-lg-6 mb-lg-0 d-none d-lg-block">
          <img :src="SectionData.registerData.img" alt="" class="img-fluid" />
        </div>
        <!-- end col-lg-6 -->
        <div class="col-lg-6 col-md-9">
          <div class="section-head-sm">
            <h2 class="mb-2" v-html="SectionData.registerData.title"></h2>
            <p>{{ SectionData.registerData.subTitle }}</p>
          </div>
          <form action="#">
            <div class="form-floating mb-4">
              <input
                type="text"
                class="form-control"
                id="fullName"
                placeholder="Name"
                v-model="fullname"
              />
              <label for="fullName">Full name</label>
            </div>
            <!-- end form-floating -->
            <div class="form-floating mb-4">
              <input
                type="text"
                class="form-control"
                id="userName"
                placeholder="Username"
                v-model="username"
              />
              <label for="userName">Username</label>
            </div>
            <!-- end form-floating -->
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
            <!-- end form-floating -->
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
            <div class="form-floating mb-4">
              <input
                type="password"
                class="form-control password"
                id="password_repeat"
                placeholder="Password Confirm"
                v-model="password_repeat"
              />
              <label for="password_repeat">Password Confirm</label>
              <a
                href="password_repeat"
                class="password-toggle"
                title="Toggle show/hide pasword"
              >
                <em class="password-shown ni ni-eye-off"></em>
                <em class="password-hidden ni ni-eye"></em>
              </a>
            </div>
            <!-- end form-floating -->
            <p class="mb-4 form-text">
              {{ SectionData.registerData.termText }}
            </p>
            <button class="btn btn-primary w-100" type="button" @click="signUp">
              {{ SectionData.registerData.btnText }}
            </button>
            <span class="d-block my-4">— or sign up with —</span>
            <ul class="btns-group d-flex">
              <li
                class="flex-grow-1"
                v-for="(list, i) in SectionData.registerData.btns"
                :key="i"
              >
                <router-link
                  :to="list.path"
                  class="btn d-block"
                  :class="list.btnClass"
                  ><em class="ni" :class="list.icon"></em> {{ list.title }}
                </router-link>
              </li>
            </ul>
            <p class="mt-3 form-text">
              {{ SectionData.registerData.haveAccountText }}
              <router-link
                :to="SectionData.registerData.btnTextLink"
                class="btn-link"
                >{{ SectionData.registerData.btnTextTwo }}</router-link
              >
            </p>
          </form>
        </div>
        <!-- end col-lg-6 -->
      </div>
      <!-- end row -->
    </div>
    <!-- end container -->
  </section>
  <!-- end register-section -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from "@/store/store.js";
import AuthService from "@/services/AuthService.js";

export default {
  name: "RegisterSection",
  data() {
    return {
      SectionData,
      username: "",
      password: "",
      fullname: "",
      email: "",
      password_repeat: "",
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
    async signUp() {
      try {
        const credentials = {
          username: this.username,
          fullname: this.fullname,
          email: this.email,
          password: this.password,
          password_repeat: this.password_repeat,
        };
        const response = await AuthService.signUp(credentials);
        this.msg = response.msg;
        alert(this.msg);
      } catch (error) {
        this.msg = error.response.data.msg;
        alert(this.msg);
      }
    },
  },
};
</script>

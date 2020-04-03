<template>
  <div id="login_page">
    <div class="d-flex justify-content-center align-items-center login-container">
      <form class="login-form text-center">
        <img src="./../assets/sila_r2_c13_s1-2.png" alt />
        <br />
        <br />
        <h2 class="mb-5 font-weight-light text-uppercase">TIMESHEET SYSTEM</h2>
        <div class="form-group">
          <input
            class="form-control rounded-pill form-control-lg"
            placeholder="Email ... "
            type="email"
            required
            v-model="form.email"
            @keyup.enter="onSubmit()"
          />
        </div>
        <div class="form-group">
          <input
            class="form-control rounded-pill form-control-lg"
            placeholder="Password ..."
            v-model="form.password"
            type="password"
            required
            @keyup.enter="onSubmit()"
          />
        </div>
        <div class="forgot-link form-group d-flex justify-content-between align-items-center">
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="remember" />
            <label class="form-check-label" for="remember">Remember Password</label>
          </div>
          <a href="#">Forgot Password?</a>
        </div>
        <button
          @click="login()"
          class="btn mt-5 rounded-pill btn-lg btn-custom btn-block text-uppercase"
        >Log in</button>
        <p class="mt-3 font-weight-normal">
          Don't have an account?
          <a @click="register()">
            <strong>Register Now</strong>
          </a>
        </p>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      show: true
    };
  },
  methods: {
    register() {
      this.$router.push("/register");
    },
    login() {
      console.log("login");
      axios
        .post("http://localhost:3021/login", {
          email: this.form.email,
          password: this.form.password
        })
        .then(response => {
          if (response.data.success == "success") {
            console.log(response.data.message);
            this.$store.state.store_userId = response.data.message[0].id;
            this.$store.state.store_userEmail = response.data.message[0].email;
            this.$store.state.store_userName = response.data.message[0].name;
            this.$store.state.store_token = response.data.token;

            this.$store.commit("muserId");
            this.$store.commit("muserEmail");
            this.$store.commit("muserName");
            this.$store.commit("mtoken");

            // this.$router.push("/main");

            axios
              .post("http://localhost:3021/checkStatus", {
                email: this.$store.state.store_userEmail
              })
              .then(response => {
                if (response.data.success == "success") {
                  this.$store.state.store_status = response.data.message;
                  this.$store.commit("mstatus");

                  if (response.data.message == "Auth") {
                    this.$router.push("/UserWork");
                  } else {
                    this.$router.push("/FetchAllForAdmin");
                  }
                }
              });
          } else {
            alert(response.data.message_th);
          }
        });
      // this.$router.push("/main");
    },
    clearStore() {
      this.$store.state.store_userId = null;
      this.$store.state.store_userEmail = null;
      this.$store.state.store_userName = null;
      this.$store.state.store_token = null;
      this.$store.state.store_status = null;
      this.$store.state.Admin_work_ById = null;
      this.$store.commit("muserId");
      this.$store.commit("muserEmail");
      this.$store.commit("muserName");
      this.$store.commit("mtoken");
      this.$store.commit("mstatus");
      this.$store.commit("mAdmin_work_ById");
    }
  },
  beforeMount() {
    this.clearStore();
  }
};
</script>
<style scoped>
#login_page {
  margin: 0%;
  padding: 0%;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  background: #eee;
  color: #666;
}

.login-container {
  height: 100vh;
  width: 100%;
}
.login-form {
  margin: auto;
  width: 370px;
  padding: 15px;
  max-width: 100%;
}
.login-form .form-control {
  font-size: 15px;
  min-height: 48px;
  font-weight: 500;
}
.login-form a {
  text-decoration: none;
  color: #666;
}
.login-form a:hover {
  color: #3b4f92;
}
.forgot-link {
  font-size: 13px;
}

.form-control:focus {
  border-color: #3b4f92;
  box-shadow: 0 0 0 0.2rem rgba(59, 79, 146, 0.25);
}
.btn-custom {
  background: #3b4f92;
  border-color: #3b4f92;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  min-height: 48px;
}
.btn-custom:focus,
.btn-custom:hover,
.btn-custom:active,
.btn-custom:active:focus {
  background: #1775a7;
  border-color: #1775a7;
  color: #fff;
}
.btn-custom:focus {
  box-shadow: 0 0 0 0.2rem rgba(59, 79, 146, 0.25);
}
</style>
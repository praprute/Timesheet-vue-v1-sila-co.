<template>
  <div id="register_page">
    <div class="d-flex justify-content-center align-items-center login-container">
      <form class="login-form text-center">
        <h1 class="mb-5 font-weight-light text-uppercase">Register</h1>
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
        <div class="form-group">
          <input
            class="form-control rounded-pill form-control-lg"
            placeholder="Your name"
            v-model="form.name"
            type="text"
            required
            @keyup.enter="onSubmit()"
          />
        </div>
        <button
          type="submit"
          @click="onSubmit()"
          class="btn mt-5 rounded-pill btn-lg btn-custom btn-block text-uppercase"
        >submit</button>
      </form>
    </div>
  </div>
</template>
<script scoped>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        name: ""
      },
      show: true
    };
  },
  methods: {
    onSubmit() {
      axios
        .post("http://localhost:3021/register", {
          email: this.form.email,
          password: this.form.password,
          name: this.form.name.toLowerCase()
        })
        .then(response => {
          if (response.data.success == "success") {
            console.log(response.data.message);
            alert(response.data.message_th);
            this.$router.push("/");
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
#register_page {
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
<template>
  <div id="login_page">
    <div class="row row-main-loginpage m-0">
      <div class="col-md-6 bg-left-loginpage">
        <div class="backdrop-blue"></div>
      </div>
      <div class="col-md-6 form-login">
        <div class="form-login-card">
          <h2 class="head-form">ลงชื่อเข้าใช้</h2>
          <b-form>
            <!-- username -->
            <b-form-group id="input-group-1" label="อีเมลล์" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="form.email"
                size="lg"
                type="email"
                required
                placeholder="อีเมลล์ของคุณ"
                class="rounded-pill"
                @keyup.enter="onSubmit()"
              ></b-form-input>
            </b-form-group>
            <!-- password -->
            <b-form-group id="input-group-2" label="รหัสผ่าน" label-for="input-2">
              <b-form-input
                id="input-2"
                class="rounded-pill"
                size="lg"
                v-model="form.password"
                type="password"
                required
                placeholder="รหัสผ่านของคุณ"
                @keyup.enter="onSubmit()"
              ></b-form-input>
            </b-form-group>
            <!-- ลืมรหัสผ่าน ? -->
            <div class="row row-check-box">
              <div class="col-md-8">
                <!-- <b-form-checkbox
                  id="checkbox-1"
                  v-model="status"
                  name="checkbox-1"
                  value="accepted"
                  unchecked-value="not_accepted"
                  size="lg"
                >จำฉันไว้</b-form-checkbox> -->
                <!-- <a>ลงทะเบียน</a> -->
                <br/>
                <a href="">ลงทะเบียนผู้ใช้งาน</a>
              </div>
            </div>
            <b-button type="submit" class="loginbutton" @click="onSubmit()">เข้าสู่ระบบ</b-button>
          </b-form>
        </div>
      </div>
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
    onSubmit() {
      axios
        .post("http://localhost:3020/login" ,{
          email:this.form.email,
          password:this.form.password
        })
        .then(response => {
          if(response.data.success == "success"){
            console.log(response.data.message)
            this.$store.state.store_userId = response.data.message[0].id
            this.$store.state.store_userEmail = response.data.message[0].email
            this.$store.state.store_userName = response.data.message[0].name
            this.$store.state.store_token = response.data.token

            this.$store.commit('muserId')
            this.$store.commit('muserEmail')
            this.$store.commit('muserName')
            this.$store.commit('mtoken')

            this.checkStatus()

            // this.$router.push("/main")
          }else{
            alert(response.data.message_th)
          }
        })
      // this.$router.push("/main");
    },
    clearStore(){
      this.$store.state.store_userId    = null
      this.$store.state.store_userEmail = null
      this.$store.state.store_userName  = null
      this.$store.state.store_token     = null
      this.$store.state.store_status    = null
      this.$store.state.Admin_work_ById = null
      this.$store.commit('muserId')
      this.$store.commit('muserEmail')
      this.$store.commit('muserName')
      this.$store.commit('mtoken')
      this.$store.commit('mstatus')
      this.$store.commit('mAdmin_work_ById')
    },
    checkStatus(){
                axios
                    .post("http://localhost:3020/checkStatus", {
                        email:this.$store.state.store_userEmail
                    })
                    .then(response => {
                        if(response.data.success == "success"){
                            this.$store.state.store_status = response.data.message
                            this.$store.commit('mstatus')
                            if(response.data.message == "Auth"){
                                 this.$router.push("/UserWork")
                            }else if(response.data.message == "Admin"){
                                  this.$router.push("/FetchAllForAdmin")
                            }
                        }
                    })

    }
  },
  beforeMount(){
    this.clearStore()
  }
};
</script>
<style >
#login_page {
  margin: 0%;
  padding: 0%;
}

.bg-left-loginpage {
  height: 100vh;
  width: 100%;
  background-image: url("./../assets/3398.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 0%;
  margin: 0%;
}

.backdrop-blue {
  height: 100%;
  width: 100%;
  /* background-color: rgba(60, 193, 244, 0.7); */
  background-color: rgba(0, 0, 0, 0.7);
  padding: 0%;
  margin: 0%;
}

.form-login {
  color: black;
  padding: 10px;
  margin: 0%;
}

.form-login-card {
  width: 70%;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
}
.loginbutton {
  /* background-color: rgba(60, 193, 244) !important; */
  background-color: #302f2f !important;
  color: white;
  border: none !important;
  padding-left: 50px;
  padding-right: 50px;
  width: 100%;
  border-radius: 25px;
}
.head-form {
  margin-top: -50px;
  margin-bottom: 50px;
  color: #302f2f;
}
label {
  font-size: 20px;
  color: #302f2f;
  margin-top: 25px;
}

.label-checkbox {
  margin-top: -10px;
  padding-top: -10px;
}

.loginbutton {
  margin-top: 40px;
}

.col-forget-password {
  padding-top: 33px;
}

.col-forget-password a {
  float: right;
}

.btn.focus,
.btn:focus,
input.focus,
input:focus {
  outline: 0;
  box-shadow: none !important;
}
</style>
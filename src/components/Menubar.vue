<template>
<div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-container>
    
    <b-navbar-nav v-if="status == 'Auth'">
    <b-navbar-brand href="#"  @click="Mywork">SILA</b-navbar-brand>
    </b-navbar-nav>
    <b-navbar-nav v-else>
    <b-navbar-brand href="#"  @click="FetchAllForAdmin">SILA</b-navbar-brand>
    </b-navbar-nav>
    

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>

      <b-navbar-nav v-if="status == 'Auth'">
        <!-- <b-nav-item href="#"  @click="Mywork" >MYWORK</b-nav-item> -->
        <b-nav-item href="#" @click="RegisIndex">ADD-INFORMATION</b-nav-item>

      </b-navbar-nav>

      <b-navbar-nav v-else>
        <!-- <b-nav-item href="#"  @click="FetchAllForAdmin">WORK-ALLUSER</b-nav-item> -->
        <!-- <b-nav-item href="#" @click="FetchAllUserForAdmin">WORKUSERBYID</b-nav-item> -->
        <b-nav-item href="#" @click="FetchAllUserForAdmin">ALLUSER</b-nav-item>
      </b-navbar-nav>
        <!-- <b-nav-item href="#" disabled>REGISINDEX</b-nav-item> -->
     

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!-- <b-nav-form v-if="status == 'Admin'">
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form> -->
         <b-nav-item href="#" @click="signOut">SIGNOUT</b-nav-item>
         <b-nav-item href="#">PROFILE</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
    </b-container>
  </b-navbar>
      <router-view></router-view>
</div>
</template>
<script scoped>
import axios from 'axios'
    export default{
        data(){
            return {
                status: this.$store.state.store_status
            }
        },
        methods:{
            checkStatus(){
                axios
                    .post("http://localhost:3020/checkStatus", {
                        email:this.$store.state.store_userEmail
                    })
                    .then(response => {
                        if(response.data.success == "success"){
                            this.$store.state.store_status = response.data.message
                            this.$store.commit('mstatus')
                            // if(response.data.message == "Auth"){
                            //      this.$router.push("/UserWork")
                            // }else if(response.data.message == "Admin"){
                            //      this.$router.push("/FetchAllForAdmin")
                            // }
                        }
                    })
            },
            Mywork(){
                 this.$router.push("/UserWork")
            },
            RegisIndex(){
                 this.$router.push("/RegisIndex")
            },
            FetchAllForAdmin(){
                 this.$router.push("/FetchAllForAdmin")
            },
            FetchAllUserForAdmin(){
                this.$router.push("/FetchAllUserForAdmin")
            },
            signOut(){
                axios
                    .post("http://localhost:3020/signout", {

                    })
                    .then(response => {
                        if(response.data.success == "success"){
                            this.$router.push("/")
                        }
                    })

            }
        },
        beforeMount() {
            this.checkStatus()
        },
    }
</script>
<style>

</style>
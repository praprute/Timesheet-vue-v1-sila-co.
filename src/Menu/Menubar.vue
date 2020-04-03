<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-container>
        <b-navbar-nav v-if="status == 'Auth'">
          <b-navbar-brand href="#" @click="Mywork">TIMESHEET</b-navbar-brand>
        </b-navbar-nav>
        <b-navbar-nav v-else>
          <b-navbar-brand href="#" @click="FetchAllForAdmin">TIMESHEET</b-navbar-brand>
        </b-navbar-nav>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav v-if="status == 'Auth'">
            <!-- <b-nav-item href="#"  @click="Mywork" >MYWORK</b-nav-item> -->
            <b-nav-item 
            v-b-modal.modal-prevent-closing

            @click="fetchPartner()"
            >ADD-INFORMATION</b-nav-item>
          </b-navbar-nav>
<!-- @click="RegisIndex" -->
          <b-navbar-nav v-else>
            <!-- <b-nav-item href="#"  @click="FetchAllForAdmin">WORK-ALLUSER</b-nav-item> -->
            <!-- <b-nav-item href="#" @click="FetchAllUserForAdmin">WORKUSERBYID</b-nav-item> -->
            <b-nav-item href="#" @click="FetchAllUserForAdmin">Membership</b-nav-item>
            <b-nav-item href="#" @click="Daily">Daily</b-nav-item>
            <b-nav-item href="#" @click="Options">Period</b-nav-item>
            <b-nav-item href="#" @click="Division">Division</b-nav-item>
          </b-navbar-nav>
          <!-- <b-nav-item href="#" disabled>REGISINDEX</b-nav-item> -->

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <!-- <b-nav-form v-if="status == 'Admin'">
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>-->
            <b-nav-item href="#" @click="signOut">SIGNOUT</b-nav-item>
            <!-- <b-nav-item href="#">PROFILE</b-nav-item> -->
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <b-modal id="modal-prevent-closing" 
    centered 
    title="TIMESHEET"
    size="lg"
    hide-footer
    >
    <b-container fluid>
    <b-form v-if="showForm">
            <b-form-group id="input-group-5" label-for="input-5" label="Choose a date :">
              <b-form-datepicker id="example-datepicker" v-model="formModal.date" class="mb-2"></b-form-datepicker>
            </b-form-group>

            <b-form-group id="input-group-6" label-for="input-6" label="Add Time :">
              <b-form-timepicker v-model="formModal.valueTime" class="mb-2"></b-form-timepicker>
            </b-form-group>

            <b-form-group id="input-group-1" label="Client Name" label-for="input-1">
              
              <b-form-input
                id="input-1"
                v-model="formModal.clientName"
                type="text"
                placeholder="Client Name"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Partner:" label-for="input-3">
              <b-form-select id="input-3" v-model="formModal.partner" :options="partnerModal" required></b-form-select>
            </b-form-group>

            <b-form-group id="input-group-2" label="Matter Code" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="formModal.matterCode"
                placeholder="Matter Code"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="Descriptions" label-for="input-4">
              
              <b-form-textarea
                id="textarea-rows"
                v-model="formModal.descriptions"
                placeholder="descriptions..."
                rows="8"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group id="input-group-5">
              <b-form-checkbox-group v-model="formModal.checked" id="checkboxes-5">
                <b-form-checkbox
                  value="checkSuccess"
                >Please check that it is correct because you will not be able to edit the information.</b-form-checkbox>
               
              </b-form-checkbox-group>
            </b-form-group>

            <b-button block variant="success" @click="onSubmit">Submit</b-button>
            <b-button block variant="danger" @click="onReset">Reset</b-button>
          </b-form>
           </b-container>
  </b-modal>
    <router-view></router-view>
  </div>
</template>
<script >
import axios from "axios";
export default {
  data() {
    return {
      status: this.$store.state.store_status,
      formModal: {
        date: "",
        clientName: "",
        partner: null,
        matterCode: "",
        descriptions: "",
        checked: [],
        valueTime: ""
      },
      partnerModal: [
        { text: "---------- Select One Partner ----------", value: null }
      ],
      showForm: true
    };
  },
  methods: {
    fetchPartner() {
      const token = this.$store.state.store_token;
      axios
        .post(
          " http://localhost:3021/fetchPartner",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(response => {
          if (response.data.success == "success") {
            for (let i = 0; i < response.data.message.length; i++) {
              this.partnerModal.push(response.data.message[i].name);
            }
          }
        });
    },
    onSubmit() {
      if (this.formModal.checked[0] == "checkSuccess") {
        const token = this.$store.state.store_token;
        axios
          .post(
            "http://localhost:3021/regisIndex",
            {
              idUser: this.$store.state.store_userId,
              date:         this.formModal.date.toLowerCase(),
              time:         this.formModal.valueTime.toLowerCase(),
              clientName:   this.formModal.clientName.toLowerCase(),
              partner:      this.formModal.partner,
              matterCode:   this.formModal.matterCode.toLowerCase().trim(),
              descriptions: this.formModal.descriptions.toLowerCase()
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(response => {
            if (response.data.success == "success") {
              // alert(response.data.message_th);
              // this.$router.push("/UserWork");
              this.formModal.date = ''
              this.formModal.valueTime = ''
              this.formModal.clientName = ''
              this.formModal.partner = null
              this.formModal.matterCode = ''
              this.formModal.descriptions = ''
              this.$nextTick(() => {
              this.$bvModal.hide('modal-prevent-closing')
              })
              location.reload();
            } else {
              alert(response.data.message_th);
            }
          });
      } else {
        alert("กรุณาตรวจสอบความถูกต้อง");
      }
    },
    onReset(){
      this.formModal.date = ''
      this.formModal.valueTime = ''
      this.formModal.clientName = ''
      this.formModal.partner = null
      this.formModal.matterCode = ''
      this.formModal.descriptions = ''
    },
    Mywork() {
      this.$router.push("/UserWork");
    },
    RegisIndex() {
      this.$router.push("/RegisIndex");
    },
    FetchAllForAdmin() {
      this.$router.push("/FetchAllForAdmin");
    },
    FetchAllUserForAdmin() {
      this.$router.push("/FetchAllUserForAdmin");
    },
    Daily() {
      this.$router.push("/Daily");
    },
    Options() {
      this.$router.push("/Options");
    },
    Division() {
      this.$router.push("/Division");
    },
    signOut() {
      axios.post("http://localhost:3021/signout", {}).then(response => {
        if (response.data.success == "success") {
          this.$router.push("/");
        }
      });
    }
  },
  beforeMount() {
    this.checkStatus();
  }
};
</script>
<style>
nav {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
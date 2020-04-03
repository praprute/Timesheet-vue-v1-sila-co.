<template>
  <div>
    <b-container>
      <br />
      <br />

      <br />
      <b-card>
        <b-container>
          <h1>ADD INFORMATION</h1>
          <b-form v-if="show">
            <b-form-group id="input-group-5" label-for="input-5" label="Choose a date :">
              <b-form-datepicker id="example-datepicker" v-model="form.date" class="mb-2"></b-form-datepicker>
            </b-form-group>

            <b-form-group id="input-group-6" label-for="input-6" label="Add Time :">
              <b-form-timepicker v-model="form.valueTime" class="mb-2"></b-form-timepicker>
            </b-form-group>

            <b-form-group id="input-group-1" label="Client Name" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="form.clientName"
                type="text"
                placeholder="Client Name"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Partner:" label-for="input-3">
              <b-form-select id="input-3" v-model="form.partner" :options="partner" required></b-form-select>
            </b-form-group>

            <b-form-group id="input-group-2" label="Matter Code" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="form.matterCode"
                required
                placeholder="Matter Code"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="Descriptions" label-for="input-4">
              <b-form-textarea
                id="textarea-rows"
                v-model="form.descriptions"
                placeholder="descriptions..."
                rows="8"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group id="input-group-5">
              <b-form-checkbox-group v-model="form.checked" id="checkboxes-5">
                <b-form-checkbox
                  value="checkSuccess"
                >Please check that it is correct because you will not be able to edit the information.</b-form-checkbox>
                <!-- <b-form-checkbox value="that">Check that out</b-form-checkbox> -->
              </b-form-checkbox-group>
            </b-form-group>

            <b-button block variant="success" @click="onSubmit">Submit</b-button>
            <b-button block variant="danger" @click="onReset">Reset</b-button>
          </b-form>
        </b-container>
      </b-card>
      <br />
      <br />
      <br />
    </b-container>
  </div>
</template>
<script scoped>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        date: "",
        clientName: "",
        partner: null,
        matterCode: "",
        descriptions: "",
        checked: [],
        valueTime: ""
      },
      partner: [
        { text: "---------- Select One Partner ----------", value: null }
      ],
      show: true
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
            // this.items = response.data.message.name
            for (let i = 0; i < response.data.message.length; i++) {
              this.partner.push(response.data.message[i].name);
            }
          }
        });
    },
    onSubmit() {
      if (this.form.checked[0] == "checkSuccess") {
        const token = this.$store.state.store_token;
        axios
          .post(
            "http://localhost:3021/regisIndex",
            {
              idUser: this.$store.state.store_userId,
              date: this.form.date.toLowerCase(),
              time: this.form.valueTime.toLowerCase(),
              clientName: this.form.clientName.toLowerCase(),
              partner: this.form.partner,
              matterCode: this.form.matterCode.toLowerCase().trim(),
              descriptions: this.form.descriptions.toLowerCase()
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
              alert(response.data.message_th);
              this.$router.push("/UserWork");
            } else {
              alert(response.data.message_th);
            }
          });
      } else {
        alert("กรุณาตรวจสอบความถูกต้อง");
      }
    },
    onReset() {
      this.form.date = "";
      this.form.clientName = "";
      this.form.partner = null;
      this.form.matterCode = "";
      this.form.descriptions = "";
      this.form.checked = [];
      this.form.valueTime = "";
    }
  },
  beforeMount() {
    this.fetchPartner();
  }
};
</script>
<style scoped>
</style>
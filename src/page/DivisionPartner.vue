<template>
  <div>
    <br />
    <br />
    <h1>Division</h1>
    <br />
    <br />
    <!-- <b-container> -->
    <b-container>
      <b-card>
        <b-form v-if="show">
          <br />
          <b-row>
            <h3>Partner :</h3>
          </b-row>
          <b-row>
            <b-form-select v-model="selected" :options="options"></b-form-select>
            <!-- <div class="mt-3">Selected: <strong>{{ selected }}</strong></div> -->
          </b-row>
          <br />
          <b-row>
            <b-button block variant="success" @click="fetchData">SEARCH</b-button>
          </b-row>
          <br />
        </b-form>
      </b-card>
    </b-container>

    <br />
    <br />

    <b-card>
      <b-table
        id="my-table"
        striped
        hover
        responsive
        sort-icon-left
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :items="items"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        :head-variant="headVariant"
        :fixed="fixed"
        :bordered="bordered"
      >
        <!-- <template v-slot:cell(Row)="data">
                    {{ data.index+1 }}
        </template>-->
      </b-table>

      <b-pagination
        v-model="currentPage"
        :per-page="perPage"
        aria-controls="my-table"
        align="right"
      ></b-pagination>
    </b-card>
    <!-- </b-container> -->
    <!-- :total-rows="rows" -->
    <br />
    <br />
    <br />
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      headVariant: "dark",
      fixed: false,
      bordered: true,
      sortBy: "timestamp",
      sortDesc: true,
      fields: [
        { key: "idUser" },
        "name",
        "date",
        "time",
        "clientName",
        "partner",
        "matterCode",
        "descriptions",
        { key: "timestamp", sortable: true }
      ],
      items: null,
      // partner: [{text: '---------- Select One Partner ----------', value: null}],

      show: true,
      selected: null,
      options: [{ value: null, text: "Please select a partner" }]
    };
  },
  // computed: {
  //   rows() {
  //     return this.items.length
  //   }
  // },
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
              this.options.push(response.data.message[i].name);
            }
          }
        });
    },
    fetchData() {
      const token = this.$store.state.store_token;
      axios
        .post(
          "http://localhost:3021/Division",
          {
            partner: this.selected
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
            console.log("Success");
            console.log(response.data.message);
            this.items = response.data.message;
            // this.DateFvalue = ''
            // this.DateTvalue = ''
          }
        });
    }
  },
  beforeMount() {
    this.fetchPartner();
    this.$store.state.Admin_work_ById = null;
    this.$store.commit("mAdmin_work_ById");
  }
};
</script>
<style scoped>
h1 {
  text-align: center;
}
</style>
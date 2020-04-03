<template>
  <div>
    <br />
    <br />
    <h1>Period</h1>
    <br />
    <br />
    <!-- <b-container> -->
    <b-container>
      <b-card>
        <br />
        <b-row>
          <h3>Date :</h3>
          <b-col>
            <b-form-datepicker id="example-datepicker" v-model="DateFvalue" class="mb-2"></b-form-datepicker>
            <!-- <p>Value: '{{ DateFvalue }}'</p> -->
          </b-col>
          <h3>TO :</h3>
          <b-col>
            <b-form-datepicker id="example-datepicker2" v-model="DateTvalue" class="mb-2"></b-form-datepicker>
            <!-- <p>Value: '{{ DateTvalue }}'</p> -->
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-button block variant="success" @click="fetchDataDate">SEARCH</b-button>
        </b-row>
        <br />
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
      DateFvalue: "",
      DateTvalue: ""
    };
  },
  // computed: {
  //   rows() {
  //     return this.items.length
  //   }
  // },
  methods: {
    fetchDataDate() {
      console.log(this.DateFvalue);
      console.log(this.DatetTvalue);
      const token = this.$store.state.store_token;
      axios
        .post(
          "http://localhost:3021/AdmminOptions",
          {
            datef: this.DateFvalue,
            datet: this.DateTvalue
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
    // if(this.DateFvalue || this.DateTvalue !== ""){
    //     this.fetchDataDate()
    // }

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
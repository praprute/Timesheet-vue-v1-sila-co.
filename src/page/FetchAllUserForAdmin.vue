<template>
  <div>
    <br />
    <br />
    <h1>Membership</h1>
    <br />
    <br />
    <!-- <b-container> -->
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
        <template v-slot:cell(Row)="data">{{ data.index+1 }}</template>

        <template v-slot:cell(see)="info">
          <b-button
            variant="danger"
            @click="seeInfo(items[info.index].id)"
          >User Id : {{items[info.index].id}}
          </b-button>
        </template>

      </b-table>

      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
        align="right"
      ></b-pagination>
    </b-card>
    <!-- </b-container> -->
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
      sortBy: "Row",
      sortDesc: true,
      fields: [
        { key: "Row" },
        { key: "id" },
        "name",
        "email",
        { key: "see", label: "information" }
      ],
      items: null
    };
  },
  computed: {
    rows() {
      return this.items.length;
    }
  },
  methods: {
    fetchData() {
      const token = this.$store.state.store_token;
      axios
        .post(
          "http://localhost:3021/fetchUserForAdmin",
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
            this.items = response.data.message;
          }
        });
    },
    seeInfo(data) {
      console.log(data);
      this.$store.state.Admin_work_ById = data;
      this.$store.commit("mAdmin_work_ById");
      this.$router.push("/FetchIndexByIdForAdmin");
    }
  },
  beforeMount() {
    this.fetchData();
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
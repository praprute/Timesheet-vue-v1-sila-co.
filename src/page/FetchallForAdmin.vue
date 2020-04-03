<template>
  <div>
    <br />
    <br />
    <h1>TIMESHEET</h1>
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
      perPage: 20,
      currentPage: 1,
      headVariant: "dark",
      fixed: false,
      bordered: true,
      sortBy: "id",
      sortDesc: false,
      fields: [
        { key: "id", sortable: true },
        "name",
        "email",
        "date",
        "time",
        "clientName",
        "partner",
        "matterCode",
        "descriptions",
        { key: "timestamp", sortable: false }
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
          "http://localhost:3021/fetchAllForAdmin",
          {
            userId: this.$store.state.store_userId
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
            this.items = response.data.message;
          }
        });
    }
  },
  beforeMount() {
    this.fetchData();
  }
};
</script>
<style>
h1 {
  text-align: center;
}
div.card-body {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border: 3px solid transparent;
  border-left-color: rgb(58, 58, 58);
}
.page-item.active .page-link {
  background-color: rgb(51, 58, 64);
  border-color: rgb(51, 58, 64);
}
.page-item .page-link {
  /* background-color:rgb(51,58,64);
    border-color: rgb(51,58,64); */
  color: rgb(51, 58, 64);
}
</style>
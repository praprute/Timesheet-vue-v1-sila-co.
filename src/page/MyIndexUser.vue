<template>
  <div>
    <!-- <b-container> -->
    <br />
    <br />
    <br />
    <h1>TIMESHEET</h1>
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
        <template v-slot:cell(Row)="data">
          {{ data.index+1 }}
        </template>
        
        <template v-slot:cell(edit)="dataEdit">
          
           <img src="./../assets/edit.png" 
           width="35px"
           height="35px"
           alt="" 
           v-b-modal.modal-prevent-closing-u
           @click="edit(dataEdit.item.id)">

        </template>
        
         <template v-slot:cell(del)="dataDel">

           <img src="./../assets/delete.png" 
           width="35px"
           height="35px"
           alt="" 
           @click="del(dataDel.item.id)">

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


    <b-modal id="modal-prevent-closing-u" 
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

            <b-button block variant="success" @click="onSubmitU">Submit</b-button>
            <b-button block variant="danger" @click="onResetU">Reset</b-button>
          </b-form>
           </b-container>
  </b-modal>
    <!-- </b-container> -->
    <br />
    <br />
    <br />
  </div>
</template>
<script scoped>
import axios from "axios";
export default {
  data() {
    return {
      perPage: 20,
      currentPage: 1,
      headVariant: "dark",
      fixed: false,
      bordered: true,
      sortBy: "timestamp",
      sortDesc: false,
      fields: [
        { key: "Row", sortable: false },
        {key: "id", label: "id"},
        "name",
        "date",
        "time",
        "clientName",
        "partner",
        "matterCode",
        "descriptions",
        { key: "timestamp", sortable: true , label: "timestamp"},
        { key: "edit", label:"update", sortable: false },
        { key: "del", label:"delete", sortable: false }
      ],
      items: null,
      idWork:"",
      // :sticky-header="stickyHeader"
      // :no-border-collapse="noCollapse"
      // stickyHeader: true,
      // noCollapse: true,
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
  computed: {
    rows() {
      return this.items.length;
    }
  },
  methods: {
    del(data){
      console.log(data)
      const token = this.$store.state.store_token;
      axios
        .post("http://localhost:3021/deleteWork", {
          id:data
        },{
          headers: 
          {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          if(response.data.success == "success"){
            location.reload();
          }else{
            alert(response.data.message)
            location.reload();
          }
        })
    },
    onResetU(){
      this.formModal.date = ''
      this.formModal.valueTime = ''
      this.formModal.clientName = ''
      this.formModal.partner = null
      this.formModal.matterCode = ''
      this.formModal.descriptions = ''
    },
    onSubmitU(){ 
      if (this.formModal.checked[0] == "checkSuccess"){
      const token = this.$store.state.store_token;
      axios
        .post("http://localhost:3021/editIndex",{
          idUser:       this.$store.state.store_userId,
          date:         this.formModal.date.toLowerCase(),
          time:         this.formModal.valueTime.toLowerCase(),
          clientName:   this.formModal.clientName.toLowerCase(),
          partner:      this.formModal.partner,
          matterCode:   this.formModal.matterCode.toLowerCase().trim(),
          descriptions: this.formModal.descriptions.toLowerCase(),
          workId: this.idWork
        },{
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              }
            })
        .then(response => {
            if (response.data.success == "success") {
              this.formModal.date = ''
              this.formModal.valueTime = ''
              this.formModal.clientName = ''
              this.formModal.partner = null
              this.formModal.matterCode = ''
              this.formModal.descriptions = ''
              this.idWork = ''
              this.$nextTick(() => {
              this.$bvModal.hide('modal-prevent-closing')
              })
              location.reload();
            } else {
              alert(response.data.message_th);
            }
          });
    }else{
      alert("กรุณาตรวจสอบความถูกต้อง");
    }
    },
    fetchData() {
      const token = this.$store.state.store_token;
      axios
        .post(
          "http://localhost:3021/fetchworkByIdForUser",
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
    },
    edit(data){
      console.log(data)
      const token = this.$store.state.store_token;
      axios
        .post("http://localhost:3021/fetchIdWork",{
          id: data
        },{
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(response => {
          if (response.data.success == "success") {
            this.formModal.date = response.data.message[0].date
            this.formModal.valueTime = response.data.message[0].time
            this.formModal.clientName = response.data.message[0].clientName
            this.formModal.partner = response.data.message[0].partner
            this.formModal.matterCode = response.data.message[0].matterCode
            this.formModal.descriptions = response.data.message[0].descriptions
            this.idWork = data
          }else{
            alert("SERVER ERROR")
          }
        })
    },
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
    }
  },
  beforeMount() {
    this.fetchData();
    this.fetchPartner();
  }
};
</script>
<style scoped>
</style>

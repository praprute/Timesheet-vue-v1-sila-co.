<template>
    <div>
            <br/>
            <br/>
            <b-container>
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

            <template v-slot:cell(see)="info">

            <b-button variant="danger"
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
            >
            </b-pagination>
            </b-card>
            </b-container>
            <br/>
            <br/>
            <br/>
    </div>
</template>
<script>
import axios from "axios"
export default {
    data(){
        return{
            perPage: 10,
            currentPage: 1,
            headVariant: 'dark',
            fixed: true,
            bordered: true,
            sortBy: 'Row',
            sortDesc: true,
            fields: [{key:'Row'},{key:'id'},'name','email',{ key: 'see', label: "information" }],
            items:null
        }
    },
    computed: {
      rows() {
        return this.items.length
      }
    },
    methods:{
        fetchData(){
        const token =  this.$store.state.store_token
            axios
                .post("http://localhost:3020/fetchUserForAdmin", {
                },{
                    headers: {
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })
                .then(response => {
                    if(response.data.success == "success"){
                        this.items = response.data.message
                    }
                })
        },
        seeInfo(data){
            console.log(data)
        const token =  this.$store.state.store_token
            axios
                .post("http://localhost:3020/fetchByIdForAdmin",{
                    id:data
                },{
                    headers: {
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })
                .then(response => {
                    if(response.data.success == "success"){
                        this.items = response.data.message
                        this.fields = [{key:'Row'},{key:'id'},'name',
                                       'date','time','clientName','partner',
                                        'matterCode','descriptions',{key:'timestamp', 
                                        sortable: true} ]
                        this.sortBy = 'timestamp'
                        console.log(this.items)
                        // this.$router.push("/FetchIndexByIdForAdmin")
                    }
                })
        }
    },
    beforeMount(){
        this.fetchData()
    }
}
</script>
<style scoped>

</style>
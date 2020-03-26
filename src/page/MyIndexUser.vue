<template>
    <div>
        <b-container>
            <br/>
            <br/>
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
            perPage: 20,
            currentPage: 1,
            headVariant: 'dark',
            fixed: true,
            bordered: true,
            sortBy: 'timestamp',
            sortDesc: true,
            // :sticky-header="stickyHeader"
            // :no-border-collapse="noCollapse"
            // stickyHeader: true,
            // noCollapse: true,
            fields: [{key:'Row', sortable: false},'name',
            'date','time','clientName','partner',
            'matterCode','descriptions',{key:'timestamp', sortable: true}],
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
                .post("http://localhost:3020/fetchworkByIdForUser", {
                    userId:this.$store.state.store_userId
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
        }

    },
    beforeMount(){
        this.fetchData()
    }
    
}
</script>
<style scoped>

</style>
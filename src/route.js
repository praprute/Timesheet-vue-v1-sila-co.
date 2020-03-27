import login from './page/login.vue'
import Menu from './components/Menubar.vue'
import UserWork from './page/MyIndexUser.vue'
import RegisIndex from './page/RegisIndex.vue'
import FetchAllForAdmin from './page/FetchallForAdmin.vue'
import FetchAllUserForAdmin from './page/FetchAllUserForAdmin.vue'
import FetchIndexByIdForAdmin from './page/FetchIndexBYidForAdmin.vue'
import Daily from './page/DailyWork.vue'

export const routes = [{
    path: "/",
    component: login
    },{
        path:"/main",
        component:Menu,
        children:[{
            path:"/UserWork",
            component:UserWork
        },{
            path:"/RegisIndex",
            component:RegisIndex
        },{
            path:"/FetchAllForAdmin",
            component:FetchAllForAdmin
        },{
            path:"/FetchAllUserForAdmin",
            component:FetchAllUserForAdmin
        },{
            path:"/FetchIndexByIdForAdmin",
            component:FetchIndexByIdForAdmin
        },{
            path:"/Daily",
            component:Daily
        }]
    }
]
import login from './page/login.vue'
import Menu from './Menu/Menubar.vue'
import UserWork from './page/MyIndexUser.vue'
import RegisIndex from './page/RegisIndex.vue'
import FetchAllForAdmin from './page/FetchallForAdmin.vue'
import FetchAllUserForAdmin from './page/FetchAllUserForAdmin.vue'
import FetchIndexByIdForAdmin from './page/FetchIndexBYidForAdmin.vue'
import Daily from './page/DailyWork.vue'
import Option from './page/Option.vue'
import Division from './page/DivisionPartner.vue'
import registerUser from './page/RegisterUser.vue'

export const routes = [{
    path: "/",
    component: login,
    meta:{title: 'login'}
    },
    {
    path:"/register",
    component: registerUser,
    meta:{title: 'register'}
    },
    {
        path:"/main",
        component:Menu,
        children:[{
            path:"/UserWork",
            component:UserWork,
            meta:{title: 'my work'}
        },{
            path:"/RegisIndex",
            component:RegisIndex,
            meta:{title: 'add information'}
        },{
            path:"/FetchAllForAdmin",
            component:FetchAllForAdmin,
            meta:{title: 'all period'}
        },{
            path:"/FetchAllUserForAdmin",
            component:FetchAllUserForAdmin,
            meta:{title: 'member all'}
        },{
            path:"/FetchIndexByIdForAdmin",
            component:FetchIndexByIdForAdmin,
            meta:{title: 'information by id'}
        },{
            path:"/Daily",
            component:Daily,
            meta:{title: 'daily'}
        },{
            path:"/Options",
            component:Option,
            meta:{title: 'selected period'}
        },{
            path:"/Division",
            component:Division,
            meta:{title: 'division'} 
        }]
    }
]
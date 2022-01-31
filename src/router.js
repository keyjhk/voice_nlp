import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 定义顶层路由对象
import Frame from "@/views/Frame";
import JoinExam from "@/views/JoinExam";
import SimulExam from "@/views/SimulExam";
import Test from "@/views/Test";
import Navigation from "@/views/Navigation";
import AnswerIndex from "@/views/AnswerIndex";
import Login from "@/views/Login";


const routes = [
    {path: '', redirect: '/login'},
    {path: '/login', component: Login, name: 'login'},
    {path: '/answer_index/', component: AnswerIndex,
        name: 'answer_index', meta:{title:'答题人员首页'}},
    {
        path: "/", component: Frame,
        children: [

            {path: 'navigation/', component: Navigation, name: 'navigation',
                meta:{title:'导航'}},
            {path: 'join_exam/', component: JoinExam,
                name: 'join_exam', meta:{title:'参加考试'}},
            {path: 'simul_exam/', component: SimulExam,
                name: 'simul_exam', meta:{title:'模拟练习'}},
            {path: 'test/', component: Test, name: 'test', meta:{title:'test'}},
        ],
    },

]


const router = new VueRouter({
    routes: routes
});

export default router
export {routes}

import Vue from 'vue'
import VueRouter from 'vue-router'

//申明使用插件
Vue.use(VueRouter)

import App from './App.vue'
// 定义顶层路由对象
import ExerciseSimulation from "@/views/ExerciseSimulation";
import Test from "@/views/Test";
import Navigation from "@/views/Navigation";
import AnswerIndex from "@/views/AnswerIndex";
import Login from "@/views/Login";

const routes = [
    {
        path: "/", name: "app",
        component: App,
        children: [
            {path: '', component: Login},  // default
            {path: 'navigation/', component: Navigation, name: 'navigation'},
            {
                path: 'exercise_simulation/', component: ExerciseSimulation, name: 'exercise_simulation',
            },
            {path: 'answer_index/', component: AnswerIndex, name: 'answer_index'},
            {path: 'login/', component: Login, name: 'login'},
            {path: 'test/', component: Test, name: 'test'},
        ],
    },

]


const router = new VueRouter({
    routes: routes
});

export default router
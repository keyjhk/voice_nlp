<template>
    <div >
        <ul>
            <li><router-link :to="{name:'exercise_simulation'}">模拟练习</router-link></li>
            <li> <router-link :to="{name:'test'}">test</router-link></li>
            <li> <router-link :to="{name:'answer_index'}">答题人员首页</router-link></li>
            <li> <router-link :to="{name:'login'}">登录窗口</router-link></li>
        </ul>

    </div>
</template>

<script>
    // import {routes} from '../router'
    export default {
        name: "Navigation",
        data:function () {
            return {

            }
        }
    }
</script>

<style scoped>

</style>

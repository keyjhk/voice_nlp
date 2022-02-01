<template>
    <el-container>
        <el-header class="header">
            <div class="title">{{$route.meta.title?$route.meta.title:'页面标题'}}</div>
            <div class="border"></div>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
        <el-footer>
            <el-row class="footer">
                <div>Copyright © http://www.chinatelecom.com.cn/, All Rights Reserved.</div>
                <div>电信服务人员培训成果考评系统</div>
            </el-row>
        </el-footer>
    </el-container>
</template>

<script>
    export default {
        name: "Frame"
    }
</script>

<style scoped lang="scss">
    * {
        font-size: 12px;
    }

    .border {
        background-color: rgba(233, 233, 233, 1);
        height: 2px;
    }

    .header {
        height: 50px;
        margin-top: 20px;

        .title {
            padding: 2px 2px 2px 10px;
            margin-bottom: 10px;
            border-left: 4px solid rgba(0, 121, 254, 1);
            line-height: 16px;

        }
    }

    .footer {
        height: 100px;
        text-align: center;
    }
</style>

<template>
  <div id="app">
      <router-view></router-view>
  </div>


</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style lang="scss">
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

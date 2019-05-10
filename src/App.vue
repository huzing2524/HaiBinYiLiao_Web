<template lang="pug">
  #app.full_box
    router-view(v-doc-title="$route.meta.title")
</template>
<style lang="stylus">
  @import "//at.alicdn.com/t/font_1106502_s9le5rfkr0d.css"
  #app
    width 100%
    height 100%
    background #E6EAED
</style>

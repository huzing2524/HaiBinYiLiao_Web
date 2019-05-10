<template lang="pug">
    .treatment-list
      .item(v-for="(item,index) in treatmentListItem" :key="index")
        p {{item.body_part}} | {{item.count}}人 ({{item.percent}})
        .progress
          .active(:style="{width: item.percent}")
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: ['treatmentListItem'],
    mounted() {

    }
  }
</script>

<style scoped lang="stylus">
  .treatment-list
    display flex
    flex-direction column
    padding 0 10px
    .item
      display flex
      flex-direction column
      p
        font-size 14px
        color #808080
        margin-top 20px
      .progress
        width 100%
        height 6px
        border-radius 4px
        background #D8D8D8
        margin-top 10px
        .active
          height 100%
          border-radius 4px
          background #19CAAD
</style>

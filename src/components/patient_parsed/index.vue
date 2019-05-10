<template lang="pug">
  .patient_parsed(v-if="analysisListItem")
    .sex_ratio
      .male(:style="{width: (parseFloat(analysisListItem.male/(analysisListItem.male + analysisListItem.female))*100).toFixed(2)+ '%'}") 男 {{analysisListItem.male}}人
      .female 女 {{analysisListItem.female}}人
    .age_ratio_list
      .item(v-for="(item,index) in analysisListItem.age_stage" :key="index")
        p {{item.stage | AgeState}} | {{item.count}}人 ({{item.percent}})
        .progress
          .active(:style="{width: item.percent}")
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: ['analysisListItem'],
    mounted() {

    }
  }
</script>

<style lang="stylus" scoped>
  .patient_parsed
    padding 20px 16px

    .sex_ratio
      background #FF6877
      height 40px
      border-radius 6px
      overflow hidden
      font-size 15px
      color #FFF
      display flex
      align-items center

      .male
        height 100%
        background #3EB7FF
        display flex
        align-items center
        padding-left 10px
        min-width 55px

      .female
        margin-left 10px
        min-width 55px

    .age_ratio_list
      .item
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

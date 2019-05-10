<template lang="pug">
  .used-rank.full_box
    .main
      .tab
        calendarTab
      .rank
        .rank-card
          UsedRank
        .rank-item
          .rank-item-left
            .rank-num 4
            .rank-info
              img(src="./frequency.png")
              span 深圳同心医院
          .rank-item-right 863次
        .rank-item
          .rank-item-left
            .rank-num 4
            .rank-info
              img(src="./frequency.png")
              span 深圳同心医院
          .rank-item-right 863次
        .rank-item
          .rank-item-left
            .rank-num 4
            .rank-info
              img(src="./frequency.png")
              span 深圳同心医院
          .rank-item-right 863次
</template>

<script>
  import UsedRank from '_components/used_rank'
  import calendarTab from '_components/calendar_tab'
  export default {
    data() {
      return {

      }
    },
    components: {
      UsedRank,
      calendarTab,
    },
    methods: {

    }
  }
</script>

<style scoped lang="stylus">
  .used-rank
    .main
      display flex
      flex-direction column
      .tab
        display flex
        flex-direction column
        background #ffffff
        margin-bottom 10px
      .rank
        display flex
        flex-direction column
        padding 0 10px
        .rank-card
          background #ffffff
          border-radius 8px
        .rank-item
          display flex
          flex-direction row
          background #ffffff
          padding 12px 20px
          margin-top 10px
          box-shadow 0px 0px 8px 0px rgba(182,205,214,0.79)
          border-radius 8px
          justify-content space-between
          align-items center
          .rank-item-left
            display flex
            flex-direction row
            align-items center
            .rank-num
              font-size 22px
              font-weight 500
              color #545454
              margin-right 20px
            .rank-info
              display flex
              flex-direction row
              align-items center
              img
                width 44px
                height 44px
                margin-right 10px
              span
                width 160px
                font-size 14px
                color #545454
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
          .rank-item-right
            font-size 16px
            font-weight 500
            color #FF9D48
</style>

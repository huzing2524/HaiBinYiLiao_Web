<template lang="pug">
    .used-rank-card.full_box(v-if="rankListItem")
      .card-content
        .card-content-item
          span {{rankListItem[1]?rankListItem[1].count:'-'}}{{type==='patient'?'人':'次'}}
          .item-rank
            .icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_silver")
            p 银牌
        .card-content-item.gold
          span {{rankListItem[0]?rankListItem[0].count:'-'}}{{type==='patient'?'人':'次'}}
          .item-rank
            .icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_gold")
            p 金牌
        .card-content-item
          span {{rankListItem[2]?rankListItem[2].count:'-'}}{{type==='patient'?'人':'次'}}
          .item-rank
            .icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_copper")
            p 铜牌
      .card-bottom
        .card-bottom-item.bottom
          img(v-if="rankListItem[1] && rankListItem[1].image", :src="rankListItem[1].image")
          img(src="./icon_hospital.png", v-else )
          p {{rankListItem[1]?rankListItem[1].name || rankListItem[1].name:'-'}}
        .card-bottom-item
          img(v-if="rankListItem[0] && rankListItem[0].image", :src="rankListItem[0].image")
          img(src="./icon_hospital.png", v-else )
          p {{rankListItem[0]?rankListItem[0].name || rankListItem[0].name:'-'}}
        .card-bottom-item.bottom
          img(v-if="rankListItem[2] && rankListItem[2].image", :src="rankListItem[2].image")
          img(src="./icon_hospital.png", v-else )
          p {{rankListItem[2]?rankListItem[2].name || rankListItem[2].name:'-'}}
</template>

<script>
  export default {
    name:'UseRank',
    data() {
      return {

      }
    },
    props: ['rankListItem','type'],
    mounted(){

    }
  }
</script>

<style scoped lang="stylus">
    .used-rank-card
      display flex
      flex-direction column
      .card-content
        display flex
        flex-direction row
        padding 20px 16px 20px 16px
        .card-content-item
          flex 1
          display flex
          flex-direction column
          align-items center
          span
            font-size 16px
            font-weight 500
            color #FF9D48
            margin-bottom 10px
          .item-rank
            display flex
            flex-direction row
            align-items center
            .icon
              width 18px
              height 24px
              margin-right 6px
            p
              font-size 14px
              color #545454
        .gold
          position relative
          &:before
            content:''
            position absolute
            left 0
            top 50%
            margin-top -16px
            width 2px
            height 32px
            background #E3ECF0
          &:after
            content:''
            position absolute
            right 0
            top 50%
            margin-top -16px
            width 2px
            height 32px
            background #E3ECF0
      .card-bottom
        display flex
        flex-direction row
        justify-content space-around
        padding 0 16px 20px 16px
        .card-bottom-item
          display flex
          flex-direction column
          align-items center
          img
            width 58px
            height 58px
            margin-bottom 10px
          p
            width 74px
            font-size 14px
            text-align center
            color #545454
            flex-wrap nowrap
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
        .bottom
          margin-top 29px
</style>

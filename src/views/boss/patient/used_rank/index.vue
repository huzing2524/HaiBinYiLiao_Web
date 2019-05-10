<template lang="pug">
  .used-rank.full_box
    .main
      .tab
        calendarTab(@dataTypeClick="getRankData")
      .rank
        .rank-card
          UsedRank(:rankListItem="rankListItem" type="patient")
        .rank-item(v-for="(item,index) in listItem" :key="index")
          .rank-item-left
            .rank-num {{index+4}}
            .rank-info
              img(v-if="item.image" :src="item.image")
              img(src="./frequency.png" v-else)
              span {{item.hospital_name}}
          .rank-item-right {{item.count}}人

</template>

<script>
  import { HbDoctorRank } from '_api/doctor'
  import UsedRank from '_components/used_rank'
  import calendarTab from '_components/calendar_tab'
  export default {
    data() {
      return {
        id:"",
        device_id:'',
        hospital_id :'',
        type:'daily',
        rankListItem:[],
        listItem:[],
      }
    },
    components: {
      UsedRank,
      calendarTab,
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData(){
        this.device_id = this.$route.query.device_id || ''
        this.hospital_id  = this.$route.query.hospital_id  || ''
        HbDoctorRank({
          type: this.type,
        },'get',this.device_id?this.device_id:'all',this.hospital_id?this.hospital_id:'all').then((res) => {
          if(res.data.length<=3){
            this.rankListItem = res.data
            this.listItem = []
          }else {
            this.rankListItem = res.data.slice(0,3)
            this.listItem = res.data.slice(3)
          }
        }).catch(() => {
          this.$createToast({
            txt: '获取数据失败',
            type: 'txt'
          }).show()
        })
      },
      getRankData(type){
        this.rankListItem = [],
        this.listItem = [],
          HbDoctorRank({
          type: type
        },'get',this.device_id?this.device_id:'all',this.hospital_id?this.hospital_id:'all').then((res) => {
          if(res.data.length<=3){
            this.rankListItem = res.data
            this.listItem = []
          }else {
            this.rankListItem = res.data.slice(0,3)
            this.listItem = res.data.slice(3)
          }
        }).catch(() => {
          this.$createToast({
            txt: '获取数据失败',
            type: 'txt'
          }).show()
        })
      }
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
          padding 12px 20px 12px 0
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
              width 55px
              font-size 22px
              font-weight 500
              color #545454
              text-align center
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

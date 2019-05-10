<template lang="pug">
  .doctor-select(v-if="isLoad")
    .doctor-select-list
      .list-top
        span {{doctorsListItem.hospital_name}}
        p 已有{{doctorsListItem.count}}位医生
      .list-content
        .list-item(v-for="(item,index) in listItem" :key="index" @click="confirmClick(item,index)")
          .list-item-left
            img(:src="item.image")
            .list-info
              span {{item.name?item.name:item.phone}}
              p {{item.phone}}
          .list-item-right
            .icon(v-if="item.isSelected")
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconxuanzhong")
            span(v-else)
      .list-button
        button(@click="saveClick") 确定 ({{addListItem.length}})
</template>

<script>
  import {HbDoctorsList} from '_api/boss'
  import {mapState, mapActions} from 'vuex'
  export default {
    data() {
      return {
        isLoad: false,
        doctorsListItem:{},
        listItem:[],
        addListItem:[]
      }
    },
    computed: {
      ...mapState({
        storeData: state => state.storeData
      }),
    },
    mounted() {
      this.initData()
    },
    methods: {
      ...mapActions([
        'STORE_DATA'
      ]),
      initData(){
        this.doctorsListItem = this.storeData.doctorsListItem
        if(!this.doctorsListItem.hospital_name){
          this.$router.replace(`/boss/doctor/hospital/select`)
        }
        let type = 'none'
        HbDoctorsList({hospital_id:type},'get').then((res) => {
          this.listItem = res.data
          this.isLoad = true
        }).catch(() =>{
          this.$createToast({
            txt: '获取数据失败',
            type: 'txt'
          }).show()
        })
      },
      confirmClick(item,index){
        if(item.isSelected){
          this.$set(this.listItem, index, Object.assign(item, {isSelected: false}))
          this.addListItem.forEach((items,indexs)=> {
            if(items.phone === item.phone){
              this.addListItem.splice(indexs,1)
            }
          })
        }else {
          this.$set(this.listItem, index, Object.assign(item, {isSelected: true}))
          this.addListItem.push(item)
        }
      },
      saveClick(){
        let arr = []
        this.addListItem.forEach((item) => {
          arr.push(item.phone)
        })
        if(this.addListItem.length === 0){
          this.$createToast({
            txt: '请至少选择一位医生',
            type: 'txt'
          }).show()
          return
        }
        let count = parseInt(this.doctorsListItem.count) + parseInt(this.addListItem.length)
        this.STORE_DATA({
          doctorsListItem: {
            'hospital_id': this.doctorsListItem.hospital_id,
            'hospital_name': this.doctorsListItem.hospital_name,
            'count': '' + count,
            'addListItem': arr
          }
        })
        this.$router.replace(`/boss/doctor/success`)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .doctor-select
    width 100%
    height 100%
    background #E6EAED
    padding-bottom 64px
    overflow-y scroll
    .list-top
      height 147px
      display flex
      flex-direction column
      align-items center
      font-size 16px
      color #ffffff
      background #3A3A3A
      padding-top 30px
      margin-bottom -51px
      border-radius 0px 0px 12px 12px
      span
        font-size 16px
        margin-bottom 8px
      p
        font-size 12px
    .list-content
      display flex
      flex-direction column
      padding 0 10px
      .list-item
        display flex
        flex-direction row
        background #ffffff
        padding 21px 20px 21px 16px
        margin-bottom 10px
        border-radius 8px
        justify-content space-between
        align-items center
        .list-item-left
          display flex
          flex-direction row
          align-items center
          img
            width 40px
            height 40px
            margin-right 12px
          .list-info
            display flex
            flex-direction column
            span
              font-size 14px
              font-weight 500
              color #545454
              margin-bottom 6px
            p
              font-size 12px
              color #999999
        .list-item-right
          display flex
          span
            width 18px
            height 18px
            background #E6EAED
            border-radius 18px
          .icon
            width 22px
            height 22px
    .list-button
      display flex
      width 100%
      height 64px
      position fixed
      bottom 0
      padding 12px 20px
      background #ffffff
      justify-content flex-end
      button
        width 120px
        height 40px
        line-height 40px
        font-size 16px
        color #ffffff
        background #4690F9
        text-align center
        border-radius 20px
</style>

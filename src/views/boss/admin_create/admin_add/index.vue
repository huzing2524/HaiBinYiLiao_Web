<template lang="pug">
  .admin-select(v-if="isLoad")
    .admin-select-list
      .list-content
        .list-item(v-for="(item,index) in listItem", :key="index", @click="confirmClick(item,index)")
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
        button(@click="createClick") 确定 ({{managerList.length}})
</template>

<script>
  import {HbUserList,HbManager} from "_api/boss"

  export default {
    data() {
      return {
        isLoad:false,
        isSelected:false,
        listItem:[],
        managerList:[]
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData(){
        HbUserList().then((res) => {
          this.listItem = res.data
          this.isLoad =true
        }).catch(() => {
          this.$createToast({
            txt: '获取数据失败',
            type: 'txt'
          }).show()
        })
      },
      confirmClick(item,index){
        if(item.isSelected){
          this.$set(this.listItem, index, Object.assign(item, {isSelected: false}))
          this.managerList.forEach((items,indexs)=> {
            if(items.phone === item.phone){
              this.managerList.splice(indexs,1)
            }
          })
        }else {
          this.$set(this.listItem, index, Object.assign(item, {isSelected: true}))
          this.managerList.push(item)
        }
      },
      createClick(){
        let arr = []
        this.managerList.forEach((item) => {
          arr.push(item.phone)
        })
        if(this.managerList.length === 0){
          this.$createToast({
            txt: '请至少选择一位管理员',
            type: 'txt'
          }).show()
          return
        }
        HbManager({manager_list:arr},'post').then((res) => {
          if(parseInt(res.data.res) === 0){
            this.$createToast({
              txt: '提交成功',
              type: 'txt'
            }).show()
            this.$router.push(`/boss/admin`)
          }else {
            this.$createToast({
              txt: res.data.errmsg,
              type: 'txt'
            }).show()
          }
        }).catch(() => {
          this.$createToast({
            txt: '提交失败',
            type: 'txt'
          }).show()
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  .admin-select
    width 100%
    height 100%
    background #E6EAED
    padding 10px 0 64px 0
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
        margin-bottom 4px
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

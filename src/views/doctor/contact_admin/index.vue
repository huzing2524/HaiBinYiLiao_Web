<template lang="pug">
  .contact_admin.full_box
    .item(v-for="(item, idx) in manager" :key="idx")
      .avatar
        img(:src="item.image")
      .admin_info
        p {{item.name}}
        p {{item.phone}}
      .icon(@click="phoneCall(item.phone)")
        svg.ali_icon(aria-hidden="true")
          use(xlink:href="#iconicon_phone_")
</template>

<script>
  import {DoctorManger} from '_api/doctor/'

  export default {
    data() {
      return {
        manager: []
      }
    },
    mounted() {
      this.getDoctorManger()
    },
    methods: {
      getDoctorManger() {
        DoctorManger().then(res => {
          this.manager = res.data.manager
        })
      },
      phoneCall(phone) {
        window.location.href = `tel://${phone}`
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .contact_admin
    padding-top 15px

    .item
      display flex
      align-items center
      background #FFF
      padding 15px 20px

      .avatar
        width 46px
        height 46px
        border-radius 4px
        background deepskyblue

        img
          width 100%
          height 100%

      .admin_info
        flex 1
        height 46px
        margin-left 12px
        display flex
        flex-direction column
        justify-content space-around

        p
          &:nth-of-type(1)
            font-size 14px
            color #545454

          &:nth-of-type(2)
            font-size 12px
            color #999

      .icon
        width 36px
        height 36px
</style>

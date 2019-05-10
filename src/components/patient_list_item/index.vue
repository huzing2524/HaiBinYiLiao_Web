<template lang="pug">
  .patient_list_item
    .item(v-for="(item,index) in patientListItem" :key="index" @click="toNext(item)")
      .header
        .avatar
          img(src="./male.png" v-if="item.gender == 0")
          img(src="./female.png" v-else)
        .name_sex
          p {{item.name?item.name:'-'}}
          p
            span.age(v-if="item.age") {{item.age}}岁
            span.male(v-show="item.gender && item.gender==='0'") 男
            span.female(v-show="item.gender && item.gender==='1'") 女
      .treatment_info
        .part
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_part")
          p
            span {{item.treatment_part?item.treatment_part:'暂无'}}
        .part
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_hospital_")
          p {{item.hospital}}
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    data() {
      return {}
    },
    props:['patientListItem','type'],
    mounted() {
        this.filterTreatmentPart()
    },
    watch: {
      patientListItem(){
        this.filterTreatmentPart()
      }
    },
    methods: {
      ...mapActions([
        'STORE_DATA'
      ]),
      filterTreatmentPart(){
        this.patientListItem.forEach((item) => {
          item.treatment_part = item.treatment_part.join('、')
        })
      },
      toNext(item){
        let type = this.$route.query.type || ''
        if(type === 'add'){
          this.STORE_DATA({
            patientListItem: item
          })
          this.$router.push(`/doctor/add_treatment_record`)
        }else{
          if(this.type === 'hospital'){
            this.$router.push(`/boss/patient/patient_detail?id=${item.id}`)
          }
          if(this.type === 'doctor'){
            this.$router.push(`/doctor/patient_detail?id=${item.id}`)
          }
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .patient_list_item
    padding 10px
    >.item
      border-radius 8px
      margin-bottom 10px
      overflow hidden
      margin-bottom 10px
      .header
        padding 15px
        background #F4FAFF
        display flex
        .avatar
          width 52px
          height 52px
          border-radius 8px
          img
            width 100%
            height 100%
        .name_sex
          margin-left 10px
          height 52px
          display flex
          flex-direction column
          justify-content space-between
          p
            &:nth-of-type(1)
              color #545454
              font-size 16px
            &:nth-of-type(2)
              font-size 12px
              span
                padding 1px 12px
                border-radius 4px
                margin-right 12px
                background #FFF
                &.age
                  color #CC9900
                  border 1px solid #CC9900
                &.male
                  color #199ED7
                  border 1px solid #199ED7
                &.female
                  color #FE6773
                  border 1px solid #FE6773
      .treatment_info
        background #FFF
        padding 15px 15px 1px
        .part
          display flex
          align-items center
          margin-bottom 15px
          font-size 14px
          color #545454
          .icon
            width 20px
            height 20px
            margin-right 10px
          p
            flex 1
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
</style>

<template lang="pug">
  .add_treatment_record
    .record_card(v-show="recordsItem.length", v-for="(item,index) in recordsItem", readonly, :key="index")
      .card_top
        span {{item.name}}上次的治疗信息
        .treatment_info(v-for="(items,indexs) in item.treatment_detail" :key="indexs")
          p {{items.treatment_part}}
            span 治疗档位：{{items.treatment_gear}}
            span 脉冲次数：{{items.treatment_pulse}}
        .tips {{item.remark}}
      .card_bottom(@click="copyClick") 复制到以下输入框
    .record_item(v-for="(item, idx) in listItem.treatments" :key="item.idx")
      .input_box
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_part")
        input(placeholder="填写治疗部位" v-model="item.treatment_part")
      .input_box
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_danwei")
        input(placeholder="填写治疗档位" v-model="item.treatment_gear")
      .input_box
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_cishu")
        input(placeholder="填写脉冲次数" v-model="item.treatment_pulse")
      .remove_btn(@click="removeIdx(idx)")
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#icondelete")
    .add_record(@click="addRecord")
      .icon
        svg.ali_icon(aria-hidden="true")
          use(xlink:href="#iconicon_add")
      p 添加治疗部位
    .remark
      input(placeholder="填备注（选填）" v-model="listItem.remark")
    .next_box
      .btn(@click="toNext") 下一步
</template>

<script>
  import {HbDoctorTreatmentRecords} from '_api/doctor'
  import {mapState,mapActions} from 'vuex'
  export default {
    data() {
      return {
        listItem:{
          treatments: [
            {
              treatment_part: '',
              treatment_gear: '',
              treatment_pulse: ''
            }
          ],
          remark: '',
        },
        patientListItem:{
          id:'',
        },
        recordsItem:{},
      }
    },
    computed: {
      ...mapState({
        storeData: state => state.storeData
      }),
    },
    mounted(){
      this.initData()
    },
    methods: {
      ...mapActions([
        'STORE_DATA'
      ]),
      initData(){
        this.getHbDoctorTreatmentRecords()
      },
      getHbDoctorTreatmentRecords(){
        HbDoctorTreatmentRecords({id:this.patientListItem.id},'get').then((res) => {
          this.recordsItem = res.data
        }).catch(() => {
          this.$createToast({
            txt: '获取数据失败',
            type: 'txt'
          }).show()
        })
      },
      addRecord() {
        this.listItem.treatments.push({
          treatment_part: '',
          treatment_gear: '',
          treatment_pulse: ''
        })
      },
      removeIdx(idx) {
        this.listItem.treatments.splice(idx, 1)
      },
      copyClick(){
        this.recordsItem.forEach((item) => {
          this.listItem.treatments = item.treatment_detail
        })
        this.getHbDoctorTreatmentRecords()
      },
      toNext(){
        if(this.listItem.treatments.length<=0){
          this.$createToast({
            txt: '请完善信息再提交',
            type: 'txt'
          }).show()
          return
        }
        let arr = this.listItem.treatments
        let flag = 0
        let reg = /^[0-9]*$/
        for (let i = 0; i < arr.length; i++){
          if(arr[i].treatment_part !== '' && arr[i].treatment_gear !== '' && arr[i].treatment_pulse !== '' && reg.test(arr[i].treatment_gear) && reg.test(arr[i].treatment_pulse)){
            flag++
          }
        }
        if(flag === arr.length){
          this.STORE_DATA({
            treatmentListItem:{
              id:this.patientListItem.id,
              name:this.patientListItem.name,
              hospital_id:this.patientListItem.hospital_id,
              treatments: this.listItem.treatments,
              remark: this.listItem.remark,
            }
          })
          this.$router.push(`/doctor/add_treatment_record/device_select`)
        }else {
          this.$createToast({
            txt: '请填写正确的治疗信息',
            type: 'txt'
          }).show()
          return
        }
      }
    },
    created(){
      this.patientListItem = this.storeData.patientListItem || {}
      if(!this.patientListItem.id){
        this.$router.replace(`/doctor/patient_list?type=add`)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .add_treatment_record
    padding 15px 10px 64px
    .record_card
      display flex
      flex-direction column
      background #ffffff
      border-radius 8px
      margin-bottom 20px
      .card_top
        display flex
        flex-direction column
        padding 20px 0 30px 20px
        border-bottom 1px solid #E4E4E4
        span
          font-size 15px
          font-weight 500
          color #545454
          margin-bottom 20px
        .treatment_info
          display flex
          flex-direction row
          p
            font-size 14px
            color #545454
            margin-bottom 20px
            span
              font-size 12px
              color #5D535E
              padding 2px 10px
              border 1px solid #5D535E
              margin-right 10px
              border-radius 4px
              &:nth-of-type(1)
                margin-left 20px
        .tips
          font-size 12px
          color #30CBA6
      .card_bottom
        display flex
        flex-direction row
        justify-content center
        font-size 15px
        color #568CEA
        padding 15px 0
    .record_item
      position relative
      background #FFF
      border-radius 8px
      margin-bottom 10px
      .input_box
        padding 15px 0 15px 16px
        display flex
        font-size 14px
        .icon
          width 22px
          height 22px
        input
          padding 0 22px
          color #545454
          &::placeholder
            color #999
      .remove_btn
        position absolute
        right -5px
        top -5px
        .icon
          width 22px
          height 22px
    .add_record
      padding 12px 0
      display flex
      align-items center
      justify-content center
      color #568CEA
      font-size 14px
      border-radius 8px
      margin-bottom 10px
      background #FFF
      .icon
        width 24px
        height 24px
        margin-right 10px
    .remark
      font-size 14px
      height 48px
      background #FFF
      padding 0 16px
      margin-bottom 10px
      border-radius 8px
      input
        height 100%
        color #545454
        &::placeholder
          color #999
    .next_box
      width 100%
      height 64px
      padding 20px
      background #FFF
      position fixed
      bottom 0
      left 0
      display flex
      align-items center
      justify-content flex-end
      .btn
        width 110px
        height 40px
        border-radius 20px
        color #FFF
        font-size 16px
        background #4690F9
        display flex
        align-items center
        justify-content center
</style>

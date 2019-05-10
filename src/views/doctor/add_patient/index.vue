<template lang="pug">
  .add_patient.full_box
    .item.mg_b
      .input_box
        p 治疗设备
        p 体外冲击波治疗仪
    .item.mg_b
      .input_box.bd_b
        p 姓名
        input(type="text" placeholder="填写姓名" v-model="listItem.patient_name")
      .input_box.bd_b
        p 性别
        p
          span(:class="selectedIndex===0?'active':'' || listItem.gender==='0'?'active':''", @click="confirmGender('0'),selectedIndex=0") 男
          span(:class="selectedIndex===1?'active':'' || listItem.gender==='1'?'active':''", @click="confirmGender('1'),selectedIndex=1") 女
      .input_box.bd_b(@click="showDatePicker")
        p 出生年月
        input(type="text" readonly placeholder="选择年龄" v-model="listItem.birthday")
        img.right(src="./arrow_select.png")
      .input_box
        p 联系电话
        input(type="tel" placeholder="填写电话" v-model="listItem.phone")
    .item.mg_b
      .input_box.bd_b(@click="showAddressPicker")
        p 患者地址
        input(type="text" readonly placeholder="选择地址" v-model="listItem.region")
        img.right(src="./arrow_select.png")
      .input_box
        p 详细地址
        input(type="text" placeholder="填写详细地址" v-model="listItem.address")
    .item.mg_b
      .input_box.bd_b
        p 病史
        input(type="text" placeholder="填写填写病史" v-model="listItem.medical_history")
      .input_box.bd_b
        p 保健前评估
        input(type="text" placeholder="填写保健前评估" v-model="listItem.before_healthcare")
      .input_box
        p 保健后评估（选填）
        input(type="text" placeholder="可在保健后填写" v-model="listItem.after_healthcare")
    .item.mg_b
      .input_box
        p 备注
        input(type="text" placeholder="填写备注" v-model="listItem.remark")
    .sub_box
      .sub_btn(@click="toSaveClick") 保存
</template>

<script>
  import { provinceList, cityList, areaList } from '_utils/area'
  import {mapState,mapActions} from 'vuex'
  const addressData = provinceList
  addressData.forEach(province => {
    province.children = cityList[province.value]
    province.children.forEach(city => {
      city.children = areaList[city.value]
    })
  })
  export default {
    data() {
      return {
        selectedIndex: 0,
        listItem:{
          gender:'0',
        },
        clearable:{
          visible: true,
          blurHidden: false
        },
      }
    },
    computed: {
      ...mapState({
        phoneReg: state => state.phoneReg,
      })
    },
    mounted(){
      this.addressPicker = this.$createCascadePicker({
        title: '选择地址',
        data: addressData,
        onSelect: this.selectHandle,
        onCancel: this.cancelHandle
      })
    },
    methods: {
      ...mapActions([
        'STORE_DATA'
      ]),
      showDatePicker() {
        if (!this.datePicker) {
          this.datePicker = this.$createDatePicker({
            title: '选择出生年月',
            min: new Date(1800, 7, 8),
            // max: new Date(2020, 9, 20),
            value: new Date(),
            onSelect: this.selectDataHandle,
            onCancel: this.cancelDataHandle
          })
        }

        this.datePicker.show()
      },
      selectDataHandle(date, selectedVal, selectedText) {
        this.selectedText = selectedText.join('-')
        this.listItem = {...this.listItem,birthday:this.selectedText}
      },
      cancelDataHandle() {

      },
      showAddressPicker(){
        this.addressPicker.show()
      },
      selectHandle(selectedVal, selectedIndex, selectedText) {
        this.selectedText = selectedText.join('')
        this.listItem = {...this.listItem,region:this.selectedText}
      },
      cancelHandle() {

      },
      confirmGender(gender){
        this.listItem = {...this.listItem,gender:gender};
      },
      toSaveClick() {
        let {patient_name,gender,birthday,phone,region,address,medical_history,before_healthcare} = this.listItem
        if(!patient_name || !gender || !birthday || !phone || !region || !address || !medical_history || !before_healthcare){
          this.$createToast({
            txt: '请完善信息再提交',
            type: 'txt'
          }).show()
          return
        }
        if (!this.phoneReg.test(this.listItem.phone)) {
          this.$createToast({
            txt: '请输入正确的手机号',
            type: 'txt'
          }).show()
          return false
        }
        this.STORE_DATA({
          patientListItem: this.listItem,
        })
        this.$router.push('/doctor/add_patient/success')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .add_patient
    padding-top 10px
    padding-bottom 64px
    .item
      background #FFF
      font-size 14px
      &.mg_b
        margin-bottom 10px
      .input_box
        padding 16px 0
        display flex
        align-items center
        justify-content space-between
        margin-left 20px
        padding-right 20px
        &.bd_b
          border-bottom 1px solid #E4E4E4
        p
          display flex
          &:nth-of-type(2)
            color #999
          span
            display flex
            align-items center
            justify-content center
            width 52px
            height 20px
            margin-left 10px
            border-radius 4px
            border 1px solid #999999
            &.active
              border 1px solid #199ED7
              color #199ED7
        input
          text-align right
          flex 1
        img
          width 6px
          height 10px
          margin-left 5px
    .sub_box
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
      .sub_btn
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

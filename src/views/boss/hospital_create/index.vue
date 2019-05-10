<template lang="pug">
  .hospital-create
    div(v-doc-title="doctitle")
    .input-form
      .input-form-item
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_hospitalname")
        cube-input(type="text" :clearable="clearable" placeholder="填写医院名称" v-model="listItem.hospital_name")
      .input-form-item
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_contact")
        cube-input(type="text" :clearable="clearable" placeholder="联系人" v-model="listItem.contacts")
      .input-form-item
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#icondianhau")
        cube-input(type="number" :clearable="clearable" placeholder="联系电话" :maxlength="maxlength" v-model="listItem.phone")
    .input-form
      .input-form-item
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_address1")
        cube-input(
        type="text"
        :clearable="clearable"
        placeholder="选择医院地址"
        readonly
        v-model="listItem.region"
        @click.native="showAddressPicker")
        img.right(src="./arrow_select.png")
      .input-form-item
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_detailed")
        cube-input(type="text" :clearable="clearable" placeholder="填写详细地址" v-model="listItem.address")
    .input-button
      button.save(v-show="hospitalStatus==='create'" @click="createClick") 保存
      button.save(v-show="hospitalStatus==='edit'" @click="saveClick") 保存
      button.cancle(@click="showBtn" v-show="hospitalStatus==='edit'") 删除
</template>

<script>
  import {HbHospital} from "_api/boss"
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
        doctitle:'',
        hospital_id:'',
        maxlength:11,
        clearable:{
          visible: true,
          blurHidden: false
        },
        listItem:{},
        hospitalStatus:'',
      }
    },
    computed: {
      ...mapState({
        phoneReg: state => state.phoneReg,
        storeData: state => state.storeData
      })
    },
    mounted(){
      this.initData()
      this.addressPicker = this.$createCascadePicker({
        title: '',
        data: addressData,
        onSelect: this.selectHandle,
        onCancel: this.cancelHandle
      })
    },
    methods: {
      ...mapActions([
        'STORE_DATA'
      ]),
      initData(){
        if (!this.$route.query.from) {
          this.doctitle = '新增医院'
        } else {
          this.doctitle = '编辑医院'
        }
        this.hospitalStatus = this.storeData.hospitalStatus
        this.listItem = this.storeData.hospitalListItem || {}
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
      createClick(){
        let {hospital_name,contacts,phone,region,address} = this.listItem
        if(!hospital_name || !contacts || !phone || !region || !address){
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
          hospitalListItem: this.listItem
        })
        this.$router.push(`/boss/hospital/success`)
      },
      saveClick(){
        let {hospital_name,contacts,phone,region,address} = this.listItem
        if(!hospital_name || !contacts || !phone || !region || !address){
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
        HbHospital({
          'hospital_id': this.listItem.hospital_id,
          'hospital_name': this.listItem.hospital_name,
          'contacts': this.listItem.contacts,
          'phone': this.listItem.phone,
          'region': this.listItem.region,
          'address': this.listItem.address,
        },'put').then((res) => {
          if(parseInt(res.data.res)=== 0){
            this.$createToast({
              txt: '修改成功',
              type: 'txt'
            }).show()
            this.STORE_DATA()
            this.$router.go(-1)
          }else {
            this.$createToast({
              txt: res.data.errmsg,
              type: 'txt'
            }).show()
          }
        }).catch(() => {
          this.$createToast({
            txt: '修改失败',
            type: 'txt'
          }).show()
        })
      },
      showBtn() {
        this.$createDialog({
          type: 'confirm',
          title: '',
          content: '确定删除该医院吗，删除医院对应的患者数据不会被删除',
          confirmBtn: {
            text: '删除',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
            HbHospital({hospital_id: this.listItem.hospital_id},'delete').then((res) => {
              if(parseInt(res.data.res)=== 0){
                this.$createToast({
                  txt: '删除成功',
                  type: 'txt'
                }).show()
                this.STORE_DATA()
                this.$router.go(-2)
              }else {
                this.$createToast({
                  txt: res.data.errmsg,
                  type: 'txt'
                }).show()
              }
            }).catch(() => {
              this.$createToast({
              txt: '删除失败',
              type: 'txt'
            }).show()
            })
          },
          onCancel: () => {

          }
        }).show()
      }
    }
  }
</script>

<style scoped lang="stylus">
  .hospital-create
    width 100%
    height 100%
    background #E6EAED
    padding-top 10px
    .input-form
      display flex
      flex-direction column
      background #ffffff
      padding-left 16px
      margin-bottom 10px
      .input-form-item
        display flex
        flex-direction row
        align-items center
        border-bottom 1px solid #E4E4E4
        padding 5px 0
        &:last-child
          border-bottom 0
        .icon
          width 22px
          height 22px
          margin-right 22px
        .right
          width 8px
          height 14px
          margin-right 20px
    .input-button
      justify-content center
      align-items center
      padding 16px 15px 0 15px
      button
        width 100%
        font-size 16px
        font-weight 500
        padding 13px
        border-radius 24px
        margin-bottom 10px
      .save
        color #ffffff
        background #4690F9
      .cancle
        color #FF5454
        background #ffffff
</style>
<style scoped lang="stylus">
  .hospital-create
    .cube-input
      flex 1
      .cube-input-field
        border 0
        outline 0
      &:after
        border 0
</style>
<style lang="stylus">
  .cube-dialog-content
    margin 30px 0 28px 0
    .cube-dialog-content-def
      padding 0 20px
      p
        margin initial
        font-size 16px
        color #545454
        line-height 24px
  .cube-dialog-btns
    position relative
    &:after
      border-right 0
    a:before
      border-top 0
    a:last-child
      color #FF5454
</style>

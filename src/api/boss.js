/**
 * Created by ll on 19/3/27
 */
import { ArrangeHttpMethod } from '_utils/public'

/*
* 海滨医疗治疗机主页
*/
export function HbMain(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/boss/main/' + (path || '') , params)
}

/*
* 使用次数充值记录
*/
export function HbRechargeList(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/recharge/list/' + (path || '') , params)
}

/*
* 充值记录详情
*/
export function HbRechargeDetail(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/recharge/detail/' + (path || '') , params)
}

/*
* 使用次数充值
*/
export function HbRechargeNew(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/recharge/new/' + (path || '') , params)
}

/*
* 医院列表
*/
export function HbHospitalList(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/hospital/list/' + (path || '') , params)
}

/*
* 获取医院信息/新增医院/修改医院/删除医院
*/
export function HbHospital(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/hospital/' + (path || '') , params)
}

/*
* 绑定设备
*/
export function HbDeviceBinding(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/device/binding/' + (path || '') , params)
}

/*
* 设备列表
*/
export function HbDevicesList(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/devices/list/' + (path || '') , params)
}

/*
* 医生列表
*/
export function HbDoctorsList(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/doctors/list/' + (path || '') , params)
}

/*
* 绑定医生
*/
export function HbDoctorsBinding(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/doctors/binding/' + (path || '') , params)
}

/*
* 非管理员列表
*/
export function HbUserList(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/user/list/' + (path || '') , params)
}

/*
* 管理员列表/添加管理员/删除管理员
*/
export function HbManager(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/manager/' + (path || '') , params)
}

/*
* 设备使用记录/治疗记录
*/
export function HbTreatmentRecords(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/treatment/records/' + (path || '') , params)
}

/*
* 设备总览主页
*/
export function HbDevicesMain(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/devices/main/' + (path || ''), params)
}

/*
* 设备使用统计
*/
export function HbDevicesStats(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/devices/stats/' + (path || ''), params)
}

/*
* 医院使用排行榜
*/
export function HbDevicesHospitalRank(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/device/hospital/rank/' + (path || ''), params)
}


/*
* 医院使用日历统计
*/
export function HbDevicesHospitalCalendar(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/device/hospital/calendar/' + (path || ''), params)
}

/*
* 患者数据分析
*/
export function HbPatientsAnalysis(params, methods, device_id , hospital_id ) {
  return ArrangeHttpMethod(methods)('/hb/patients/analysis/' + (device_id  || '') + '/' + (hospital_id  || '') , params)
}

/*
* 治疗患者日历统计
*/
export function HbPatientCalendar(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/patient/calendar/' + (path || ''), params)
}

/*
* 医生治疗人数排行榜
*/
export function HbDoctorRank(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/doctor/rank/' + (path || ''), params)
}

/*
* 医生治疗患者日历统计
*/
export function HbDoctorCalendar(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/doctor/calendar/' + (path || ''), params)
}

/*
* 单个设备主页/删除设备
*/
export function HbDeviceDetail(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/device/detail/' + (path || ''), params)
}

/*
* 单个设备主页/删除设备
*/
export function HbDeviceDelete(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/device/delete/' + (path || ''), params)
}

/*
* 医院总览主页
*/
export function HbHospitalsMain(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/hospitals/main/' + (path || ''), params)
}

/*
* 医院详情主页
*/
export function HbHospitalDetail(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/hospital/detail/' + (path || ''), params)
}

/*
* 医生详情/删除医生
*/
export function HbHospitalDoctor(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/hospital/doctor/' + (path || ''), params)
}

/*
* 患者总览主页
*/
export function HbPatientsMain(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/patients/main/' + (path || ''), params)
}

/*
* 治疗患者使用统计
*/
export function HbPatientsStatistics(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/patients/statistics/' + (path || ''), params)
}

/*
* 患者详情/编辑患者详情/删除患者
*/
export function HbPatientsDetail(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/patients/detail/' + (path || ''), params)
}

/*
* 新增患者
*/
export function HbDoctorPatientsNew(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/doctor/patients/new/' + (path || ''), params)
}

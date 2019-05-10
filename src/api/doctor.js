
import http from '_utils/http'
import { ArrangeHttpMethod } from '_utils/public'

/**
 * 医生-首页
 * @param params
 * @returns {*}
 * @constructor
 */
export function DoctorMain(params) {
  return http.httpGet('/hb/doctor/main', params)
}

/**
 * 医生-普通管理员列表
 * @param params
 * @returns {*}
 * @constructor
 */
export function DoctorManger(params) {
  return http.httpGet('/hb/doctor/manager', params)
}

/**
 * 某个医生的所有患者
 * @param params
 * @returns {*}
 * @constructor
 */
export function DoctorPatientList(params) {
  return http.httpGet('/hb/doctor/patients/list', params)
}


/*
* 医生治疗人数排行榜
*/
export function HbDoctorRank(params, methods, device_id , hospital_id ) {
  return ArrangeHttpMethod(methods)('/hb/doctor/rank/' + (device_id  || '') + '/' + (hospital_id  || ''), params)
}

/**
 * 新增患者
 * @param params
 * @returns {*}
 * @constructor
 */
export function HbDoctorPatientsNew(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/doctor/patients/new/' + (path || ''), params)
}

/**
 * 某个患者上次的治疗记录
 * @param params
 * @returns {*}
 * @constructor
 */
export function HbDoctorTreatmentRecords(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/doctor/treatment/records/' + (path || ''), params)
}

/**
 * 添加治疗记录
 * @param params
 * @returns {*}
 * @constructor
 */
export function HbDoctorRecordsNew(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/doctor/records/new/' + (path || ''), params)
}

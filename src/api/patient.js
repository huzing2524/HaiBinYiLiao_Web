/**
 * Created by ll on 19/4/04
 */
import { ArrangeHttpMethod } from '_utils/public'

/*
* 患者列表
*/
export function HbPatientsList(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/patients/list/' + (path || ''), params)
}

/*
* 患者详情
*/
export function HbPatientsDetail(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/patients/detail/' + (path || ''), params)
}



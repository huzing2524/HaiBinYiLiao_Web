/**
 * Created by ll on 19/4/02
 */
import { ArrangeHttpMethod } from '_utils/public'

/*
* 医院总览主页
*/
export function HbHospitalsMain(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/hospitals/main/' + (path || '') , params)
}

/*
* 医院详情主页
*/
export function HbHospitalDetail(params, methods, path) {
  return ArrangeHttpMethod(methods)('/hb/hospital/detail/' + (path || '') , params)
}



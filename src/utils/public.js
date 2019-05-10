/**
 * Created by scott on 2019-03-14
 */
import http from "./http"

/**
 * 充值状态  0：正在充值中，1：充值成功，2：充值失败
 * @param val
 * @returns {string}
 */
export function rechargeState(val) {
  let content = '';
  switch (parseInt(val)) {
    case 0:
      return '充值中';
    case 1:
      return '充值成功';
    case 2:
      return '充值失败';
    default:
      return content;
  }
}

/**
 * 年龄段  0：18岁以下，1：19岁到35岁，2：36岁到59岁，3：60岁以上
 * @param val
 * @returns {string}
 */
export function ageState(val) {
  let content = '';
  switch (parseInt(val)) {
    case 0:
      return '18岁以下';
    case 1:
      return '19岁到35岁';
    case 2:
      return '36岁到59岁';
    case 3:
      return '60岁以上';
    default:
      return content;
  }
}

/**
 * Date-格式 2019-03-28
 * @param timestamp
 * @returns {string}
 */

export function getYMDDateString(timestamp) {
  let date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = extra(date.getFullYear()) + '-'
  let M = extra(date.getMonth() + 1) + '-'
  let D = extra(date.getDate())
  return Y + M + D
}

/**
 * Date.格式 2019.03.05
 * @param timestamp
 * @returns {string}
 */
export function getYMDDateDecimalString(timestamp) {
  let date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = extra(date.getFullYear()) + '.'
  let M = extra(date.getMonth() + 1) + '.'
  let D = extra(date.getDate())
  return Y + M + D
}

export function getDateString(timestamp) {
  let date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let M = extra(date.getMonth() + 1) + '.'
  let D = extra(date.getDate()) + ' '
  let h = extra(date.getHours()) + ':'
  let m = extra(date.getMinutes()) + ':'
  let s = extra(date.getSeconds())
  return M + D + h + m + s
}

export function getTimeString(timestamp) {
  let date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let M = extra(date.getMonth() + 1) + '月'
  let D = extra(date.getDate()) + '日 '
  let h = extra(date.getHours()) + ':'
  let m = extra(date.getMinutes())
  return M + D + h + m
}

export function getYMDHMDateString(timestamp) {
  let date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = extra(date.getFullYear()) + '.'
  let M = extra(date.getMonth() + 1) + '.'
  let D = extra(date.getDate()) + ' '
  let h = extra(date.getHours()) + ':'
  let m = extra(date.getMinutes())
  return Y + M + D + h + m
}

export function getMDHMDateString(timestamp) {
  let date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let M = extra(date.getMonth() + 1) + '.'
  let D = extra(date.getDate()) + ' '
  let h = extra(date.getHours()) + ':'
  let m = extra(date.getMinutes())
  return M + D + h + m
}

export function getMDDateString(timestamp) {
  let date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let M = extra(date.getMonth() + 1) + '.'
  let D = extra(date.getDate()) + ' '
  return M + D
}

export function getMDCNDateString(timestamp) {
  let date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let M = extra(date.getMonth() + 1) + '月'
  let D = extra(date.getDate()) + '日'
  return M + D
}

/**
 * 日期转时间戳
 * @param date
 * @returns {string}
 */
export function getTimestampByDate(date) {
  let timestamp = ''
  if (date) {
    timestamp = new Date(date).getTime() / 1000 + ''
  }
  return timestamp
}

/**
 * 补位函数 如果传入数字小于10，数字前补一位0。
 * @param x
 * @returns {*}
 */
function extra(x) {
  if (x < 10) {
    return '0' + x
  } else {
    return x
  }
}

/**
 * 小数点超出保留num位
 * @param floatNum
 * @param num
 * @returns {number}
 */
export function toFixedNum(floatNum, num) {
  return Math.round(parseFloat(floatNum) * Math.pow(10, num)) / Math.pow(10, num)
}


/**
 * 整理给后端的参数，非空才加入新的对象
 * @param params
 * @returns {*}
 * @constructor
 */
export function ArrangeParams(params) {
  params = params || {}
  let newParams = {}
  Object.keys(params).forEach((item) => {
    if ((params[item] || params[item]===0) && (params[item] + '').length) {
      newParams[item] = params[item]
    }
  })
  return newParams
}

export function ArrangeHttpMethod(method, isNew) {
  let httpMethod = http.httpGet
  if (isNew === 1) {
    switch (method){
      case 'post':
        httpMethod = http.newHttpPost
        break
      case 'put':
        httpMethod = http.httpPut
        break
      case 'delete':
        httpMethod = http.httpDelete
        break
      default:
        httpMethod = http.newHttpGet
    }
  } else {
    switch (method){
      case 'post':
        httpMethod = http.httpPost
        break
      case 'put':
        httpMethod = http.httpPut
        break
      case 'delete':
        httpMethod = http.httpDelete
        break
      default:
        httpMethod = http.httpGet
    }
  }
  return httpMethod
}

export const isDev = process.env.NODE_ENV === 'development'

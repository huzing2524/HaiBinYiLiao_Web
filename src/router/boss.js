import BossHospital from './boss_hospital'
import BossEquipment from './boss_equipment'
import BossPatient from './boss_patient'

export default [
  ...BossHospital,
  ...BossEquipment,
  ...BossPatient,
  {
    path: '/boss',
    name: 'boss',
    component: () => import ('_views/boss'),
    meta: {
      title: '治疗仪管理'
    }
  },
  {
    path: '/boss/recharge/select',
    name: 'boss_recharge_select',
    component: () => import ('_views/boss/recharge_select'),
    meta: {
      title: '使用次数充值'
    }
  },
  {
    path: '/boss/recharge/frequency',
    name: 'boss_recharge_frequency',
    component: () => import ('_views/boss/recharge_select/recharge_frequency'),
    meta: {
      title: '使用次数充值'
    }
  },
  {
    path: '/boss/recharge/success',
    name: 'boss_recharge_success',
    component: () => import ('_views/boss/recharge_select/recharge_frequency/recharge_success'),
    meta: {
      title: '使用次数充值'
    }
  },
  {
    path: '/boss/recharge/record',
    name: 'boss_recharge_record',
    component: () => import ('_views/boss/recharge_select/recharge_record'),
    meta: {
      title: '充值记录'
    }
  },
  {
    path: '/boss/recharge/detail',
    name: 'boss_recharge_detail',
    component: () => import ('_views/boss/recharge_select/recharge_record/recharge_detail'),
    meta: {
      title: '充值详情'
    }
  },
  {
    path: '/boss/hospital/create',
    name: 'boss_hospital_create',
    component: () => import ('_views/boss/hospital_create'),
    meta: {
      title: '新增医院'
    }
  },
  {
    path: '/boss/hospital/success',
    name: 'boss_hospital_success',
    component: () => import ('_views/boss/hospital_create/hospital_success'),
    meta: {
      title: '新增医院'
    }
  },
  {
    path: '/boss/hospital/select',
    name: 'boss_hospital_select',
    component: () => import ('_views/boss/device_binding/hospital_select'),
    meta: {
      title: '医院绑定设备'
    }
  },
  {
    path: '/boss/device/select',
    name: 'boss_device_select',
    component: () => import ('_views/boss/device_binding/device_select'),
    meta: {
      title: '选择设备'
    }
  },
  {
    path: '/boss/device/success',
    name: 'boss_device_success',
    component: () => import ('_views/boss/device_binding/device_select/binding_success'),
    meta: {
      title: '医院绑定设备'
    }
  },
  {
    path: '/boss/doctor/hospital/select',
    name: 'boss_doctor_hospital_select',
    component: () => import ('_views/boss/doctor_create/hospital_select'),
    meta: {
      title: '医院添加医生'
    }
  },
  {
    path: '/boss/doctor/select',
    name: 'boss_doctor_select',
    component: () => import ('_views/boss/doctor_create/doctor_select'),
    meta: {
      title: '选择医生'
    }
  },
  {
    path: '/boss/doctor/success',
    name: 'boss_doctor_success',
    component: () => import ('_views/boss/doctor_create/doctor_select/create_success'),
    meta: {
      title: '医院绑定设备'
    }
  },
  {
    path: '/boss/admin',
    name: 'boss_admin',
    component: () => import ('_views/boss/admin_create'),
    meta: {
      title: '管理员'
    }
  },
  {
    path: '/boss/admin/add',
    name: 'boss_admin_add',
    component: () => import ('_views/boss/admin_create/admin_add'),
    meta: {
      title: '添加管理员'
    }
  },
  {
    path: '/boss/admin/detail',
    name: 'boss_admin_detail',
    component: () => import ('_views/boss/admin_create/admin_detail'),
    meta: {
      title: '管理员详情'
    }
  },
]

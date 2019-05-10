export default [
  {
    path: '/boss/hospital',
    name:'boss_hospital',
    component: () => import('_views/boss/hospital/'),
    meta: {
      title: '医院'
    }
  },
  {
    path: '/boss/hospital/detail',
    name:'boss_hospital_detail',
    component: () => import('_views/boss/hospital/detail/'),
    meta: {
      title: '医院'
    }
  },
  {
    path: '/boss/hospital/equipment_detail',
    name:'boss_hospital_equipment_detail',
    component: () => import('_views/boss/hospital/equipment_detail/'),
    meta: {
      title: '设备详情'
    }
  },
  {
    path: '/boss/hospital/equipment_edit',
    name:'boss_hospital_equipment_edit',
    component: () => import('_views/boss/hospital/equipment_detail/equipment_edit/'),
    meta: {
      title: '编辑设备'
    }
  },
  {
    path: '/boss/hospital/used_statistic',
    name:'boss_hospital_used_statistic',
    component: () => import('_views/boss/hospital/used_statistic/'),
    meta: {
      title: '设备使用统计'
    }
  },
  {
    path: '/boss/hospital/used_rank',
    name:'boss_hospital_used_rank',
    component: () => import('_views/boss/hospital/used_rank/'),
    meta: {
      title: '医生治疗排行'
    }
  },
  {
    path: '/boss/hospital/doctor_list',
    name:'boss_hospital_doctor_list',
    component: () => import('_views/boss/hospital/doctor_list/'),
    meta: {
      title: '医生列表'
    }
  },
  {
    path: '/boss/hospital/doctor_detail',
    name:'boss_hospital_doctor_detail',
    component: () => import('_views/boss/hospital/doctor_detail/'),
    meta: {
      title: '医生详情'
    }
  },
  {
    path: '/boss/hospital/doctor_edit',
    name:'boss_hospital_doctor_edit',
    component: () => import('_views/boss/hospital/doctor_edit/'),
    meta: {
      title: '修改医生'
    }
  },
]

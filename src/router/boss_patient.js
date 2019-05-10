export default [
  {
    path: '/boss/patient',
    name: 'boss_patient',
    component: () => import('_views/boss/patient'),
    meta: {
      title: '患者'
    }
  },
  {
    path: '/boss/patient/used_statistic',
    name:'boss_patient_used_statistic',
    component: () => import('_views/boss/patient/used_statistic/'),
    meta: {
      title: '设备使用统计'
    }
  },
  {
    path: '/boss/patient/used_rank',
    name:'boss_patient_used_used_rank',
    component: () => import('_views/boss/patient/used_rank/'),
    meta: {
      title: '医生治疗排行'
    }
  },
  {
    path: '/boss/patient/patient_list',
    name:'boss_hospital_patient_list',
    component: () => import('_views/boss/patient/patient_list/'),
    meta: {
      title: '患者列表'
    }
  },
  {
    path: '/boss/patient/patient_detail',
    name: 'boss_patient_patient_detail',
    component: () => import('_views/boss/patient/patient_detail'),
    meta: {
      title: '患者治疗详情'
    }
  },
  {
    path: '/boss/patient/patient_edit',
    name: 'boss_patient_patient_edit',
    component: () => import('_views/boss/patient/patient_edit'),
    meta: {
      title: '修改患者信息'
    }
  },
  {
    path: '/boss/patient/data_analyse',
    name:'boss_hospital_data_analyse',
    component: () => import('_views/boss/patient/data_analyse/'),
    meta: {
      title: '患者数据分析'
    }
  },
  {
    path: '/boss/patient/treatment_record_list',
    name:'boss_hospital_treatment_record_list',
    component: () => import('_views/boss/patient/treatment_record_list/'),
    meta: {
      title: '治疗记录'
    }
  },
]

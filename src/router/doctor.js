export default [
  {
    path: '/doctor',
    name: 'doctor',
    component: () => import('_views/doctor/'),
    meta: {
      title: '医生'
    }
  },
  {
    path: '/doctor/add_patient',
    name: 'doctor_add_patient',
    component: () => import('_views/doctor/add_patient/'),
    meta: {
      title: '添加患者'
    }
  },
  {
    path: '/doctor/add_patient/success',
    name: 'doctor_add_patient_success',
    component: () => import('_views/doctor/add_patient/add_success/'),
    meta: {
      title: '添加患者成功'
    }
  },
  {
    path: '/doctor/add_treatment_record',
    name: 'doctor_add_treatment_record',
    component: () => import('_views/doctor/add_treatment_record/'),
    meta: {
      title: '添加治疗信息'
    }
  },
  {
    path: '/doctor/add_treatment_record/device_select',
    name:'boss_hospital_device_select',
    component: () => import('_views/doctor/add_treatment_record/device_select/'),
    meta: {
      title: '选择治疗设备'
    }
  },
  {
    path: '/doctor/add_treatment_record/success',
    name: 'doctor_add_treatment_record_success',
    component: () => import('_views/doctor/add_treatment_record/add_success/'),
    meta: {
      title: '添加治疗信息'
    }
  },
  {
    path: '/doctor/patient_list',
    name: 'doctor_patient_list',
    component: () => import('_views/doctor/patient_list/'),
    meta: {
      title: '我的患者'
    }
  },
  {
    path: '/doctor/patient_detail',
    name: 'doctor_patient_detail',
    component: () => import('_views/doctor/patient_detail/'),
    meta: {
      title: '患者治疗详情'
    }
  },
  {
    path: '/doctor/patient_edit',
    name: 'doctor_patient_edit',
    component: () => import('_views/doctor/patient_edit/'),
    meta: {
      title: '修改患者信息'
    }
  },
  {
    path: '/doctor/contact_admin',
    name: 'doctor_contact_admin',
    component: () => import('_views/doctor/contact_admin/'),
    meta: {
      title: '联系管理员'
    }
  },
]

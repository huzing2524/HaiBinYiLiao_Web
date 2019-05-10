export default [
  {
    path: '/boss/equipment',
    name:'boss_equipment',
    component: () => import('_views/boss/equipment'),
    meta: {
      title: '体外冲击波治疗仪'
    }
  },
  {
    path: '/boss/equipment/select',
    name:'boss_equipment_select',
    component: () => import('_views/boss/equipment/equipment_select'),
    meta: {
      title: '查看设备信息'
    }
  },
  {
    path: '/boss/equipment/detail',
    name:'boss_equipment_detail',
    component: () => import('_views/boss/equipment/equipment_detail'),
    meta: {
      title: '查看设备信息'
    }
  },
  {
    path: '/boss/equipment/statistic',
    name:'boss_equipment_statistic',
    component: () => import('_views/boss/equipment/used_statistic'),
    meta: {
      title: '设备使用统计'
    }
  },
  {
    path: '/boss/equipment/rank',
    name:'boss_equipment_rank',
    component: () => import('_views/boss/equipment/used_rank'),
    meta: {
      title: '医院使用排行榜'
    }
  },
  {
    path: '/boss/equipment/rank/date_picker',
    name:'boss_equipment_rank_date_picker',
    component: () => import('_views/boss/equipment/used_rank/date_picker'),
    meta: {
      title: '选择时间'
    }
  },
  {
    path: '/boss/patient/analyse',
    name:'boss_equipment_analyse',
    component: () => import('_views/boss/patient/data_analyse'),
    meta: {
      title: '患者数据分析'
    }
  },
]

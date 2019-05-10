<template lang="pug">
  .patient-compare
    .chart
      canvas#chart
</template>

<script>
  import F2 from '@antv/f2'
  export default {
    name: 'PatientCompare',
    data() {
      return {
        isLoad:false,
        chart: null,
        listItem:[],
      }
    },
    props: ['patientsListItem'],
    mounted(){
      this.initData()
    },
    watch:{
      patientsListItem(){
        this.initData()
      }
    },
    methods: {
      initData(){
        this.initChart()
      },
      initChart(){
        this.chart = new F2.Chart({
          id: 'chart',
          pixelRatio: window.devicePixelRatio
        })
        this.chart.source(this.patientsListItem, {
          value: {
            tickCount: 5
          },
          date:{
            tickCount: 100
          }
        })
        this.chart.legend(false)
        this.chart.tooltip({
          showTitle:false,
          showItemMarker:false,
          onShow: function onShow(ev) {
            let items = ev.items
            items[0].name = null
            items[0].value = items[0].value + '次'
          }
        })
        this.chart.axis('date', {
          line: {
            lineWidth: 1,
            stroke: '#D8D8D8',
            top: true,
          },
          grid: null,
        })
        this.chart.axis('count', {
          line: null,
          label: null,
        })
        this.chart.interval().position('date*count').color('date',['#999999','#999999','#999999','#19CAAD'])
        this.chart.render()
      }
    }
  }
</script>

<style scoped lang="stylus">
  .patient-compare
    display flex
    flex-direction column
    .chart
      overflow hidden
      #chart
        width 100%
        height 100%
</style>

<template lang="pug">
    .use-statistic-card.full_box
      .card-chart
        canvas#my-chart
</template>

<script>
  import F2 from '@antv/f2'
  export default {
    name:'UseStatistic',
    data() {
      return {
        isLoad:false,
        chart: null,
        listItem:[],
      }
    },
    props: ['statisticListItem'],
    mounted(){
      this.initData()
    },
    watch:{
      statisticListItem(){
        this.initData()
      }
    },
    methods: {
      initData(){
        this.initChart()
      },
      initChart(){
        this.chart = new F2.Chart({
          id: 'my-chart',
          height: 290,
          pixelRatio: window.devicePixelRatio
        })
        this.chart.source(this.statisticListItem, {
          value: {
            tickCount: 5,
            min: 0
          },
          date: {
            range: [0, 1]
          }
        })
        this.chart.tooltip({
          showCrosshairs: false,
          showItemMarker: false,
          onShow: function onShow(ev) {
            let items = ev.items
            items[0].name = null
            items[0].value = items[0].value + '次'
          }
        })
        this.chart.axis('date', {
          line: null,
          label: function label(text, index, total) {
            let textCfg = {};
            if (index === 0) {
              textCfg.textAlign = 'left'
            } else if (index === total - 1) {
              textCfg.textAlign = 'right'
            }
            return textCfg
          }
        })
        this.chart.axis('count', {
          line: null,
          position: 'right'
        })
        this.chart.line().position('date*count')
        this.chart.point().position('date*count').style({
          stroke: '#fff',
          lineWidth: 1
        })
        this.chart.render()

      }
    },
  }
</script>

<style scoped lang="stylus">
    .use-statistic-card
      display flex
      flex-direction column
      .card-chart
        overflow hidden
        #my-chart
          width 100%
          height 100%

</style>

<template>


  <el-dialog id="result" :visible.sync="visible" title="评估结果" width="80%" @close="asClose" @opened="init">

    <h4 id="investmentRecoveryYears">
      投资回收期（年）
      <span>{{(data.investmentRecoveryYears).toFixed(0)}}</span>
    </h4>

    <el-row :gutter="20">
      <el-col :span="8">
        <label>主设备（万元）</label>
        <span>{{(data.equipmentCost / 10000).toFixed(2)}}</span>
      </el-col>
      <el-col :span="8">
        <label>配套及施工费（万元）</label>
        <span>{{(data.installCost / 10000).toFixed(2)}}</span>
      </el-col>
      <el-col :span="8">
        <label>传输（万元）</label>
        <span>{{(data.transferCost / 10000).toFixed(2)}}</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <label>塔租（万元/年）</label>
        <span>{{(data.towerCostYearly / 10000).toFixed(2)}}</span>
      </el-col>
      <el-col :span="8">
        <label>能耗（万元/年）</label>
        <span>{{(data.energyCostYearly / 10000).toFixed(2)}}</span>
      </el-col>
      <el-col :span="8">
        <label>维护（万元/年）</label>
        <span>{{(data.maintenanceCostYearly / 10000).toFixed(2)}}</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <label>第一年收入（万元）</label>
        <span>{{(data.firstYearRevenue / 10000).toFixed(2)}}</span>
      </el-col>
      <el-col :span="8">
        <label>第二年收入（万元）</label>
        <span>{{(data.secondYearRevenue / 10000).toFixed(2)}}</span>
      </el-col>
      <el-col :span="8">
        <label>第三年收入（万元）</label>
        <span>{{(data.thirdYearRevenue / 10000).toFixed(2)}}</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <label>周边基站常驻用户ARPU值全网排名</label>
        <span>{{(data.arpuRank * 100).toFixed(2)}}%</span>
      </el-col>
      <el-col :span="8">
        <label>途径用户数全网排名</label>
        <span>{{(data.userAroundRank * 100).toFixed(2)}}%</span>
      </el-col>
      <el-col :span="8">
        <label>站址周边800*800米1年覆盖投诉量</label>
        <span>{{data.complaintsAround}}</span>
      </el-col>
    </el-row>
    <el-row></el-row>
    <label>友商业务量水平</label>
    <span>{{(data.competitorLevel * 100).toFixed(2)}}%</span>

    <el-collapse>
      <el-collapse-item title="场景" name="1">
        <el-table :data="data.scenes" ref="sceneData">
          <el-table-column property="name" label="场景名" width="200"></el-table-column>
          <el-table-column property="longitude" label="经度"></el-table-column>
          <el-table-column property="latitude" label="纬度"></el-table-column>
          <el-table-column property="radius" label="距离"></el-table-column>
          <el-table-column property="mrCoverage" label="mr覆盖率" :formatter="format"></el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item title="宏站" name="2">
        <el-table :data="data.stations" ref="stationData">
          <el-table-column property="name" label="基站名称" width="200"></el-table-column>
          <el-table-column property="longitude" label="经度"></el-table-column>
          <el-table-column property="latitude" label="纬度"></el-table-column>
          <el-table-column property="distance" label="距离"></el-table-column>
          <el-table-column property="businessVolume" label="日均流量GB"></el-table-column>
          <el-table-column property="monthRevenue" label="月收入"></el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item title="mr分布" name="3">
        <div id="mrChart" :style="{width: '350px', height: '350px'}">abc</div>
      </el-collapse-item>
    </el-collapse>
  </el-dialog>

</template>

<script>
// import heatmap from 'heatmap.js'
// import 'echarts/lib/chart/heatmap'
import 'echarts/lib/chart/heatmap'
// import Echarts from 'echarts/lib/echarts'
import Echarts from 'echarts/index'
export default {
  // components: {
  //   heatmap
  // },
  mounted () {

    // console.log('mounted被调用' + document.getElementById('mrChart'))
    // let container = document.createElement('div')
    // container.setAttribute('id', 'echart-container')
    // container.style.width =
    // document.body.insertBefore(container, document.getElementById('investmentRecoveryYears'))
    // this.echart = Echarts.init(container, 'light', {width: '300px', height: '300px'})
    // this.echart = Echarts.init(document.getElementById('mrChart'))
    // console.log('sfjsjf' + this.echart)
  },
  data () {
    return {
      echart: null,
      visible: false,
      data: {
        bizData: null,
        scenes: [],
        stations: [],
        equipmentCost: 0,
        installCost: 20000,
        transferCost: 10000,
        towerCostYearly: 8000,
        energyCostYearly: 3000,
        maintenanceCostYearly: 1200,
        arpuRank: 0.1419,
        userAroundRank: 0.182,
        complaintsAround: 200,
        competitorLevel: 0.1,
        firstYearRevenue: 20000,
        secondYearRevenue: 20000,
        thirdYearRevenue: 20000,
        investmentRecoveryYears: 2
      }
    }
  },
  methods: {
    show (data) {
      this.visible = true
      this.bizData = data
    },
    init () {
      let data = this.bizData
      if (!this.echart) {
        this.echart = Echarts.init(document.getElementById('mrChart'))
      }
      // this.$nextTick(() => {
      console.log('init方法开始执行')
      this.visible = true
      this.data = data
      var hours = ['-400', '-200', '200', '400']
      var days = ['-400', '-200', '200', '400']
      let data1 = []
      data1.push([2, 2, (data.mrs[0].goodCoverage * 100).toFixed(2)]) // top1
      data1.push([3, 2, (data.mrs[1].goodCoverage * 100).toFixed(2)]) // top2
      data1.push([3, 3, (data.mrs[2].goodCoverage * 100).toFixed(2)]) // top3
      data1.push([2, 3, (data.mrs[3].goodCoverage * 100).toFixed(2)]) // top4

      data1.push([2, 1, (data.mrs[4].goodCoverage * 100).toFixed(2)]) // top5
      data1.push([2, 0, (data.mrs[5].goodCoverage * 100).toFixed(2)])// top6
      data1.push([3, 0, (data.mrs[6].goodCoverage * 100).toFixed(2)]) // top7
      data1.push([3, 1, (data.mrs[7].goodCoverage * 100).toFixed(2)]) // top8

      data1.push([1, 1, (data.mrs[8].goodCoverage * 100).toFixed(2)]) // top9
      data1.push([0, 1, (data.mrs[9].goodCoverage * 100).toFixed(2)]) // top10
      data1.push([0, 0, (data.mrs[10].goodCoverage * 100).toFixed(2)]) // top11
      data1.push([1, 0, (data.mrs[11].goodCoverage * 100).toFixed(2)]) // top12

      data1.push([1, 2, (data.mrs[12].goodCoverage * 100).toFixed(2)]) // top13
      data1.push([1, 3, (data.mrs[13].goodCoverage * 100).toFixed(2)]) // top14
      data1.push([0, 3, (data.mrs[14].goodCoverage * 100).toFixed(2)]) // top15
      data1.push([0, 2, (data.mrs[15].goodCoverage * 100).toFixed(2)]) // top16
      data1 = data1.map(function (item) {
        return [item[1], item[0], item[2] || '-']
      })
      let option = {
        dataZoom: [
          {
            id: 'dataZoomY',
            type: 'slider',
            yAxisIndex: [0],
            startValue: 0,
            endValue: 10,
            filterMode: 'empty'
          }
        ],
        animation: false,
        grid: {
          left: '3%',
          right: '8%',
          bottom: '8%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: hours,
          axisLine: {
            lineStyle: {
              color: '#000'
            }
          },
          axisLabel: {
            interval: 0,
            rotate: 40
          },
          splitArea: {
            show: true
          },
          name: ''
        },
        yAxis: {
          type: 'category',
          data: days,
          axisLine: {
            lineStyle: {
              color: '#000'
            }
          },
          axisLabel: {
            interval: 0,
            rotate: 40
          },
          splitArea: {
            show: true
          },
          name: ''
        },
        visualMap: {
          min: 1,
          max: 100,
          //  calculable:  true,
          orient: 'horizontal',
          left: 'center',
          bottom: '1%',
          show: true,
          type: 'piecewise',
          pieces: [
            {
              gt: 90,
              lte: 100,
              color: 'green'
            },
            {
              gt: 80,
              lte: 90,
              color: 'blue'
            },
            {
              gt: 70,
              lte: 80,
              color: 'yellow'
            },
            {
              lte: 70,
              color: 'red'
            }
          ]
        },
        series: [
          {
            name: 'mr分布',
            type: 'heatmap',
            data: data1,
            label: {
              normal: {
                show: true
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowColor: 'rgba(120, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      this.echart.setOption(option)
      // })
    },
    asClose () {
      this.$emit('onCallbackWhenClose')
    },
    format (row, column, cellValue, index) {
      return (cellValue * 100).toFixed(2) + '%'
    }
  }
}
</script>

<style>
span {
  font-weight: bold;
}
</style>



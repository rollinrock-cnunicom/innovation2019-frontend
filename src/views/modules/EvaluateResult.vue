<template>
  <el-dialog :visible.sync="visible" title="评估结果" width="80%" @close="asClose">
    <h4>投资回收期（年）:<span>{{(data.investmentRecoveryYears).toFixed(0)}}</span></h4>
    <el-row :gutter="20">
      <el-col :span="8"><label>主设备（万元）</label><span>{{(data.equipmentCost / 10000).toFixed(2)}}</span></el-col>
      <el-col :span="8"><label>配套及施工费（万元）</label><span>{{(data.installCost / 10000).toFixed(2)}}</span></el-col>
      <el-col :span="8"><label>传输（万元）</label><span>{{(data.transferCost / 10000).toFixed(2)}}</span></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8"><label>塔租（万元/年）</label><span>{{(data.towerCostYearly / 10000).toFixed(2)}}</span></el-col>
      <el-col :span="8"><label>能耗（万元/年）</label><span>{{(data.energyCostYearly / 10000).toFixed(2)}}</span></el-col>
      <el-col :span="8"><label>维护（万元/年）</label><span>{{(data.maintenanceCostYearly / 10000).toFixed(2)}}</span></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8"><label>第一年收入（万元）</label><span>{{(data.firstYearRevenue / 10000).toFixed(2)}}</span></el-col>
      <el-col :span="8"><label>第二年收入（万元）</label><span>{{(data.secondYearRevenue / 10000).toFixed(2)}}</span></el-col>
      <el-col :span="8"><label>第三年收入（万元）</label><span>{{(data.thirdYearRevenue / 10000).toFixed(2)}}</span></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8"><label>周边基站常驻用户ARPU值全网排名 </label><span>{{(data.arpuRank * 100).toFixed(2)}}%</span></el-col>
      <el-col :span="8"><label>途径用户数全网排名 </label><span>{{(data.userAroundRank * 100).toFixed(2)}}%</span></el-col>
      <el-col :span="8"><label>站址周边800*800米1年覆盖投诉量 </label><span>{{data.complaintsAround}}</span></el-col>
    </el-row>
    <el-row></el-row>
    <label>友商业务量水平 </label><span>{{(data.competitorLevel * 100).toFixed(2)}}%</span>

    <el-collapse >
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
    </el-collapse>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      data: {
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
    init (data) {
      this.visible = true
      this.data = data
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



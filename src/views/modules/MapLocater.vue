<template>
  <div class="wrapper">
    <el-form :inline="true" :model="searchInputs">
      <el-form-item >
        <el-input
          id="pickerInput"
          v-model="searchInputs.location"
          placeholder="请输入搜索地点"
          :clearable="true"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doSearch">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" :disabled="!evaluatable" @click="doEvaluate">开始评估</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="评估参数" :visible.sync="evaluating" :show-close="false">
      <el-form :model="bStation" ref="evaluateForm" label-width="200px">
        <el-form-item label="选址地点">
          <el-input readonly v-model="address"></el-input>
        </el-form-item>
        <el-form-item label="需求网络">
          <!-- <el-switch v-model="bStation.network" active-text="4G" inactive-text="3G"></el-switch> -->
          <el-radio-group v-model="bStation.network" size="medium">
            <el-radio-button label="1">3G</el-radio-button>
            <el-radio-button label="2">4G</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="设备来源">
          <!-- <el-switch v-model="bStation.equipmentSource" active-text="新购" inactive-text="利旧"></el-switch> -->
          <el-radio-group v-model="bStation.equipmentSource" size="medium">
            <el-radio-button label="1">利旧</el-radio-button>
            <el-radio-button label="2">新购</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="设备类型">
          <el-radio-group v-model="bStation.equipmentType" size="medium">
            <el-radio-button label="1">L900</el-radio-button>
            <el-radio-button label="2">L1800</el-radio-button>
            <el-radio-button label="3">UL2100</el-radio-button>
            <el-radio-button label="4">UBR</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="方向选择">
          <el-radio-group v-model="bStation.direction" size="medium">
            <el-radio-button label="1"></el-radio-button>
            <el-radio-button label="2"></el-radio-button>
            <el-radio-button label="3"></el-radio-button>
            <el-radio-button label="4"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="铁塔租用">
          <el-radio-group v-model="bStation.towerRent" size="medium">
            <el-radio-button label="1" aria-checked="true">自建</el-radio-button>
            <el-radio-button label="2">友商共享</el-radio-button>
            <el-radio-button label="3">新租</el-radio-button>
            <el-radio-button label="4">叠加</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="铁塔种类">
          <el-radio-group v-model="bStation.towerType" size="medium">
            <el-radio-button label="1" aria-checked="true">普通地面塔</el-radio-button>
            <el-radio-button label="2">景观塔</el-radio-button>
            <el-radio-button label="3">简易塔</el-radio-button>
            <el-radio-button label="4">普通楼面塔</el-radio-button>
            <el-radio-button label="5">楼面抱杆</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="机房配置">
          <el-radio-group v-model="bStation.computerLabConfig" size="medium">
            <el-radio-button label="1" aria-checked="true">租赁机房</el-radio-button>
            <el-radio-button label="2">一体化机柜</el-radio-button>
            <el-radio-button label="3">普通地面塔自建机房</el-radio-button>
            <el-radio-button label="4">普通楼面塔自建彩钢板</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="当前铁塔共享客户总数">
          <el-radio-group v-model="bStation.sharedTowerCustomerTotal" size="medium">
            <el-radio-button label="0" aria-checked="true"></el-radio-button>
            <el-radio-button label="1"></el-radio-button>
            <el-radio-button label="2"></el-radio-button>
            <el-radio-button label="3"></el-radio-button>
            <el-radio-button label="4"></el-radio-button>
            <el-radio-button label="5"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="当前机房及配套存量新增共享客户数">
          <el-radio-group v-model="bStation.sharedLabCustomerTotal" size="medium">
            <el-radio-button label="0" aria-checked="true"></el-radio-button>
            <el-radio-button label="1"></el-radio-button>
            <el-radio-button label="2"></el-radio-button>
            <el-radio-button label="3"></el-radio-button>
            <el-radio-button label="4"></el-radio-button>
            <el-radio-button label="5"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="租户类型">
          <el-radio-group v-model="bStation.renterType" size="medium">
            <el-radio-button label="1" aria-checked="true">锚定租户</el-radio-button>
            <el-radio-button label="2">其他租户</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="订单提交前天线数量（个）">
          <el-input v-model="bStation.prevAntennaCount" type="number" min="0" max="15" placeholder="请输入0-15的数字"></el-input>
        </el-form-item>
        <el-form-item label="订单提交前系统数量（个）">
          <!-- <el-input v-model="bStation.prevSystemCount" type="number" min="0" max="5" placeholder="请输入0-5的数字"></el-input> -->
          <el-radio-group v-model="bStation.prevSystemCount" size="medium">
            <el-radio-button label="0" aria-checked="true"></el-radio-button>
            <el-radio-button label="1"></el-radio-button>
            <el-radio-button label="2"></el-radio-button>
            <el-radio-button label="3"></el-radio-button>
            <el-radio-button label="4"></el-radio-button>
            <el-radio-button label="5"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="新增传输设备">
          <el-switch v-model="bStation.newTransferEquipment"></el-switch>
        </el-form-item> -->
        <el-form-item label="天线挂高（米）">
          <el-input v-model="bStation.antennaHeight" type="number"></el-input>
        </el-form-item>
        <el-form-item label="新增传输距离(米)">
          <el-input v-model="bStation.transDistance" type="number"></el-input>
        </el-form-item>
        <el-form-item label="第一年确定新增收入(元/月)">
          <el-input v-model="bStation.firstYearIncome" type="number"></el-input>
        </el-form-item>
        <el-form-item label="第二年确定新增收入(元/月)">
          <el-input v-model="bStation.secondYearIncome" type="number"></el-input>
        </el-form-item>
        <el-form-item label="第三年确定新增收入(元/月)">
          <el-input v-model="bStation.thirdYearIncome" type="number"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitEvaluate">评估</el-button>
          <el-button @click="evaluating=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-row>
      <el-col :span="20">
        <div class="map-wrapper">
          <el-amap
            class="amap-box"
            :plugin="mapPlugins"
            :center="mapCenter"
            :zoom="mapZoom"
            :events="mapEvents"
          >
            <el-amap-marker vid="clickMarker" :visible="true" :position="[clickLng, clickLat]"></el-amap-marker>

            <!-- <el-amap-info-window :position="[clickLng, clickLat]" :visible="showInfoWindow">
                            <div :style="slotStyle">
                                <b>{{address}}</b>
                            </div>
            </el-amap-info-window>-->
          </el-amap>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <p>坐标：[{{clickLng}}，{{clickLat}}] 地址：{{address}}</p>
    </el-row>
    <evaluate-result v-if="evaluateResultVisible" ref="evaluateResult" @onCallbackWhenClose="evaluateResultVisible = false"></evaluate-result>
  </div>
</template>

<script>
import { lazyAMapApiLoaderInstance } from 'vue-amap'
import EvaluateResult from './EvaluateResult'
// import axios from'axios'

export default {
  components: {
    EvaluateResult
  },
  name: 'map-locater',
  props: [],
  data () {
    let self = this
    return {
      evaluateResultVisible: false,
      evaluatable: false,
      bStation: {
        network: 2,
        equipmentSource: 2,
        equipmentType: 2,
        direction: 3,
        towerRent: 3,
        newTransferEquipment: true,
        transDistance: 1209,
        firstYearIncome: 0,
        secondYearIncome: 0,
        thirdYearIncome: 0,
        antennaHeight: 35,
        computerLabConfig: 2,
        towerType: '1',
        sharedTowerCustomerTotal: 2,
        sharedLabCustomerTotal: 2,
        renterType: 2,
        prevAntennaCount: 10,
        prevSystemCount: 3
      },
      evaluating: false,
      showInfoWindow: false,
      clickLng: 0,
      clickLat: 0,
      address: '',
      mapCenter: [119.66438, 29.07143],
      mapZoom: 16,
      amap: null,
      autoComplete: null,
      placeSearch: null,
      cloverMapLayerCanvas: null,
      searchInputs: {
        location: null
      },
      slotStyle: {
        // 信息窗体样式
        padding: '4px 8px',
        background: '#eee',
        color: '#333',
        border: '1px solid gray'
      },
      mapPlugins: [
        'ToolBar'
        // {
        //   pName: 'Geolocation',
        //   events: {
        //     init (map) {
        //       // map.getCurrentPosition((status, result) => {
        //       //   if (result && result.position) {
        //       //     self.mapCenter = [result.position.lng, result.position.lat]
        //       //     self.$nextTick()
        //       //   }
        //       // })
        //     }
        //   }
        // }
      ],
      mapEvents: {
        init (map) {
          self.amap = map
          let autoComplete = (self.autoComplete = new AMap.Autocomplete({
            input: 'pickerInput'
          }))
          let placeSearch = (self.placeSearch = new AMap.PlaceSearch({
            map: self.amap
          }))
          AMap.event.addListener(autoComplete, 'select', evt => {
            placeSearch.search(evt.poi.name)
          })

          let cloverMapLayerCanvas = (self.cloverMapLayerCanvas = document.createElement(
            'canvas'
          ))
          cloverMapLayerCanvas.height = map.getSize().getHeight()
          cloverMapLayerCanvas.width = map.getSize().getWidth()

          // 创建自定义图层
          let cloverMapLayer = (self.cloverMapLayer = new AMap.CustomLayer(
            cloverMapLayerCanvas,
            {
              map: self.amap,
              opacity: 0.8,
              zindex: 12,
              zooms: [13, 18]
            }
          ))
          cloverMapLayer.render = self.renderCloverMapLayer
          cloverMapLayer.render()
        },
        click (evt) {
          self.clickLng = evt.lnglat.lng
          self.clickLat = evt.lnglat.lat
          let geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: 'all'
          })
          geocoder.getAddress(
            [self.clickLng, self.clickLat],
            (status, result) => {
              if (status === 'complete' && result && result.info === 'OK') {
                if (result.regeocode) {
                  self.address = result.regeocode.formattedAddress
                  // self.$nextTick
                  if (!self.showInfoWindow) {
                    self.showInfoWindow = true
                  }
                }
              }
            }
          )
        }
      }
    }
  },
  created () {
    // let self = this
    lazyAMapApiLoaderInstance.load().then(() => {
      AMap.plugin(
        ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.CustomLayer'],
        () => {
          // 实例创建时即异步加载相关插件
        }
      )
    })
    console.log('lifecycle hook created invoked')
  },
  amounted () {
    console.log('lifecycle hook amounted invoked')
  },
  methods: {
    doSearch () {
      if (this.searchInputs.location) {
        this.placeSearch.search(this.searchInputs.location)
      }
    },
    handleSearchResult (pois) {
      this.$alert('处理查找结果', '查找成功')
    },
    doEvaluate (evt) {
      if (!this.address) {
        this.$notify.error({
          title: '评估错误',
          message: '请先点击地图进行选址'
        })
        return
      }
      this.evaluating = true
    },
    submitEvaluate () {
      // this.$message('评估完成提示')
      this.$http({
        url: this.$http.adornUrl('/station/tBaseStation/evaluate'),
        method: 'get',
        params: this.$http.adornParams(Object.assign(this.bStation, {latitude: this.clickLat, longitude: this.clickLng}))
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.evaluateResultVisible = true
          this.$nextTick(() => {
            this.$refs.evaluateResult.init(data.result)
          })
        } else {
          this.$message.error(`评估失败：${data.message}`)
        }
      })
      this.evaluating = false
    },
    renderCloverMapLayer () {
      let self = this
      if (
        this.cloverMapLayer &&
        this.cloverMapLayerCanvas &&
        this.cloverMapLayerCanvas.getContext
      ) {
        let canvasContext = self.canvasContext
        if (!self.canvasContext) {
          canvasContext = self.canvasContext = this.cloverMapLayerCanvas.getContext(
            '2d'
          )
        } else {
          this.cloverMapLayerCanvas.height = this.cloverMapLayerCanvas.height // 重设进行画布内容清空
        }

        canvasContext.strokeStyle = 'green'
        canvasContext.fillStyle = 'red'
        canvasContext.fillOpacity = 1
        // 绘制三叶草图
        // axios.get('http://zjjh.chinaunicom.cn:8089/v1/base_station/search', {
        // axios.get('http://localhost:8089/v1/base_station/search', {
        //     params: {
        //         longitude: this.amap.getCenter().getLng(),
        //         latitude: this.amap.getCenter().getLat(),
        //         radius: 10000
        //     }
        this.$http({
          url: this.$http.adornUrl('/station/tBaseStation/search'),
          method: 'get',
          params: this.$http.adornParams({
            longitude: this.amap.getCenter().getLng(),
            latitude: this.amap.getCenter().getLat(),
            radius: 10000
          })
        }).then(function ({data}) {
          if (data && data.code === 0) {
            if (data.stations.length === 0) {
              self.evaluatable = false
              self.$message.error('非金华地区暂不支持选址评估功能')
            } else {
              self.evaluatable = true
              data.stations.forEach(station => {
                // canvas 绘制代码
                let location = self.amap.lngLatToContainer([
                  station.longitude,
                  station.latitude
                ])
                canvasContext.beginPath()
                canvasContext.moveTo(location.x, location.y)
                canvasContext.arc(
                  location.x,
                  location.y,
                  station.radius,
                  (2 * Math.PI * station.deviationDegree) / 360,
                  (2 * Math.PI * (station.deviationDegree + station.degree)) / 360,
                  false
                )
                canvasContext.closePath()
                canvasContext.stroke()
                // canvasContext.fill()
              })
            }
          } else {
            console.log('加载宏站信息失败')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      }
    }
  }
}
</script>

<style>
.map-wrapper {
  position: relative;
  width: 100%;
  height: 600px;
  border: 1px solid gray;
}
</style>


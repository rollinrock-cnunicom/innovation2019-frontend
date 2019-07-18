import Mock from 'mockjs'

var result = Mock.mock({
  'equipmentCost': 10000,
  'installCost': 20000,
  'transferCost': 10000,
  'towerCostYearly': 8000,
  'energyCostYearly': 6000,
  'maintenanceCostYearly': 1200,
  'arpuRank': 0.1419,
  'userAroundRank': 0.182,
  'complaintsAround': 200,
  'competitorLevel': 0.1,
  'firstYearRevenue': 20000,
  'secondYearRevenue': 20000,
  'thirdYearRevenue': 20000,
  'investmentRecoveryYears': 2,
  'sceneData': [
    {'name': '123', 'longitude': 0, 'latitude': 0, 'radius': 100, 'mrCoverage': 0.36},
    {'name': '123', 'longitude': 0, 'latitude': 0, 'radius': 100, 'mrCoverage': 0.36},
    {'name': '123', 'longitude': 0, 'latitude': 0, 'radius': 100, 'mrCoverage': 0.36},
    {'name': '123', 'longitude': 0, 'latitude': 0, 'radius': 100, 'mrCoverage': 0.36},
    {'name': '123', 'longitude': 0, 'latitude': 0, 'radius': 100, 'mrCoverage': 0.36}
  ],
  'stationData': [
    {'name': '123', 'longitude': 0, 'latitude': 0, 'distance': 100, 'businessVolume': 200, 'monthRevenue': 3000},
    {'name': '123', 'longitude': 0, 'latitude': 0, 'distance': 100, 'businessVolume': 200, 'monthRevenue': 3000},
    {'name': '123', 'longitude': 0, 'latitude': 0, 'distance': 100, 'businessVolume': 200, 'monthRevenue': 3000},
    {'name': '123', 'longitude': 0, 'latitude': 0, 'distance': 100, 'businessVolume': 200, 'monthRevenue': 3000},
    {'name': '123', 'longitude': 0, 'latitude': 0, 'distance': 100, 'businessVolume': 200, 'monthRevenue': 3000}
  ]
})

export function doEvaluate () {
  return {
    isOpen: true,
    url: '/station/evaluate',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
      'result': result
    }
  }
}

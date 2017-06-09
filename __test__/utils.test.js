const getSiteVars = require('../src/lib/utils/getSiteVars')
const createUsgsUrl = require('../src/lib/utils/createUsgsUrl')
const updateRiverList = require('../src/lib/utils/updateRiverList')
const convertDatetime = require('../src/lib/utils/convertDatetime')

// mock objects
const ts = require('./mocks/timeSeries').timeSeries

test('correct variables are returned from mock USGS data', () => {
  const expected = {
    12179900: {
      cfs: "516",
      dateTime: "2017-05-19T13:00:00.000-07:00",
      ft: "4.84"
    },
    12488500: {
      cfs: "528",
      "dateTime": "2017-05-19T13:30:00.000-07:00",
      ft: "73.72"
    }
  }
  const actual = ts.reduce(getSiteVars,{})
  expect(actual).toEqual(expected)
})

test('createUsgsUrl returns proper url', () => {
  const sites = [12484500, 12035400]
  const baseUrl = 'https://waterservices.usgs.gov/nwis/iv/?format=json' +
                  '&siteStatus=all&parameterCd=00060&sites='

  const expected = 'https://waterservices.usgs.gov/nwis/iv/?format=json' +
                  '&siteStatus=all&parameterCd=00060&sites=12484500,12035400'

  const actual = createUsgsUrl(baseUrl, sites)
  expect(actual).toBe(expected)
})

test('updateRiverList updates the flow value', () => {
  const river =   [{
    "riverName": "American",
    "runName": "1. Lodgepole Campground to Hell's Crossing",
    "classType": "II-III+",
    "flow": "",
    "lastUpdate": "5/10/2017 7:30:00 PM",
    "detailPageURL": "http://professorpaddle.com/rivers/riverdetails.asp?riverid=344",
    "detail": {
      "gauge": "AMERICAN RIVER NEAR NILE, WA",
      "siteID": 12488500,
      "minFlow": 300,
      "maxFlow": 600,
      "units": "cfs"
    },
    "id": 0
  }]
  const siteIdFlow = {
    12179900: {
      cfs: "516",
      ft: "4.84"
    },
    12488500: {
      cfs: "528",
      ft: "73.72"
    }
  }
  const data = [river, siteIdFlow]

  const expected = [{
    "riverName": "American",
    "runName": "1. Lodgepole Campground to Hell's Crossing",
    "classType": "II-III+",
    "flow": "528",
    "lastUpdate": "5/10/2017 7:30:00 PM",
    "detailPageURL": "http://professorpaddle.com/rivers/riverdetails.asp?riverid=344",
    "detail": {
      "gauge": "AMERICAN RIVER NEAR NILE, WA",
      "siteID": 12488500,
      "minFlow": 300,
      "maxFlow": 600,
      "units": "cfs"
    },
    "id": 0
  }]

  const actual = updateRiverList(data)

  expect(actual).toEqual(expected)
})

test('convert USGS datetime to PP style', () => {
  const dt = '2017-06-06T19:30:00.000Z'
  const expected = '6/6/2017 12:30:00 PM'
  const actual = convertDatetime(dt)

  expect(actual).toEqual(expected)
})

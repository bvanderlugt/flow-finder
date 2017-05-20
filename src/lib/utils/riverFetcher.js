'use strict'

const fetch = require('node-fetch')

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function json(response) {
  return response.json()
}

const baseUrls = ['http://localhost:8080/rivers/', 'https://waterservices.usgs.gov/nwis/iv/?format=json&siteStatus=all&parameterCd=00060&sites=12488500,12179900']

Promise.all(baseUrls.map(fetch)).then(responses =>
    Promise.all(responses.map(res => res.json())))
    .then(data => {
      let timeSeries = data[1].value.timeSeries
      let siteFlows = {}
      timeSeries.map(river => {
        let siteCode = river.sourceInfo.siteCode[0].value
        if (typeof siteFlows[siteCode] === 'undefined') {
          siteFlows[siteCode] = {
            variables: {
              cfs: null,
              ft: null
            }
          }
        }

        if (river.variable.variableCode[0].value === "00060") {
          console.log("found cfs value 00060")
          let cfs = river.values[0].value[0].value
          siteFlows[siteCode].variables.cfs = cfs
        }
        else if (river.variable.variableCode[0].value === "00065") {
          console.log("found ft height value 00065")
          let ft = river.values[0].value[0].value
          siteFlows[siteCode].variables.ft = ft
        } else {
          console.log("No cfs or ft height values found", cfs, ft)
        }
      })
      return [data[0], siteFlows]
    })
    .then(data => {
      let output = data[0].map(river => {
        let riverSiteId = river.detail.siteID
        if (riverSiteId) {
          return Object.assign({}, river,
            { cfs: (typeof data[1][riverSiteId] === 'undefined') ? '' : data[1][riverSiteId].variables.cfs }
          )
        } else {
          return river
        }
      })
      return output
    }).then(data => console.log(data))
    .catch((err) => {
      console.log('deeerp you got an error', err)
    })

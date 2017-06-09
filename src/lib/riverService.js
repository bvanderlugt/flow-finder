const fetch = require('node-fetch')

const createUsgsUrl = require('./utils/createUsgsUrl')
const updateRiverList = require('./utils/updateRiverList')
const getSiteVars = require('./utils/getSiteVars')

// things we need to create api/db requests
const siteIds = require('../../data/siteIds').siteIds
const usgsBaseUrl = 'https://waterservices.usgs.gov/nwis/iv/?format=json' +
                '&siteStatus=all&parameterCd=00060&sites='
const riverBase = 'http://localhost:8080/rivers'

// create the urls for the requests
const baseUrls = [riverBase, createUsgsUrl(usgsBaseUrl, siteIds )]

export const loadRivers = () => {
  return Promise.all(baseUrls.map(fetch)).then(responses =>
      Promise.all(responses.map(res => res.json())))
      .then(data => {
        // the usgs response is an ugly array of site's and values. Let's clean
        // it up by transforming it to a map of sites and site values.
        let timeSeries = data[1].value.timeSeries
        let siteFlows = timeSeries.reduce(getSiteVars,{})
        return [data[0], siteFlows]
      })
      .then(data => {
        // iterate over the river list and replace default flow values with
        // with those received from the usgs
        let output = updateRiverList(data)
        return output
      }).catch((err) => {
        console.log('deeerp you got an error in api request', err)
      })
}

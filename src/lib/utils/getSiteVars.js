const getSiteVars = (siteFlows, river) => {
  // input: the timeSeries array from USGS service
  // output: a map of siteID's to variables (cfs, ft stage ect.)
    let siteCode = river.sourceInfo.siteCode[0].value
    // if the siteCode does not exist yet, create a new site object
    if (typeof siteFlows[siteCode] === 'undefined') {
      siteFlows[siteCode] = {
        cfs: null,
        ft: null,
        dateTime: null
      }
    }

    if (river.variable.variableCode[0].value === "00060") {
      // console.log("found cfs value 00060")
      let cfs = river.values[0].value[0].value
      let dateTime = river.values[0].value[0].dateTime
      siteFlows[siteCode].cfs = cfs
      siteFlows[siteCode].dateTime = dateTime
    }
    else if (river.variable.variableCode[0].value === "00065") {
      // console.log("found ft height value 00065")
      let ft = river.values[0].value[0].value
      siteFlows[siteCode].ft = ft
    } else {
      // console.log("No cfs or ft height values found", cfs, ft)
    }
    return siteFlows
}


module.exports = getSiteVars

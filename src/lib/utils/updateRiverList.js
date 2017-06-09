const updateRiverList = (data) => {
  let out = data[0].map(river => {
    let riverSiteId = river.detail.siteID
    if (riverSiteId) {
      return Object.assign({}, river,
        {
          flow: (typeof data[1][riverSiteId] === 'undefined') ?
              '' : data[1][riverSiteId].cfs,
          lastUpdate: (typeof data[1][riverSiteId] === 'undefined') ?
              '' : data[1][riverSiteId].dateTime
        }
      )
    } else {
      return river
    }
  })
  return out
}

module.exports = updateRiverList

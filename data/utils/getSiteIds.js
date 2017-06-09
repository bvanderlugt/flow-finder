const data = require('./db.json').rivers

const getSiteIds = (data) => {
  let siteIds = new Set()
  // let siteId = el.detail.siteID
  data.map(el => {
    siteIds.add(el.detail.siteID)
  })
  return siteIds
}

getSiteIds(data)

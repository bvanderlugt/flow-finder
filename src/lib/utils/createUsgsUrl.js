const createUsgsUrl = (baseUrl, siteIds) => {
  return baseUrl + siteIds.join(',')
}

module.exports = createUsgsUrl

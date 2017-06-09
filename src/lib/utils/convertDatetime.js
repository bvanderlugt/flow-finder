const convertDatetime = (dt) => {
  // input: take usgs datetime and make it PP format
  return `${dt.getMonth()}/${dt.getDay()}/${dt.getFullYear()} ${dt.toLocaleTimeString()}`
}

module.exports = convertDatetime

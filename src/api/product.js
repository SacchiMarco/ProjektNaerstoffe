"use strict"

const axios = require("axios")

module.exports.search = function search(term) {
  const url = "https://downloads.codingcoursestv.eu/041%20-%20javascript/proxy/search.php"
  return axios
    .get(url, {
      params: {
        q: term
      }
    })
    .then((response) => response.data['foods'])
}

module.exports.info = function info(fdcId) {
  const url = "https://downloads.codingcoursestv.eu/041%20-%20javascript/proxy/product.php"
  return axios
    .get(url, {
      params: {
        q: fdcId
      }
    })
    .then((response) => response.data)
}



/*
const auth = {
  username: "f30b8Dr9qFteNLSfCtaOIQX1SHHJSxOIrwfb87Vo"
}

module.exports.search = function search(term) {
  return axios
    .post("https://api.nal.usda.gov/fdc/v1/search", {
      generalSearchInput: term
    }, {auth})
    .then((response) => response.data['foods'])
}

module.exports.info = function info(fdcId) {
  return axios
    .get("https://api.nal.usda.gov/fdc/v1/" + fdcId, {auth})
    .then((response) => response.data)
}
*/


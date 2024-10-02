// src/apis/productAPI.js

import { api } from "./axiosConfigs"
import { defineCancelApiObject } from "./axiosUtils"

export const FixtureAPI = {
  get: async function (id, cancel = false) {
    const response = await api.request({
      url: `/fixtures/${id}`,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    // returning the product returned by the API
    return response.data
  },

  getMatchDetail: async function (fixtureId,championshipId,matchDay,homeTeam,awayTeam, cancel = false) {
    const response = await api.request({
      url: `/fixtures/picchetto/${championshipId}/${matchDay}/${homeTeam.id}//${awayTeam.id}`,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    // returning the product returned by the API
    return response.data
  },

  getStatsByTeamId:async function (teamId,championshipId, cancel = false) {
    // api/fixtures/statsByTeamId/:champId/fixtureid
    const response = await api.request({
      url: `/fixtures/statsByTeamId/${teamId}/${championshipId}`,
      method: "POST",
      data: {},
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  }
//   getAll: async function (id,cancel = false) {
//     const response = await api.request({
//       url: "/fixtures/:id",
//       method: "GET",
//       signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
//     })

//     return response.data.products
//   },
//   search: async function (name, cancel = false) {
//     const response = await api.request({
//       url: "/products/search",
//       method: "GET",
//       params: {
//         name: name,
//       },
//       signal: cancel ? cancelApiObject[this.search.name].handleRequestCancellation().signal : undefined,
//     })

//     return response.data.products
//   },
//   create: async function (product, cancel = false) {
//     await api.request({
//       url: `/products`,
//       method: "POST",
//       data: product,
//       signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
//     })
//   },
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(FixtureAPI)

// src/apis/productAPI.js

import { api } from "./axiosConfigs"
import { defineCancelApiObject } from "./axiosUtils"

export const FixtureAPI = {
  get: async function (id, cancel = false) {
    const response = await api.request({
      url: `/fixtures/${id}/2024`,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    // returning the product returned by the API
    return response.data
  },

  getMatchDetail: async function (fixtureId,championshipId,matchDay,homeTeam,awayTeam, cancel = false) {
    const response = await api.request({
      url: `/fixtures/picchetto/${championshipId}/${matchDay}/${homeTeam.id}/${awayTeam.id}`,
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
  },

  getPrevisionList: async function ( cancel = false) {
    const response = await api.request({
      url: `/fixtures/picchetti/all/list`,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    // returning the product returned by the API
    return response.data
  },

  getPicchettiByName: async function (picchettoName, cancel = false) {
    const response = await api.request({
      url: `/fixtures/picchetti/getbyname/name/${picchettoName}`,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    // returning the product returned by the API
    return response.data
  },

  downloadResults: async function (championshipId,lstIdmatch, cancel = false) {
    const response = await api.request({
      url: `/fixtures/multipleFixture/${championshipId}`,
      method: "POST",
      data: {"data": JSON.stringify( lstIdmatch)},
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    // returning the product returned by the API
    return response.data
  },

  getFixturesStats: async function(fixtureId,championshipId, cancel = false) {
    let url=`/fixtures/${fixtureId}/addStatisticstofixturesByChampId/${championshipId}/2024`
    const response = await api.request({
      url: url,
      method: "GET",
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    // returning the product returned by the API
    return response.data
  },

  getlinea: async function(matchDay,championshipId,homeTeam,awayTeam,lineType,underover,value, cancel = false) {
    const response = await api.request({
      url: `/fixtures/picchetto/${championshipId}/${matchDay}/${homeTeam.id}/${awayTeam.id}/linea?uo=${underover}&value=${value}&lineType=${lineType}`,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    // returning the product returned by the API
    return response.data
  }
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(FixtureAPI)

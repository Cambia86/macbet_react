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
      url: `/fixtures/picchetti/listed/all`,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    // returning the product returned by the API
    return response.data
  },

  getMultipla: async function (fromdate,todate, cancel = false) {
    const response = await api.request({
      url: `/prevision/generamultipla?fromDate=${fromdate}&toDate=${todate}`,
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
  },

  updatePrevision: async function(prevId,championshipId,fixtureId, cancel = false) {
    const response = await api.request({
      url: `/prevision/addresult/${prevId}/${championshipId}/${fixtureId}`,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    // returning the product returned by the API
    return response.data
  },

  getPicchetto: async function(championshipId,date, cancel = false) {
    const response = await api.request({
      url: `/fixtures/picchetto/${championshipId}/${date}`,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    // returning the product returned by the API
    return response.data
  },

  getHistoryResult: async function(cancel = false) {
    const response = await api.request({
      url: `/prevision/historyresult`,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    // returning the product returned by the API
    return response.data
  },

  getSogliePicchetti: async function(cancel = false) {
    const response = await api.request({
      url: `/prevision/list/soglie`,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    // returning the product returned by the API
    return response.data
  },

  savePrevisionDayInDate: async function(name,matches,cancel = false) {
    const response = await api.request({
      url: `/fixtures/picchetto/save/${name}`,
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      method: "POST",
       data: {"data": JSON.stringify( matches)},
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    // returning the product returned by the API
    return response.data
  }
  // fixtures//picchetto/save/:name
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(FixtureAPI)

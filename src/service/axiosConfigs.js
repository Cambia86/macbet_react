import axios from "axios"

// import { notification } from "antd"

export const api = axios.create({
    //baseURL: "https://macbet-be.glitch.me/api",
    baseURL:"https://macbet-backend.onrender.com/"
    //baseURL:"http://localhost:3001/api"
})

// defining a custom error handler for all APIs
const errorHandler = (error) => {
    const statusCode = error.response?.status

    if (error.code === "ERR_CANCELED") {
        return Promise.resolve()
    }

    // logging only errors that are not 401
    if (statusCode && statusCode !== 401) {
        console.error(error)
    }

    return Promise.reject(error)
}

// registering the custom error handler to the
// "api" axios instance
api.interceptors.response.use(undefined, (error) => {
    return errorHandler(error)
})
// export const api = axios.create({
//   withCredentials: false,
//   baseURL: "http://127.0.0.1:3000/api",
// })

// // defining a custom error handler for all APIs
// const errorHandler = (error) => {
//   const statusCode = error.response?.status

//   // logging only errors that are not 401
//   if (statusCode && statusCode !== 401) {
//     console.error(error)
//   }

//   return Promise.reject(error)
// }

// // registering the custom error handler to the
// // "api" axios instance
// api.interceptors.response.use(undefined, (error) => {
//   return errorHandler(error)
// })


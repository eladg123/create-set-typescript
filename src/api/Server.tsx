import axios, { AxiosInstance } from 'axios'

const publicAPI: AxiosInstance = axios.create({
  baseURL: 'https://run.mocky.io/v3/2d06d2c1-5a77-4ecd-843a-53247bcb0b94',
  timeout: 5000,
})

export { publicAPI }

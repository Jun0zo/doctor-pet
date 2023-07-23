import axios from 'axios'

export const serverURL = 'https://doctor-pet.site/api/'

export default axios.create({ baseURL: serverURL })

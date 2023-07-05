import axios from 'axios'
import qs from 'qs'

export default axios.create({
  baseURL: '/',
  paramsSerializer: {
    encode: params => {
      console.log('opam :', params)
      //   return qs.stringify(params, { arrayFormat: 'repeat' })
      console.log('oopam', qs.stringify({ a: 1 }, { arrayFormat: 'repeat' }))
      return params
    }
  }
})

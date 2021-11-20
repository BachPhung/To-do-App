import axios from 'axios'
const baseUrl = 'https://21wsp19.course.tamk.cloud/api/notes'
const userUrl = 'https://21wsp19.course.tamk.cloud/api/users'
let token = null

const setToken = newToken=>{
  token = `bearer ${newToken}`
}

const getAll = id => {
  const request = axios.get(`${userUrl}/${id}`)
  return request.then(response => response.data)
}

const create = async newObject =>{
  const config={
    headers: {Authorization: token },
  }
  const res = await axios.post(baseUrl,newObject, config)
  return res.data
}

const clear = (id) =>{
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (id,newObject) =>{
    const request = axios.put(`${baseUrl}/${id}`,newObject)
    return request.then(response=>response.data)
}

export default {getAll, create, update,setToken,clear}
import axios from "axios";
const baseUrl = 'https://21wsp19.course.tamk.cloud/api/login'
const login = async credentials =>{
    const res = await axios.post(baseUrl,credentials)
    return res.data
}

export default {login}
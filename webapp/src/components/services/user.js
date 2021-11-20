import axios from "axios"
const baseUrl = 'https://21wsp19.course.tamk.cloud/api/users'
//const baseUrl = 'http://localhost:5000/api/users'
const signUp = async input => {
    const res = await axios.post(baseUrl,input)
    return res.data
}

const changePass = async (id,obj) =>{
    const res = await axios.put(`${baseUrl}/${id}`,obj)
    return res.data
}

export default {signUp,changePass};
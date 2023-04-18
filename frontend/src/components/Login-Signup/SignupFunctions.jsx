import axios from 'axios'
let url;

process.env.NODE_ENV === 'production' ? url = process.env.URL : url = "http://localhost:8080";

export function registerUser(newUserDetails){
    let apiUrl = '${url}/register'
    return axios.post(apiUrl,newUserDetails,{
        headers:{
            'Content-Type': 'application/json'
        }
    })
}

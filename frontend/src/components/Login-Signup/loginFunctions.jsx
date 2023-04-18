import axios from 'axios'
let url;

process.env.NODE_ENV === 'production' ? url = process.env.URL : url = "http://localhost:8080";

export function logUserIn(userCredentials) {
    let apiUrl = '${url}/login'
    return axios.post(apiUrl,userCredentials, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


export function loadRoutes(){
    const authToken = sessionStorage.getItem('authToken' || '')
    let apiUrl = `${url}/user/profile?secret_token=${authToken}`
    return axios.get(apiUrl)
}

export function getCurrentUserDetails(authToken){
    const token =  authToken
    let apiUrl = `${url}/user/profile?secret_token=${token}`
    return axios.get(apiUrl)
}
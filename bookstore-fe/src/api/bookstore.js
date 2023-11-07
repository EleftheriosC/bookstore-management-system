import axios from "axios";

// const instance = axios.create({
//     baseURL: 'https://localhost:7249'
// });
//
// instance.interceptors.request.use(function (config){
//     const token = 'AUTH_TOKEN';
//     config.headers.Authorization = `Bearer ${token}`
//     return config;
// });
//
// export default instance;

export default axios.create({
    baseURL: 'http://localhost:5001'
})
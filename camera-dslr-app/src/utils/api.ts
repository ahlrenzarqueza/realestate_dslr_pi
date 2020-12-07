import axios, {AxiosRequestConfig} from 'axios';

export const baseURL = "http://localhost:5000";

export const instance = axios.create({baseURL});

export default <T>(options: AxiosRequestConfig) => {
    const instance = axios.create({baseURL});
    return instance.request<T>(options);
};


// const api = {
//     login: (request) => {
//         const unwrapreq = ({email, password}) => ({email, password});
//         const reqbody = unwrapreq(request);
//         const prm = axios.post('user/login', reqbody);
//         return prm.then(function (resp) {
//             return resp;
//         }).catch(function (err) {
//             throw err;
//         });
//     },

//     isAuthenticated: async () => {
//         const userapi = await axios.post('user/getuser');
//         return userapi.data;
//     },

//     logout: async () => {
//         const api = await axios.post('user/logout');
//         return api.data;
//     }
// }

// export default api
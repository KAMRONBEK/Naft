import axios from 'axios';
// import {userLoaded} from '../redux/actions';
// import AsyncStorage from '@react-native-community/async-storage';

export const url = 'http://naft.uz/api/v1/';

// export const configureAxios = store => {
//     let interceptor = axios.interceptors.response.use(
//         res => res,
//         error => {
//             if (!error || !error.response || error.response.status !== 401) {
//                 return Promise.reject(error);
//             }
//             axios.interceptors.response.eject(interceptor);
//             console.warn(store.getState());

//             return requests.auth
//                 .refreshToken(store.getState().user.token)
//                 .then(res => {
//                     error.response.config.headers = {
//                         Authorization: `Bearer ${res.data.data}`
//                     };
//                     AsyncStorage.setItem('@token', res.data.data);
//                     store.dispatch(userLoaded({token: res.data.data}));
//                     return axios(error.response.config);
//                 })
//                 .catch(response => {
//                     return Promise.reject(response);
//                 })
//                 .finally(() => configureAxios(store));
//         }
//     );
// };

// let formData = rawData => {
//     let form = new FormData();
//     Object.keys(rawData).forEach(key => {
//         form.append(key, rawData[key]);
//     });
//     return form;
// };

let requests = {
    auth: {
        login: credentials =>
            axios.post(`${url}/auth/signin`, credentials).then(res => res),
        register: data =>
            axios.post(`${url}/auth/signup`, data).then(res => res),
        refreshToken: token =>
            axios.post(`${url}/auth/refresh-token?token=${token}`)
    },
    list: {
        getCategory: () =>
            axios.get(`${url}list/get-categories`).then(res => res)
    }
};

export default requests;

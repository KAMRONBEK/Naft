import axios from 'axios';
import {url} from './config';
// import {userLoaded} from '../redux/actions';
// import AsyncStorage from '@react-native-community/async-storage';

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
let formData = rawData => {
    let form = new FormData();
    Object.keys(rawData).forEach(key => {
        if (Array.isArray(rawData[key])) {
            let obj = rawData[key];
            for (let index in obj) {
                form.append(`${key}[${index}]`, obj[index]);
            }
            return;
        }
        if (typeof rawData[key] === 'object') {
            let obj = rawData[key];
            let i = 0;
            Object.keys(obj).forEach((id, index) => {
                if (obj[id]) form.append(`${key}[${i++}]`, parseInt(id));
            });
            return;
        }
        form.append(key, rawData[key]);
    });
    return form;
};

let requests = {
    auth: {
        login: data =>
            axios.post(`${url}user/do-login?`, formData(data)).then(res => res),
        register: (
            first_name,
            last_name,
            email,
            password,
            role = 'freelancer',
            employees = '',
            department_name = '',
            location = ''
        ) =>
            axios
                .post(
                    `${url}register?first_name=${first_name}&last_name=${last_name}&email=${email}&password=${password}&role=${role}&employees=${employees}&department_name=${department_name}&locations=${location}`
                )
                .then(res => res),
        refreshToken: token =>
            axios.post(`${url}auth/refresh-token?token=${token}`)
    },
    list: {
        getCategory: () =>
            axios.get(`${url}list/get-categories`).then(res => res),
        getFreelancer: (
            type = 'latest',
            count = 10,
            id = '',
            page_number = ''
        ) =>
            axios.get(
                `${url}listing/get-freelancers?profile_id=${id}&listing_type=${type}&show_users=${count}&page_number=${page_number}`
            ),
        getJobs: (
            type = 'latest',
            count = 10,
            id = '',
            page_number = '',
            company_id = ''
        ) =>
            axios.get(
                `${url}listing/get-jobs?profile_id=${id}&listing_type=${type}&show_users=${count}&page_number=${page_number}&company_id=${company_id}`
            ),
        getCompanies: (
            type = 'latest',
            count = 10,
            page_number = '',
            id = ''
        ) =>
            axios.get(
                `${url}listing/get-employers?profile_id=${id}&listing_type=${type}&show_users=${count}&page_number=${page_number}`
            )
    }
};

export default requests;

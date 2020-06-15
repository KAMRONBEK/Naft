import {SHOW_LOADING, HIDE_LOADING} from '../types';

export const showLoading = payload => ({
    type: SHOW_LOADING,
    payload
});

export const hideLoading = () => ({
    type: HIDE_LOADING
});

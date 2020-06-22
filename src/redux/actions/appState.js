import {SHOW_LOADING, HIDE_LOADING, SHOW_MODAL, HIDE_MODAL} from '../types';

export const showLoading = payload => ({
    type: SHOW_LOADING,
    payload
});

export const hideLoading = () => ({
    type: HIDE_LOADING
});

export const showModal = payload => ({
    type: SHOW_MODAL,
    payload
});

export const hideModal = () => ({
    type: HIDE_MODAL
});

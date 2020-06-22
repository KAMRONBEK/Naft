import {SHOW_LOADING, HIDE_LOADING, SHOW_MODAL, HIDE_MODAL} from '../types';

const INITIAL_STATE = {
    isLoading: false,
    loadingMessage: '',
    modalVisible: false,
    modalMessage: '',
    modalType: ''
};

export default (state = INITIAL_STATE, {type, payload}) => {
    switch (type) {
        case SHOW_LOADING:
            return {...state, isLoading: true, loadingMessage: payload};
        case HIDE_LOADING:
            return {...state, isLoading: false, loadingMessage: ''};
        case SHOW_MODAL:
            return {
                ...state,
                modalVisible: true,
                modalMessage: payload.message,
                modalType: payload.type
            };
        case HIDE_MODAL:
            return {
                ...state,
                modalVisible: false,
                modalMessage: '',
                modalType: ''
            };
        default:
            return state;
    }
};

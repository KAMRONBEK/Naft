import {SHOW_LOADING, HIDE_LOADING} from '../types';

const INITIAL_STATE = {
    isLoading: false,
    loadingMessage: ''
};

export default (state = INITIAL_STATE, {type, payload}) => {
    switch (type) {
        case SHOW_LOADING:
            return {...state, isLoading: true, loadingMessage: payload};
        case HIDE_LOADING:
            return {...state, isLoading: false, loadingMessage: ''};
        default:
            return state;
    }
};

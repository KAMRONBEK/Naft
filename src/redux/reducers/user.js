import {USER_LOADED, USER_LOGGED_IN, USER_LOGGED_OUT} from '../types';
import AsyncStorage from '@react-native-community/async-storage';

const INITIAL_STATE = {
    type: '',
    profile: {}
};

export default (state = INITIAL_STATE, {type, payload}) => {
    switch (type) {
        case USER_LOADED:
            return {...state, ...payload};
        case USER_LOGGED_IN:
            let newState = {...state, ...payload};
            AsyncStorage.setItem('@user', JSON.stringify(newState));
            return newState;
        case USER_LOGGED_OUT:
            AsyncStorage.setItem('@user', '');
            return INITIAL_STATE;
        default:
            return state;
    }
};

import {USER_LOADED, USER_LOGGED_IN, USER_LOGGED_OUT} from '../types';

export const userLoaded = payload => ({
    type: USER_LOADED,
    payload
});

export const userLoggedIn = payload => ({
    type: USER_LOGGED_IN,
    payload
});

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
});

import {createStore, combineReducers} from 'redux';
import {appState,user} from './reducers';

export let configureStore = () => {
    let reducers = combineReducers({appState,user});
    return createStore(reducers);
};

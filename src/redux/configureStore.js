import {createStore, combineReducers} from 'redux';
import {appState} from './reducers';

export let configureStore = () => {
    let reducers = combineReducers({appState});
    return createStore(reducers);
};

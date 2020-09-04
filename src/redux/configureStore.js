import {createStore, combineReducers} from 'redux';
import {appState, user} from './reducers';
import Reactotron from './ReactotronConfig';

export let configureStore = () => {
    let reducers = combineReducers({appState, user});
    const store = createStore(reducers, Reactotron.createEnhancer());
    return store;
};

import 'react-native-gesture-handler';
import React from 'react';
import {UIManager, Platform} from 'react-native';
import AppRouter from './src/routes/AppRouter';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {configureStore} from './src/redux/configureStore';
import {configureAxios} from './src/api/config';
import LoadingModal from './src/components/LoadingModal';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const App = () => {
    let store = configureStore();
    // configureAxios(store);
    return (
        <Provider store={store}>
            <NavigationContainer>
                <AppRouter />
                <LoadingModal />
            </NavigationContainer>
        </Provider>
    );
};

export default App;

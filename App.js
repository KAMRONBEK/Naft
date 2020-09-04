import 'react-native-gesture-handler';
import React from 'react';
import {UIManager, Platform, View} from 'react-native';
import AppRouter from './src/routes/AppRouter';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {configureStore} from './src/redux/configureStore';
import {configureAxios} from './src/api/config';
import LoadingModal from './src/components/LoadingModal';
import {
    SafeAreaContext,
    SafeAreaProvider
} from 'react-native-safe-area-context';
import Modal from './src/components/Modal';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

if (__DEV__) {
    import('./src/redux/ReactotronConfig').then(() =>
        console.log('Reactotron Configured')
    );
}

const App = () => {
    let store = configureStore();
    // configureAxios(store);
    return (
        <SafeAreaProvider>
            <SafeAreaContext.Consumer>
                {insents => (
                    <View
                        style={{
                            paddingTop: insents.top,
                            paddingBottom: insents.bottom,
                            flex: 1
                        }}>
                        <Provider store={store}>
                            {/* <NavigationContainer> */}
                            <AppRouter />
                            <LoadingModal />
                            <Modal />
                            {/* </NavigationContainer> */}
                        </Provider>
                    </View>
                )}
            </SafeAreaContext.Consumer>
        </SafeAreaProvider>
    );
};

export default App;

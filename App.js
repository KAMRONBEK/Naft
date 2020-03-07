import 'react-native-gesture-handler';
import React from 'react';
import {UIManager, Platform} from 'react-native';
import AppRouter from './src/routes/AppRouter';
import {NavigationContainer} from '@react-navigation/native';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const App = () => {
    return (
        <NavigationContainer>
            <AppRouter />
        </NavigationContainer>
    );
};

export default App;

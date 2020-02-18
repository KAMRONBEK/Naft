import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Header from '../components/Header';

const HomeStack = createStackNavigator();
const JobsStack = createStackNavigator();
const FreelancerStack = createStackNavigator();
const CompanyStack = createStackNavigator();
const SettingsStack = createStackNavigator();

let AppRouter = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="Home"
                component={Home}
                options={{
                    header: () => <Header />
                }}
            />
        </HomeStack.Navigator>
    );
};

export default AppRouter;

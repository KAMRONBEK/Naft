import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Home, Settings, Jobs, Freelancer, Company} from '../screens';
import Header from '../components/Header';
import colors from '../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

let AppRouter = () => {
    const Stack = createStackNavigator();
    const BottomTab = createMaterialBottomTabNavigator();
    const Drawer = createDrawerNavigator();

    const HomeStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="HomeStack"
                    component={Home}
                    options={{
                        header: () => <Header />
                    }}
                />
            </Stack.Navigator>
        );
    };
    const JobsStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="JobsStack"
                    component={Jobs}
                    options={{
                        header: () => <Header />
                    }}
                />
            </Stack.Navigator>
        );
    };
    const FreelancerStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="FreelancerStack"
                    component={Freelancer}
                    options={{
                        header: () => <Header />
                    }}
                />
            </Stack.Navigator>
        );
    };
    const CompanyStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="CompanyStack"
                    component={Company}
                    options={{
                        header: () => <Header />
                    }}
                />
            </Stack.Navigator>
        );
    };
    const SettingsStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="SettingsStack"
                    component={Settings}
                    options={{
                        header: () => <Header />
                    }}
                />
            </Stack.Navigator>
        );
    };

    const DrawerStack = () => {
        return (
            <Drawer.Navigator drawerType="slide">
                {/* <Drawer.Screen name="Home" children={HomeStack} />
                <Drawer.Screen name="Jobs" children={JobsStack} />
                <Drawer.Screen name="Freelancer" children={FreelancerStack} />
                <Drawer.Screen name="Company" children={CompanyStack} />
                <Drawer.Screen name="Settings" children={SettingsStack} /> */}
                <Drawer.Screen
                    name="BottomTab"
                    children={BottomTabStack}
                    options={{
                        header: () => <Header />
                    }}
                />
            </Drawer.Navigator>
        );
    };

    const BottomTabStack = () => {
        return (
            <BottomTab.Navigator
                shifting={false}
                labelStyle={{fontSize: 14}}
                backBehavior="history"
                style={{backgroundColor: colors.white}}>
                <BottomTab.Screen
                    name="Home"
                    children={HomeStack}
                    options={{
                        tabBarIcon: () => {
                            <AntDesign
                                name="home"
                                size={20}
                                color={colors.black}
                            />;
                        }
                    }}
                />
                <BottomTab.Screen name="Jobs" children={JobsStack} />
                <BottomTab.Screen
                    name="Freelancer"
                    children={FreelancerStack}
                />
                <BottomTab.Screen name="Company" children={CompanyStack} />
                <BottomTab.Screen name="Settings" children={SettingsStack} />
            </BottomTab.Navigator>
        );
    };

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Drawer"
                children={DrawerStack}
                options={{
                    header: () => {}
                }}
            />
        </Stack.Navigator>
    );
};

export default AppRouter;

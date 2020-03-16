import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
    Home,
    Settings,
    Jobs,
    Freelancer,
    Company,
    FreelancerPage,
    CompanyPage,
    JobPage
} from '../screens';
import Header from '../components/Header';
import colors from '../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import DrawerContent from '../components/DrawerContent';
import Animated from 'react-native-reanimated';

let AppRouter = () => {
    const Stack = createStackNavigator();
    const BottomTab = createMaterialBottomTabNavigator();
    const Drawer = createDrawerNavigator();
    const TopTab = createMaterialTopTabNavigator();

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
                <Stack.Screen
                    name="JobPage"
                    component={JobPage}
                    options={{header: () => <Header back={true} />}}
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
                <Stack.Screen
                    name="FreelancerPage"
                    component={FreelancerPage}
                    options={{
                        header: () => <Header back={true} />
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
                <Stack.Screen
                    name="CompanyPage"
                    component={CompanyPage}
                    options={{
                        header: () => <Header back={true} />
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
                        header: () => <Header progress={progress} />
                    }}
                />
            </Stack.Navigator>
        );
    };

    const BottomTabStack = () => {
        return (
            <TopTab.Navigator
                tabBarPosition="bottom"
                barStyle={{
                    backgroundColor: colors.white,
                    justifyContent: 'center'
                }}
                // lazy={true}
                swipeEnabled={false}
                tabBarOptions={{
                    labelStyle: {
                        margin: 0,
                        marginBottom: 3,
                        fontSize: 12,
                        textTransform: 'none',
                        height: 20
                    },
                    indicatorStyle: {
                        backgroundColor: colors.red
                    },
                    tabStyle: {
                        padding: 0,
                        paddingVertical: 5
                    },

                    showIcon: true,
                    adaptive: true
                }}>
                <TopTab.Screen
                    name="Home"
                    children={HomeStack}
                    options={{
                        tabBarIcon: () => (
                            <AntDesign
                                name="home"
                                size={24}
                                color={colors.black}
                            />
                        )
                    }}
                />
                <TopTab.Screen
                    name="Jobs"
                    children={JobsStack}
                    options={{
                        tabBarIcon: () => (
                            <AntDesign
                                name="iconfontdesktop"
                                size={24}
                                color={colors.black}
                            />
                        )
                    }}
                />
                <TopTab.Screen
                    name="Freelancer"
                    children={FreelancerStack}
                    options={{
                        tabBarIcon: () => (
                            <AntDesign
                                name="rest"
                                size={24}
                                color={colors.black}
                            />
                        )
                    }}
                />
                <TopTab.Screen
                    name="Company"
                    children={CompanyStack}
                    options={{
                        tabBarIcon: () => (
                            <SimpleLineIcons
                                name="briefcase"
                                size={24}
                                color={colors.black}
                            />
                        )
                    }}
                />
                <TopTab.Screen
                    name="Settings"
                    children={SettingsStack}
                    options={{
                        tabBarIcon: () => (
                            <AntDesign
                                name="setting"
                                size={24}
                                color={colors.black}
                            />
                        )
                    }}
                />
            </TopTab.Navigator>
        );
    };

    let progress = null;
    const DrawerStack = () => {
        return (
            <Drawer.Navigator
                drawerType="slide"
                drawerContent={props => {
                    progress = props.progress;
                    return <DrawerContent {...props} />;
                }}
                drawerContentOptions={{
                    activeTintColor: colors.red
                }}
                drawerStyle={{
                    width: 100
                }}>
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

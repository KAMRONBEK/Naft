import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Text} from 'react-native';
import {
    Home,
    Settings,
    Jobs,
    Freelancer,
    Company,
    FreelancerPage,
    CompanyPage,
    JobPage,
    Register,
    Auth
} from '../screens';
import Header from '../components/Header';
import colors from '../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import DrawerContent from '../components/DrawerContent';
import strings from '../locales/strings';

let JobsStack = createStackNavigator(
    {
        Jobs: {
            screen: Jobs,
            navigationOptions: {
                header: () => <Header />
            }
        },
        JobPage: {
            screen: JobPage,
            navigationOptions: {
                header: () => <Header back={true} />
            }
        }
    },
    {
        mode: 'modal',
        transparentCard: true,
        cardStyle: {
            backgroundColor: 'transparent',
            opacity: 1
        },
        navigationOptions: {
            mode: 'modal'
        }
    }
);

let FreelancerStack = createStackNavigator({
    Freelancer: {
        screen: Freelancer,
        navigationOptions: {
            header: () => <Header />
        }
    },
    FreelancerPage: {
        screen: FreelancerPage,
        navigationOptions: {
            header: () => <Header back={true} />
        }
    }
});

let CompanyStack = createStackNavigator({
    Company: {
        screen: Company,
        navigationOptions: {
            header: () => <Header />
        }
    },
    CompanyPage: {
        screen: CompanyPage,
        navigationOptions: {
            header: () => <Header back={true} />
        }
    }
});

let TabNavigator = createMaterialTopTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarIcon: () => (
                    <AntDesign name="home" size={24} color={colors.black} />
                ),
                tabBarLabel: () => {
                    return <Text>Home</Text>;
                }
            }
        },
        Jobs: {
            screen: JobsStack,
            navigationOptions: {
                tabBarIcon: () => (
                    <AntDesign
                        name="iconfontdesktop"
                        size={24}
                        color={colors.black}
                    />
                ),
                tabBarLabel: () => {
                    return <Text>Jobs</Text>;
                }
            }
        },
        Freelancer: {
            screen: FreelancerStack,
            navigationOptions: {
                tabBarIcon: () => (
                    <AntDesign name="rest" size={24} color={colors.black} />
                ),
                tabBarLabel: () => {
                    return <Text>Freelancer</Text>;
                }
            }
        },
        Company: {
            screen: CompanyStack,
            navigationOptions: {
                tabBarIcon: () => (
                    <SimpleLineIcons
                        name="briefcase"
                        size={24}
                        color={colors.black}
                    />
                ),
                tabBarLabel: () => {
                    return <Text>Company</Text>;
                }
            }
        },
        Settings: {
            screen: Settings,
            navigationOptions: {
                tabBarIcon: () => (
                    <AntDesign name="setting" size={24} color={colors.black} />
                ),
                tabBarLabel: () => {
                    return <Text>Settings</Text>;
                }
            }
        }
    },
    {
        swipeEnabled: false,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            style: {
                backgroundColor: colors.white
            },
            labelStyle: {
                margin: 0,
                marginBottom: 3,
                fontSize: 12,
                textTransform: 'none',
                height: 20,
                color: colors.black
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
        }
    }
);

let AuthStack = createStackNavigator({
    Login: {
        screen: Auth,
        navigationOptions: {
            header: () => <Header title={strings.login} back noMenu />
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
            header: () => <Header title={strings.register} back noMenu />
        }
    }
});

let AuthvsTab = createStackNavigator({
    tab: {
        screen: TabNavigator,
        navigationOptions: {
            headerShown: false
        }
    },
    auth: {
        screen: AuthStack,
        navigationOptions: {
            headerShown: false
        }
    }
});

let DrawerNavigator = createDrawerNavigator(
    {
        AuthvsTab
    },
    {
        drawerType: 'slide',
        contentComponent: props => {
            progress = props.progress;
            return <DrawerContent {...props} />;
        },
        // drawerContentOptions: {
        //     activeTintColor: colors.red
        // },
        drawerWidth: 100
    }
);

// let AuthSwitch = createSwitchNavigator({
//     DrawerNavigator
// });

let App = createAppContainer(DrawerNavigator);
export default App;

import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Text, View} from 'react-native';
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
    Auth,
    Loader,
    Activation
} from '../screens';
import Header from '../components/Header';
import colors from '../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import DrawerContent from '../components/DrawerContent';
import strings from '../locales/strings';
import {connect} from 'react-redux';

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

let TabRoutes = {
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarIcon: () => (
                <AntDesign name="home" size={24} color={colors.black} />
            ),
            tabBarLabel: () => {
                return <Text>{strings.main}</Text>;
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
                return <Text>{strings.jobs}</Text>;
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
                return <Text>{strings.freelancers}</Text>;
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
                return <Text>{strings.company}</Text>;
            }
        }
    }
};

const mapStateToProps = ({user}) => ({user});

let tabOptions = {
    swipeEnabled: false,
    tabBarPosition: 'bottom',
    lazy: false,
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
};

let Tabs = createMaterialTopTabNavigator(TabRoutes, tabOptions);
let WithSettingsTabs = createMaterialTopTabNavigator(
    {
        ...TabRoutes,
        Settings: {
            screen: Settings,
            navigationOptions: {
                tabBarIcon: () => (
                    <AntDesign name="setting" size={24} color={colors.black} />
                ),
                tabBarLabel: () => {
                    return <Text>{strings.settings}</Text>;
                }
            }
        }
    },
    tabOptions
);

let AuthStack = createStackNavigator({
    Login: {
        screen: Auth,
        navigationOptions: {
            header: () => <Header title={strings.login} noMenu />
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
            header: () => <Header title={strings.register} noMenu />
        }
    },
    Activation: {
        screen: Activation,
        navigationOptions: {
            header: () => <Header title={strings.activation} back noMenu />
        }
    }
});

let AuthvsTab = createStackNavigator({
    Loader: {
        screen: Loader,
        navigationOptions: {
            headerShown: false
        }
    },
    tab: {
        screen: Tabs,
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

let DrawerWithSettings = createDrawerNavigator(
    {
        AuthvsTab: createStackNavigator({
            tab: {
                screen: WithSettingsTabs,
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
        })
    },
    {
        drawerType: 'slide',
        contentComponent: props => {
            progress = props.progress;
            return <DrawerContent {...props} />;
        },
        drawerWidth: 100
    }
);

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
        drawerWidth: 100
    }
);

let AppRouter = ({user}) => {
    if (user && user.type === 'success') {
        let App = createAppContainer(DrawerWithSettings);
        return <App />;
    }
    let App = createAppContainer(DrawerNavigator);
    return <App />;
};

export default connect(mapStateToProps)(AppRouter);

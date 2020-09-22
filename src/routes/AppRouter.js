import React from 'react';

import {connect} from 'react-redux';

import {createDrawerNavigator} from 'react-navigation-drawer';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {
    Home,
    List,
    Info,
    BuyAccount,
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
    Activation,
    ForgotPassword
} from '../screens';

import Header from '../components/Header';
import DrawerContent from '../components/DrawerContent';

import colors from '../constants/colors';
import strings from '../locales/strings';

const mapStateToProps = ({user}) => ({user});

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

let HomeStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            header: () => <Header />
        }
    },
    JobsList: {
        screen: Jobs,
        navigationOptions: {
            header: () => <Header />
        }
    },
    List: {
        screen: List,
        navigationOptions: {
            header: () => <Header />
        }
    },
    Info: {
        screen: Info,
        navigationOptions: {
            header: () => <Header title={'Avto-powerball'} />
        }
    }
});

let TabRoutes = {
    Home: {
        screen: HomeStack,
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

// let Tabs = createMaterialTopTabNavigator(TabRoutes, tabOptions);
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

let AuthStack = createSwitchNavigator({
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
    ForgotPassword: {
        screen: ForgotPassword,
        navigationOptions: {
            header: () => <Header title={strings.forgotPassword} noMenu />
        }
    },
    Activation: {
        screen: Activation,
        navigationOptions: {
            header: () => <Header title={strings.activation} back noMenu />
        }
    },
});

let BuyAccountStack = createSwitchNavigator({
    BuyAccount: {
        screen: BuyAccount,
        navigationOptions: {
            headerShown: false
        }
    }
})

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


let AppRouter = ({user}) => {
    if (user && user.type === 'success') {
        let App
        let { pmeta } = user.profile
        // pmeta.is_paid = 1
        if(pmeta.is_paid){
            App = createAppContainer(DrawerWithSettings);
        } else {
            App = createAppContainer(BuyAccountStack)
        }
        return <App />;
    }
    let App = createAppContainer(AuthStack)
    return <App />;
};

export default connect(mapStateToProps)(AppRouter);
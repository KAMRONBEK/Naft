import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Linking,
    TouchableWithoutFeedback
} from 'react-native';
import colors from '../constants/colors';
import DrawetItem from '../components/DrawerItem';
import {
    userLoggedOut,
    userLoaded,
    showLoading,
    hideLoading
} from '../redux/actions';
import {connect} from 'react-redux';
import strings from '../locales/strings';
import images from '../assets/images';
// import {color} from 'react-native-reanimated';

const DrawerContent = ({userLoggedOut, navigation, user}) => {
    return (
        <View style={styles.container}>
            <View style={styles.top} />
            <View style={styles.bottom}>
                <View style={styles.avatarWrapper}>
                    <Image
                        style={[
                            styles.avatar,
                            !user.profile.pmeta && {
                                tintColor: colors.white,
                                width: 50,
                                height: 50
                            }
                        ]}
                        source={
                            !!user.profile.pmeta
                                ? {
                                      uri: user.profile.pmeta.profile_img
                                  }
                                : images.logo
                        }
                    />
                </View>
                <View style={styles.menus}>
                    {user.type == 'success' ? (
                        <>
                            <DrawetItem
                                name={strings.main}
                                antIcon="home"
                                to="Home"
                                simpleIcon=""
                            />
                            <DrawetItem
                                name={strings.jobs}
                                antIcon="iconfontdesktop"
                                to="Jobs"
                                simpleIcon=""
                            />
                            <DrawetItem
                                name={strings.freelancers}
                                antIcon="rest"
                                to="Freelancer"
                                simpleIcon=""
                            />
                            <DrawetItem
                                name={strings.company}
                                antIcon=""
                                to="Company"
                                simpleIcon="briefcase"
                            />
                            <DrawetItem
                                name={strings.settings}
                                antIcon="setting"
                                to="Settings"
                                simpleIcon=""
                            />
                            <DrawetItem
                                name={strings.aboutUs}
                                antIcon="customerservice"
                                to={`http://naft.uz/page/o-nas`}
                                simpleIcon=""
                                link
                            />
                            <DrawetItem
                                name={strings.logout}
                                antIcon="poweroff"
                                to=""
                                onPress={() => {
                                    userLoggedOut();
                                    navigation.navigate('Home');
                                }}
                                simpleIcon=""
                            />
                        </>
                    ) : (
                        <View style={styles.registerWrapper}>
                            <DrawetItem
                                name={strings.login}
                                antIcon="user"
                                to="Login"
                                simpleIcon=""
                            />
                            <DrawetItem
                                name={strings.ourWebsite}
                                simpleIcon="globe"
                                onPress={() => {
                                    Linking.openURL('http://naft.uz/');
                                }}
                            />
                        </View>
                    )}
                    <DrawetItem
                        name={strings.list}
                        simpleIcon="list"
                        to="List"
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    top: {
        backgroundColor: colors.red,
        // backgroundColor: colors.darkGray,
        height: 100
    },
    avatarWrapper: {
        width: 60,
        height: 60,
        borderRadius: 60,
        overflow: 'hidden',
        top: -30,
        zIndex: 100,
        position: 'absolute',
        borderWidth: 1,
        borderColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.darkGrayBlue
    },
    avatar: {
        height: 60,
        width: 60,
        resizeMode: 'cover'
    },
    bottom: {
        flex: 1,
        backgroundColor: colors.white,
        // backgroundColor: colors.darkGrayBlue,
        alignItems: 'center'
    },
    menus: {
        flex: 1,
        paddingTop: 40,
        justifyContent: 'flex-start'
    },
    registerWrapper: {
        justifyContent: 'space-between',
        flex: 1
    }
});

const mapStateToProps = ({user}) => ({
    user
});

const mapDispatchToProps = {
    userLoggedOut
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DrawerContent);

import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import colors from '../constants/colors';
import DrawetItem from '../components/DrawerItem';

const DrawerContent = () => {
    return (
        <View style={styles.container}>
            <View style={styles.top} />
            <View style={styles.bottom}>
                <View style={styles.avatarWrapper}>
                    <Image
                        style={styles.avatar}
                        source={{
                            uri:
                                'https://mulder-onions.com/wp-content/uploads/2017/02/White-square.jpg'
                        }}
                    />
                </View>
                <View style={styles.menus}>
                    <DrawetItem
                        name="Home"
                        antIcon="home"
                        to="Home"
                        simpleIcon=""
                    />
                    <DrawetItem
                        name="Jobs"
                        antIcon="iconfontdesktop"
                        to="Jobs"
                        simpleIcon=""
                    />
                    <DrawetItem
                        name="Freelancer"
                        antIcon="rest"
                        to="Freelancer"
                        simpleIcon=""
                    />
                    <DrawetItem
                        name="Company"
                        antIcon=""
                        to="Company"
                        simpleIcon="briefcase"
                    />
                    <DrawetItem
                        name="Settings"
                        antIcon="setting"
                        to="Settings"
                        simpleIcon=""
                    />
                    <DrawetItem
                        name="About Us"
                        antIcon="customerservice"
                        to="About"
                        simpleIcon=""
                    />
                    <DrawetItem
                        name="Logout"
                        antIcon="poweroff"
                        to=""
                        onPress={() => {}}
                        simpleIcon=""
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
        borderColor: colors.paleGray
    },
    avatar: {
        width: 60,
        height: 60
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
        justifyContent: 'space-evenly'
    }
});

export default DrawerContent;

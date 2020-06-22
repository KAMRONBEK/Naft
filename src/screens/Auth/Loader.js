import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {
    showLoading,
    hideLoading,
    userLoaded,
    userLoggedOut
} from '../../redux/actions';
import AsyncStorage from '@react-native-community/async-storage';
import images from '../../assets/images';
import colors from '../../constants/colors';
import requests from '../../api/requests';
import strings from '../../locales/strings';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const Loader = ({navigation, showLoading, hideLoading}) => {
    let bootstrap = async () => {
        showLoading(strings.loading);
        let userData = await AsyncStorage.getItem('@user');
        if (userData) {
            console.warn('loader');
            let parsedUser = JSON.parse(userData);
            console.warn(parsedUser);
            requests.auth
                .login({
                    email: parsedUser.profile.umeta.user_email,
                    password: parsedUser.profile.umeta.user_pass
                })
                .then(res => {
                    if (res.data.type == 'success') {
                        // console.warn(parsedUser);
                        userLoaded(parsedUser);
                    }
                })
                .catch(err => {
                    console.warn(err.message, 'error');
                    userLoggedOut();
                })
                .finally(() => {
                    hideLoading();
                    navigation.navigate('Home');
                });
        } else {
            console.warn('no user');
            hideLoading();
            navigation.navigate('Home');
            userLoggedOut();
        }
    };

    useEffect(() => {
        bootstrap();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback
                onPress={() => {
                    console.warn('click');

                    navigation.navigate('Login');
                }}>
                <Image source={images.logo} style={styles.logo} />
            </TouchableWithoutFeedback>
        </View>
    );
};

let {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: deviceWidth,
        resizeMode: 'contain'
    }
});

const mapStateToProps = ({user}) => ({
    user
});

const mapDispatchToProps = {
    hideLoading,
    showLoading,
    userLoaded,
    userLoggedOut
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Loader);

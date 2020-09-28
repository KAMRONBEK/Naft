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
import { useNavigation } from '@react-navigation/native'

const Loader = ({
    navigation,
    showLoading,
    hideLoading,
    userLoaded,
    userLoggedOut
}) => {
    let bootstrap = async () => {
        showLoading(strings.loading);
        let userData = await AsyncStorage.getItem('@user');
        if (!userData) {
            console.log('userData: ', userData)
            console.log('if - 1')
            navigation.navigate('Login');
            return;
        }
        if (userData) {
            console.log('if - 2')
            console.warn('loader');
            let parsedUser = JSON.parse(userData);
            console.warn(
                parsedUser.profile.umeta.user_number,
                parsedUser.profile.umeta.user_pass
            );
            requests.auth
                .login({
                    phone: parsedUser.profile.umeta.user_number,
                    password: parsedUser.profile.umeta.user_pass
                })
                .then(res => {
                    console.warn(res.data.type);
                    if (res.data.type == 'success') {
                        console.warn('navigation');
                        userLoaded(parsedUser);
                        navigation.navigate('Home');
                    } else {
                        console.warn('cant login with asyncs');
                    }
                })
                .catch(err => {
                    console.warn('inside error');
                    console.warn(err.message, 'error');
                    userLoggedOut();
                })
                .finally(() => {
                    hideLoading();
                    navigation.navigate('Home');
                });
        } else {
            console.log('else')
            console.warn('no user');
            hideLoading();
            navigation.navigate('Home');
            userLoggedOut();
        }
    };

    useEffect(() => {
        console.log('loader effect: ')
        bootstrap();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback>
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

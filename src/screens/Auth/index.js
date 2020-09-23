import React, {useState, useEffect} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import {connect} from 'react-redux';
import requests from '../../api/requests';
import {
    userLoggedIn,
    userLoaded,
    showLoading,
    hideLoading
} from '../../redux/actions';

import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
    InteractionManager
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import RectangleButton from '../../components/RectangleButton';

import colors from '../../constants/colors';
import strings from '../../locales/strings';

const mapStateToProps = ({user}) => ({
    user
});

const mapDispatchToProps = {
    userLoggedIn,
    showLoading,
    hideLoading,
    userLoaded
};

const Auth = ({
    user,
    navigation,
    showLoading,
    userLoaded,
    hideLoading,
    userLoggedIn,
}) => {
    let [phone, setPhone] = useState('');
    let [password, setPassword] = useState('');

    let [errorEntry, setErrorEntry] = useState('');
    let [internetError, setInternetError] = useState('');

    const effect = () => {
        AsyncStorage.getItem('@user')
            .then(userData => {
                if(userData){
                    showLoading(strings.loggingIn);
                    let parsedUser = JSON.parse(userData);
                    requests.auth
                        .login({
                            phone: parsedUser.profile.umeta.user_number,
                            password: parsedUser.profile.umeta.user_pass
                        })
                        .then(res => {
                            hideLoading();
                            if (res.data.type == 'success') {
                                userLoaded(parsedUser);
                            } else {
                                console.warn('cant login with asyncs');
                            }
                        })            
                }
            })
    }

    useEffect(() => {
        effect()
    }, [])

    const onChangePhone = text => {
        if(!phone.length){
            setPhone('+' + text)
        } else {
            setPhone(text)
        }
    }

    const onLoginPress = () => {
        showLoading(strings.loggingIn);
        requests.auth
            .login({phone: phone, password: password})
            .then(res => {
                hideLoading();
                if (res.data.type === 'success') {
                    setErrorEntry('')
                    userLoggedIn(res.data);
                } else {
                    setErrorEntry(res.data.message);
                }
            })
            .catch(err => {
                console.warn(err);
                hideLoading();
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Naft</Text>
                <Text
                    style={[
                        styles.desc,
                        {
                            color: !errorEntry ? colors.darkGray : colors.red
                        }
                    ]}>
                    {!errorEntry ? strings.naftDescription : errorEntry}
                </Text>
                <View style={styles.inputs}>
                    <View
                        style={[
                            styles.inputWrapper,
                            {
                                borderBottomWidth: 0.5
                            }
                        ]}>
                        <TextInput
                            value={phone}
                            onChangeText={onChangePhone}
                            placeholder={strings.enterPhoneNumber}
                            keyboardType="number-pad"
                            style={styles.input}
                        />
                        <EvilIcons name="envelope" size={25} />
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            onChangeText={text => setPassword(text)}
                            secureTextEntry={true}
                            placeholder={strings.password}
                            style={styles.input}
                        />
                        <EvilIcons name="lock" size={25} />
                    </View>
                </View>
                <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('ForgotPassword')}
                >
                    <Text style={styles.forgotPassword}>
                        {strings.forgotPassword}
                    </Text>
                </TouchableWithoutFeedback>
                <View style={styles.buttonWrapper}>
                    <RectangleButton
                        onPress={onLoginPress}
                        backColor={colors.red}
                        textColor={colors.white}
                        text={strings.login}
                        fill
                    />
                </View>
            </View>
            <View>
            </View>
            <View style={styles.footer}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        navigation.navigate('Register');
                    }}>
                    <Text style={styles.footerText}>
                        {strings.noAccount + '? '}
                        <Text style={styles.bold}>{strings.register}</Text>
                    </Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'space-between'
    },
    content: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        marginTop: -40,
        fontSize: 25,
        textAlign: 'center',
        color: colors.darkGrayBlue,
        fontWeight: 'bold',
        paddingBottom: 20
    },
    desc: {
        fontSize: 15,
        fontWeight: '300',
        color: colors.darkGray,
        textAlign: 'center'
    },
    inputs: {
        borderRadius: 5,
        borderWidth: 0.5,
        overflow: 'hidden',
        margin: 20
    },
    inputWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    input: {
        flex: 1,
        padding: 0,
        backgroundColor: colors.white,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    buttonWrapper: {
        paddingHorizontal: 30
    },
    footer: {
        padding: 10,
        backgroundColor: colors.red,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerText: {
        color: colors.white,
        fontSize: 14
    },
    bold: {
        fontWeight: 'bold'
    },
    forgotPassword: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.red,
        marginBottom: 18,
        textAlign: 'center',
    }
});

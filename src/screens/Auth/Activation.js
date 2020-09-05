import React, {useState, useRef} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions,
    Keyboard
} from 'react-native';
import strings from '../../locales/strings';
import colors from '../../constants/colors';
import RectangleButton from '../../components/RectangleButton';
import {connect} from 'react-redux';
import {showLoading, hideLoading, userLoggedIn} from '../../redux/actions';
import requests from '../../api/requests';

const Activation = ({navigation, userLoggedIn}) => {
    let phone = navigation.getParam('phone');
    let password = navigation.getParam('password');
    let [code, setCode] = useState('');

    let inputRef = useRef(null);

    const onPress = () => {
        requests.auth
            .verifyUser({
                phone: phone,
                password: password,
                verification_code: code
            })
            .then(res => {
                hideLoading();
                if (res.data.type === 'success') {
                    requests.auth
                        .login({
                            phone: phone,
                            password: password
                        })
                        .then(res => {
                            if (res.data.type === 'success') {
                                userLoggedIn(res.data);
                                navigation.navigate('Home');
                            } else {
                                setErrorEntry(res.data.message);
                            }
                        });
                } else {
                    setErrorEntry(res.data.message);
                    // setErrorEntry(strings.passwordOrMailWrong);
                }
            })
            .catch(err => {
                hideLoading();
            });

        // navigation.navigate('Home');
        // showLoading(strings.loading);
        //         let loginRes = await requests.auth.login({
        //             phone: phone,
        //             password: password
        //         });
        //         userLoggedIn(loginRes.data);
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{strings.codeSentToYourNumber}</Text>
                <View style={styles.inputWrapper}>
                    <TextInput
                        ref={inputRef}
                        onFocus={() => {
                            setCode('');
                        }}
                        onChangeText={text => {
                            if (text.length <= 4) {
                                setCode(text);
                            } else {
                                Keyboard.dismiss();
                            }
                        }}
                        value={code}
                        placeholder={'0000'}
                        style={styles.input}
                    />
                </View>
            </View>
            <View style={styles.buttonWrapper}>
                <RectangleButton
                    onPress={onPress}
                    text={strings.send}
                    backColor={colors.red}
                    navigation={navigation}
                    textColor={colors.white}
                    fill
                />
            </View>
        </View>
    );
};

let deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 18,
        color: colors.darkGrayBlue,
        textAlign: 'center'
    },
    inputWrapper: {
        borderWidth: 0.5,
        borderColor: colors.darkGray,
        borderRadius: 10,
        padding: 10,
        marginTop: 30,
        width: deviceWidth * 0.3,
        alignSelf: 'center'
    },
    input: {
        padding: 0,
        fontSize: 25,
        color: colors.darkGray,
        margin: 0,
        textAlign: 'center'
    },
    buttonWrapper: {
        padding: 40
    }
});

const mapStateToProps = state => ({});

const mapDispatchToProps = {
    showLoading,
    hideLoading,
    userLoggedIn
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Activation);

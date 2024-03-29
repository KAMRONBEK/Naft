import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableWithoutFeedback,
    InteractionManager
} from 'react-native';
import {connect} from 'react-redux';
import colors from '../../constants/colors';
import strings from '../../locales/strings';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import RectangleButton from '../../components/RectangleButton';
import requests from '../../api/requests';
import {
    userLoggedIn,
    userLoaded,
    showLoading,
    hideLoading
} from '../../redux/actions';

const Auth = ({user, navigation, userLoggedIn, showLoading, hideLoading}) => {
    let [phone, setPhone] = useState('');
    let [password, setPassword] = useState('');

    let [errorEntry, setErrorEntry] = useState('');
    let [internetError, setInternetError] = useState('');

    const onLoginPress = () => {
        showLoading(strings.loggingIn);
        requests.auth
            .login({phone: phone, password: password})
            .then(res => {
                hideLoading();
                if (res.data.type === 'success') {
                    userLoggedIn(res.data);
                    navigation.navigate('tab');
                } else {
                    setErrorEntry(res.data.message);
                    // setErrorEntry(strings.passwordOrMailWrong);
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
                            onChangeText={text => setPhone(text)}
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
                <Text onPress={() => navigation.navigate('ForgotPassword')}>
                    {strings.forgotPassword}
                </Text>
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
    }
});

const mapStateToProps = ({user}) => ({
    user
});

const mapDispatchToProps = {
    userLoggedIn,
    showLoading,
    hideLoading
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth);

import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
    Alert
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import RectangleButton from '../../components/RectangleButton';
import colors from '../../constants/colors';
import strings from '../../locales/strings';
import requests from '../../api/requests';

const ForgotPassword = ({navigation}) => {
    let [phone, setPhone] = useState('');

    let [errorEntry, setErrorEntry] = useState('');

    let onLoginPress = async () => {
        try {
            let res = await requests.auth.forgotPassword(phone);
            if (res.data.type === 'success') {
                Alert.alert(
                    'Diqqat',
                    'Profilingizga aktivatsiya linki yuborildi! U orqali parolingizni qayta tiklashingiz mumkin.'
                );
                navigation.navigate('Login')
            } else {
                setErrorEntry(res.data.message)
            }
        } catch (error) {}
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

export default ForgotPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 25,
        marginTop: -40,
        paddingBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.darkGrayBlue,
    },
    desc: {
        fontSize: 15,
        fontWeight: '300',
        textAlign: 'center',
        color: colors.darkGray,
    },
    inputs: {
        margin: 20,
        borderRadius: 5,
        borderWidth: 0.5,
        overflow: 'hidden',
    },
    inputWrapper: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        flex: 1,
        padding: 0,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: colors.white,
    },
    buttonWrapper: {
        paddingHorizontal: 30
    },
    footer: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.red,
    },
    footerText: {
        fontSize: 14,
        color: colors.white,
    },
    bold: {
        fontWeight: 'bold'
    }
});

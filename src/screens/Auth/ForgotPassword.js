import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import RectangleButton from '../../components/RectangleButton';
import colors from '../../constants/colors';
import strings from '../../locales/strings';

const ForgotPassword = () => {
    let [phone, setPhone] = useState('');

    let [errorEntry, setErrorEntry] = useState('');

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

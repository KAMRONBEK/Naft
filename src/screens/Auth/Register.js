import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native';
import strings from '../../locales/strings';
import colors from '../../constants/colors';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import RectangleButton from '../../components/RectangleButton';
import {showMessage, hideMessage} from 'react-native-flash-message';
import RNPickerSelect from 'react-native-picker-select';
import requests from '../../api/requests';
import {showLoading, hideLoading} from '../../redux/actions/appState';
import {connect} from 'react-redux';
import {userLoggedIn} from '../../redux/actions';
import TextInputMask from 'react-native-text-input-mask';

const locations = [
    {label: 'Toshkent', value: 1},
    {label: 'Samarqand', value: 2},
    {label: 'Buxoro', value: 3},
    {label: 'Xiva', value: 4},
    {label: 'Nukus', value: 5},
    {label: 'Shaxrisabz', value: 6},
    {label: 'Qoqon', value: 7},
    {label: 'Fargona', value: 8}
];

const titles = [
    {label: strings.employer, value: '0', role: 'employer'},
    {label: strings.freelancer, value: '1', role: 'freelancer'}
];

const employees = [
    {label: '1', value: 1},
    {label: '10', value: 10},
    {label: '100', value: 100},
    {label: '500', value: 500},
    {label: '1000', value: 1000},
    {label: '5000', value: 5000}
];
const departments = [
    {label: 'Bugalteriya va moliya', value: 1},
    {label: 'Mijozlarga xizmat korsatish', value: 2},
    {label: 'Muhandislik', value: 3},
    {label: 'Kadrlar menejmenti', value: 4},
    {label: 'Marketing', value: 5},
    {label: 'Ishlab chiqarish', value: 6},
    {label: 'Taminot', value: 7},
    {label: 'Tadqiqot va ishlab chiqish', value: 8},
    {label: 'Savdo sotiq', value: 9}
];

const Register = ({navigation, showLoading, hideLoading, userLoggedIn}) => {
    let [name, setName] = useState('');
    let [lastName, setLastName] = useState('');
    let [phone, setPhone] = useState('');
    let [password, setPassword] = useState('');
    let [role, setRole] = useState(0);
    let [employeeCount, setEmployeeCount] = useState(0);
    let [department, setDepartment] = useState(0);
    let [location, setLocation] = useState(0);

    let [errorMessage, setErrorMessage] = useState('');

    const onRegisterPress = async () => {
        showLoading(strings.registering);

        try {
            let registerRes = await requests.auth.register(
                name,
                lastName,
                phone.slice(1),
                password,
                titles[role].role,
                employeeCount,
                department,
                location
            );
            let data = registerRes.data;
            if (data.type == 'error') {
                setErrorMessage(registerRes.data.message);

                showMessage({
                    message: registerRes.data.message,
                    type: 'danger'
                });
            } else {
                navigation.navigate('Activation', {
                    phone: phone,
                    password: password
                });
            }
        } catch (error) {
            if (error.response) {
                setErrorMessage(strings.wrongData);
            } else {
                setErrorMessage(strings.connectionProblem);
            }
        } finally {
            hideLoading();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{flex: 1}}>
                    <Text style={styles.title}>Naft</Text>
                    <Text
                        style={[
                            styles.desc,
                            {
                                color: errorMessage
                                    ? colors.red
                                    : colors.darkGray
                            }
                        ]}>
                        {errorMessage ? errorMessage : strings.naftDescription}
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
                                onChangeText={text => setName(text)}
                                placeholder={strings.firstName}
                                keyboardType="default"
                                style={styles.input}
                            />
                            <EvilIcons name="user" size={25} />
                        </View>
                        <View
                            style={[
                                styles.inputWrapper,
                                {
                                    borderBottomWidth: 0.5
                                }
                            ]}>
                            <TextInput
                                onChangeText={text => setLastName(text)}
                                placeholder={strings.lastName}
                                keyboardType="default"
                                style={styles.input}
                            />
                            <EvilIcons name="user" size={25} />
                        </View>
                        <View
                            style={[
                                styles.inputWrapper,
                                {
                                    borderBottomWidth: 0.5
                                }
                            ]}>
                            <TextInputMask
                                onChangeText={text => {
                                    setPhone('+' + text.replace(/\D/g, ''));
                                }}
                                placeholder={strings.enterPhoneNumber}
                                keyboardType="numeric"
                                mask={'+998 ([00]) [000] [00] [00]'}
                                style={styles.input}
                            />

                            <SimpleLineIcons name="phone" size={18} />
                        </View>
                        <View
                            style={[
                                styles.inputWrapper,
                                {
                                    borderBottomWidth: 0.5
                                }
                            ]}>
                            <TextInput
                                onChangeText={text => setPassword(text)}
                                secureTextEntry={true}
                                placeholder={strings.password}
                                style={styles.input}
                            />
                            <EvilIcons name="lock" size={25} />
                        </View>
                        <RNPickerSelect
                            doneText={strings.select}
                            onValueChange={value => setRole(value)}
                            items={titles}
                            style={{overflow: 'hidden'}}>
                            <View
                                style={[
                                    styles.inputWrapper,
                                    {
                                        borderBottomWidth: 0.5
                                    }
                                ]}>
                                <Text style={styles.input}>
                                    {role
                                        ? titles[role].label
                                        : strings.selectRole}
                                </Text>
                                <EvilIcons name="check" size={25} />
                            </View>
                        </RNPickerSelect>

                        {titles[role].label == strings.employer && (
                            <RNPickerSelect
                                doneText={strings.select}
                                onValueChange={value => setEmployeeCount(value)}
                                items={employees}
                                style={{overflow: 'hidden'}}>
                                <View
                                    style={[
                                        styles.inputWrapper,
                                        {
                                            borderBottomWidth: 0.5
                                        }
                                    ]}>
                                    <Text style={styles.input}>
                                        {employeeCount
                                            ? employeeCount
                                            : strings.selectEmployeeCount}
                                    </Text>
                                    <EvilIcons name="chart" size={25} />
                                </View>
                            </RNPickerSelect>
                        )}

                        {titles[role].label == strings.employer && (
                            <RNPickerSelect
                                doneText={strings.select}
                                onValueChange={value => setDepartment(value)}
                                items={departments}
                                style={{overflow: 'hidden'}}>
                                <View
                                    style={[
                                        styles.inputWrapper,
                                        {
                                            borderBottomWidth: 0.5
                                        }
                                    ]}>
                                    <Text style={styles.input}>
                                        {department
                                            ? departments[department - 1].label
                                            : strings.selectDepartment}
                                    </Text>
                                    <EvilIcons name="tag" size={25} />
                                </View>
                            </RNPickerSelect>
                        )}
                        <RNPickerSelect
                            doneText={strings.select}
                            onValueChange={value => setLocation(value)}
                            items={locations}>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.input}>
                                    {location
                                        ? locations[location - 1].label
                                        : strings.selectLocation}
                                </Text>
                                <EvilIcons name="location" size={25} />
                            </View>
                        </RNPickerSelect>
                    </View>
                    <View style={styles.buttonWrapper}>
                        <RectangleButton
                            onPress={
                                name &&
                                lastName &&
                                phone &&
                                password &&
                                role &&
                                location &&
                                onRegisterPress
                            }
                            backColor={
                                name &&
                                lastName &&
                                phone &&
                                password &&
                                role &&
                                location != false
                                    ? colors.red
                                    : colors.paleGray
                            }
                            textColor={colors.white}
                            text={strings.register}
                            fill
                        />
                    </View>
                </ScrollView>
            </View>
            <View style={styles.footer}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        navigation.navigate('Login');
                    }}>
                    <Text style={styles.footerText}>
                        {strings.youHaveAccount + '? '}
                        <Text style={styles.bold}>{strings.login}</Text>
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
        fontSize: 25,
        textAlign: 'center',
        color: colors.darkGrayBlue,
        fontWeight: 'bold',
        paddingBottom: 10,
        marginTop: 25
    },
    desc: {
        fontSize: 17,
        fontWeight: '300',
        paddingLeft: 30,
        paddingRight: 30,
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
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    input: {
        flex: 1,
        padding: 0,
        backgroundColor: colors.white,
        paddingVertical: 0,
        paddingHorizontal: 0
    },
    buttonWrapper: {
        paddingHorizontal: 30,
        paddingBottom: 30
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

const mapDispatchToProps = {
    showLoading,
    hideLoading,
    userLoggedIn
};

export default connect(
    null,
    mapDispatchToProps
)(Register);

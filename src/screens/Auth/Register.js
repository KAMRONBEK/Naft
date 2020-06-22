import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableWithoutFeedback
} from 'react-native';
import strings from '../../locales/strings';
import colors from '../../constants/colors';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import RectangleButton from '../../components/RectangleButton';
import RNPickerSelect from 'react-native-picker-select';
import requests from '../../api/requests';
import {showLoading, hideLoading} from '../../redux/actions/appState';
import {connect} from 'react-redux';
import {userLoggedIn} from '../../redux/actions';

const locations = [
    {label: 'Ташкент', value: 1},
    {label: 'Самарканд', value: 2},
    {label: 'Бухара', value: 3},
    {label: 'Хива', value: 4},
    {label: 'Нукус', value: 5},
    {label: 'Шахрисабз', value: 6},
    {label: 'Коканд', value: 7},
    {label: 'Фергана', value: 8}
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
    {label: 'Бухгалтерский Учет И Финансы', value: 1},
    {label: 'Обслуживание Клиентов Или Операции', value: 2},
    {label: 'Инжиниринг Или Управление Продукцией', value: 3},
    {label: 'Управление HR', value: 4},
    {label: 'Маркетинг', value: 5},
    {label: 'Производство', value: 6},
    {label: 'Снабжение', value: 7},
    {label: 'Исследования И Разработки', value: 8},
    {label: 'Продажи', value: 9}
];

const Register = ({navigation, showLoading, hideLoading, userLoggedIn}) => {
    let [name, setName] = useState('');
    let [lastName, setLastName] = useState('');
    let [email, setEmail] = useState('');
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
                email,
                password,
                titles[role].role,
                employeeCount,
                department,
                location
            );
            let data = registerRes.data;
            if (data.type == 'error') {
                setErrorMessage(registerRes.data.message);
            } else {
                showLoading(strings.loading);
                let loginRes = await requests.auth.login({
                    email: email,
                    password: password
                });
                userLoggedIn(loginRes.data);
                navigation.navigate('Home');
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
                <Text style={styles.title}>Naft</Text>
                <Text
                    style={[
                        styles.desc,
                        {
                            color: errorMessage ? colors.red : colors.darkGray
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
                        <TextInput
                            onChangeText={text => setEmail(text)}
                            placeholder={strings.enterMail}
                            keyboardType="email-address"
                            style={styles.input}
                        />
                        <EvilIcons name="envelope" size={25} />
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
                                {role ? titles[role].label : strings.selectRole}
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
                            email &&
                            password &&
                            role &&
                            location &&
                            onRegisterPress
                        }
                        backColor={
                            name &&
                            lastName &&
                            email &&
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
        paddingHorizontal: 10,
        paddingVertical: 10
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

const mapDispatchToProps = {
    showLoading,
    hideLoading,
    userLoggedIn
};

export default connect(
    null,
    mapDispatchToProps
)(Register);

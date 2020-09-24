import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import MapView, {Marker} from 'react-native-maps';
import RNPickerSelect from 'react-native-picker-select';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import requests from '../../api/requests';
import RoundButton from '../../components/RoundButton';
import colors from '../../constants/colors';
import strings from '../../locales/strings';
import {showModal} from '../../redux/actions';

const employees = [
    {label: '1', value: 1},
    {label: '10', value: 10},
    {label: '100', value: 100},
    {label: '500', value: 500},
    {label: '1000', value: 1000},
    {label: '5000', value: 5000}
];

const departments = [
    {label: 'Bugalteriya va moliya', value: 'Bugalteriya va moliya'},
    {
        label: 'Mijozlarga xizmat korsatish',
        value: 'Mijozlarga xizmat korsatish'
    },
    {label: 'Muhandislik', value: 'Muhandislik'},
    {label: 'Kadrlar menejmenti', value: 'Kadrlar menejmenti'},
    {label: 'Marketing', value: 'Marketing'},
    {label: 'Ishlab chiqarish', value: 'Ishlab chiqarish'},
    {label: 'Taminot', value: 'Taminot'},
    {label: 'Tadqiqot va ishlab chiqish', value: 'Tadqiqot va ishlab chiqish'},
    {label: 'Savdo sotiq', value: 'Savdo sotiq'}
];

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

const gender = [
    {label: strings.male, value: 'Male'},
    {label: strings.famale, value: 'Famale'}
];
const options = {
    title: strings.selectImage,
    customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

const Settings = ({navigation, showModal, userData}) => {
    //style-realted variables
    let [bannerWidth, setBannerWidth] = useState(0);
    let [bannerHeight, setBannerHeight] = useState(0);
    let [buttonWidth, setButtonWidth] = useState(0);

    const [profileData, setProfileData] = useState({});

    //for geolocation
    let [currentMarker, setCurrentMarker] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.005,
        longitudeDelta: 0.0021
    });
    let [currentRegion, setCurrentRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.005,
        longitudeDelta: 0.0021
    });

    let handleChange = (key, value) => {
        setProfileData({...profileData, [key]: value});
    };

    let effect = async () => {
        console.log({userData: userData.profile.umeta.id});
        let id = userData.profile.umeta.id;
        try {
            let res = await requests.profile.getProfile(id);
            console.log({res: res.data});
            setProfileData(res.data);
        } catch (error) {}
        //TODO show these data in fields
    };

    useEffect(() => {
        effect();
    }, []);

    let getCurrentPosition = () => {
        Geolocation.getCurrentPosition(info => {
            if (!!info) {
                // console.warn(info.coords);
                setCurrentMarker(info.coords);
                setCurrentRegion({
                    ...info.coords,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.0021
                });
            }
        });
    };
    useEffect(() => {
        getCurrentPosition();
        console.warn('setting', userData);
    }, []);

    //images
    let [banner, setBanner] = useState('');
    let [avatar, setAvatar] = useState({
        // uri: user.profile.pmeta && user.profile.pmeta.banner_img
    });

    const onBannerPress = async () => {
        ImagePicker.showImagePicker(options, async response => {
            if (response.uri) {
                setBanner(response);
                let res = await requests.profile.updateImage('43', {
                    banner_image: response
                });
                console.log({bannerRes: res.data});
            }
        });
    };

    const onAvatarPress = () => {
        ImagePicker.showImagePicker(options, async response => {
            if (response.uri) {
                setAvatar(response);
                let res = await requests.profile.updateImage('43', {
                    profile_image: response
                });
                console.log({avatarRes: res.data});
            }
        });
        //TODO upload to the server
    };

    let onSavePress = async () => {
        //TODO requests to remote api
        let id = userData.profile.umeta.id;
        let res = await requests.profile.updateProfile({
            ...profileData,
            user_id: id
        });
        Alert.alert('Attention', 'Successfully updated', [
            {text: 'OK', onPress: () => console.log('OK Pressed')}
        ]);
    };

    return (
        <ScrollView style={styles.container}>
            <View
                onLayout={({nativeEvent}) => {
                    setBannerWidth(nativeEvent.layout.width);
                    setBannerHeight(nativeEvent.layout.height);
                }}
                style={styles.topBanner}>
                <Image style={styles.banner} source={banner} />
            </View>
            <View
                style={[
                    styles.absoluteWrapper,
                    {
                        marginLeft: bannerWidth / 2 - 60,
                        marginTop: bannerHeight / 2 - 60
                    }
                ]}>
                <Image
                    style={styles.avatar}
                    source={avatar}
                    style={styles.avatar}
                />
                <View style={styles.buttonWrapper}>
                    <RoundButton
                        onPress={onAvatarPress}
                        iconName="plus"
                        borderColor={colors.white}
                        backColor={colors.green}
                    />
                </View>
            </View>

            <View style={styles.content}>
                <View
                    onLayout={({nativeEvent}) => {
                        setButtonWidth(nativeEvent.layout.width);
                    }}
                    style={[
                        styles.changeWrapper,
                        {
                            marginLeft: (bannerWidth - buttonWidth) / 2,
                            top: -20
                        }
                    ]}>
                    <RoundButton
                        onPress={onBannerPress}
                        text={strings.changeBanner}
                        backColor={colors.green}
                        borderColor={colors.white}
                        iconName="plus"
                    />
                </View>
                <Text style={styles.title}>{strings.yourDetails}</Text>

                {/* Gender */}
                <RNPickerSelect
                    doneText={strings.gender}
                    onValueChange={value => {
                        setProfileData({
                            ...profileData,
                            gender: value
                        });
                    }}
                    value={profileData.gender}
                    items={gender}>
                    <View>
                        <View
                            style={{
                                borderColor: colors.paleGray,
                                borderTopWidth: 0.3,
                                borderBottomWidth: 0.3,
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.iconName}>
                                    {strings.selectGender}
                                </Text>
                                <Text style={styles.input}>
                                    {profileData.gender
                                        ? gender.find(
                                              e =>
                                                  e.value === profileData.gender
                                          )?.label
                                        : strings.selectGender}
                                </Text>
                            </View>
                            <View style={styles.secondaryItem}>
                                <Entypo name="chevron-thin-right" size={20} />
                            </View>
                        </View>
                    </View>
                </RNPickerSelect>

                <View style={styles.box}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.iconName}>{strings.firstName}</Text>
                        <TextInput
                            value={profileData.first_name}
                            onChangeText={first_name =>
                                setProfileData({...profileData, first_name})
                            }
                            style={styles.inputStyle}
                            placeholder={strings.enterYourFirstName}
                        />
                    </View>
                </View>

                <View style={styles.box}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.iconName}>{strings.lastName}</Text>
                        <TextInput
                            value={profileData.last_name}
                            onChangeText={last_name =>
                                setProfileData({...profileData, last_name})
                            }
                            style={styles.inputStyle}
                            placeholder={strings.enterYourLastName}
                        />
                        {/* <Text style={styles.input}>Jureav</Text> */}
                    </View>
                </View>

                <View style={styles.box}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.iconName}>
                            {strings.yourHourlyRate} (UZS)
                        </Text>
                        <TextInput
                            value={profileData.yourHourlyRate}
                            onChangeText={per_hour_rate =>
                                setProfileData({...profileData, per_hour_rate})
                            }
                            style={styles.inputStyle}
                            placeholder={strings.enterHourlyRate}
                        />
                    </View>
                </View>

                <View style={styles.box}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.iconName}>
                            {strings.yourTagline}
                        </Text>

                        <TextInput
                            value={profileData.yourTagline}
                            onChangeText={tag_line =>
                                setProfileData({...profileData, tag_line})
                            }
                            style={styles.inputStyle}
                            placeholder={strings.enterHourlyRate}
                        />
                    </View>
                </View>

                {/* LOCATION */}
                <Text style={styles.title}>{strings.yourLocation}</Text>

                {/* <View style={styles.box}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.iconName}>
                            {strings.selectCountry}
                        </Text>
                        <Text style={styles.input}>Manzil</Text>
                    </View>
                    <View style={styles.secondaryItem}>
                        <Entypo name="chevron-thin-right" size={20} />
                    </View>
                </View> */}

                <RNPickerSelect
                    doneText={strings.select}
                    onValueChange={value => {
                        // setLocation({...profileData, department: value})
                        setProfileData({...profileData, location: value});
                    }}
                    value={profileData.location}
                    items={locations}>
                    <View
                        style={{
                            borderColor: colors.paleGray,
                            borderTopWidth: 0.3,
                            borderBottomWidth: 0.3,
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.iconName}>
                                {strings.selectCountry}
                            </Text>
                            <Text style={styles.input}>
                                {profileData.location
                                    ? locations.find(
                                          e => e.value === profileData.location
                                      )?.label
                                    : strings.location}
                            </Text>
                        </View>
                        <View style={styles.secondaryItem}>
                            <Entypo name="chevron-thin-right" size={20} />
                        </View>
                    </View>
                </RNPickerSelect>

                <View style={styles.box}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.iconName}>
                            {strings.yourAddress}
                        </Text>
                        <Text style={styles.input}>
                            {currentMarker.latitude}
                            {' , '}
                            {currentMarker.longitude}
                        </Text>
                    </View>
                    <View style={styles.secondaryItem}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                setCurrentRegion({
                                    ...currentMarker,
                                    latitudeDelta: 0.005,
                                    longitudeDelta: 0.0021
                                });
                                getCurrentPosition();
                            }}>
                            <MaterialCommunityIcons
                                name="crosshairs"
                                size={20}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={styles.mapWrapper}>
                    <MapView
                        loadingEnabled={true}
                        loadingIndicatorColor={colors.green}
                        showsMyLocationButton={true}
                        style={styles.map}
                        region={currentRegion}
                        onLongPress={({nativeEvent}) => {
                            setCurrentMarker(nativeEvent.coordinate);
                            setCurrentRegion({
                                ...nativeEvent.coordinate,
                                latitudeDelta: 0.005,
                                longitudeDelta: 0.0021
                            });
                        }}>
                        <Marker coordinate={currentMarker} />
                    </MapView>
                </View>
                <Text style={styles.title}>{strings.companyDetails}</Text>
                {/* <View style={styles.secondaryItem}>
                            <Entypo name="chevron-thin-right" size={20} />
                        </View>   */}
                {/* Employees */}
                <RNPickerSelect
                    doneText={strings.no_of_employees}
                    onValueChange={value => {
                        setProfileData({
                            ...profileData,
                            no_of_employees: value
                        });
                    }}
                    items={employees}>
                    <View>
                        <View
                            style={{
                                borderColor: colors.paleGray,
                                borderTopWidth: 0.3,
                                borderBottomWidth: 0.3,
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.iconName}>
                                    {strings.numOfEmployees}
                                </Text>
                                <Text style={styles.input}>
                                    {profileData.no_of_employees
                                        ? profileData.no_of_employees
                                        : 0}
                                </Text>
                            </View>
                            <View style={styles.secondaryItem}>
                                <Entypo name="chevron-thin-right" size={20} />
                            </View>
                        </View>
                    </View>
                </RNPickerSelect>
                {/* Departments */}
                <RNPickerSelect
                    doneText={strings.department}
                    onValueChange={value => {
                        setProfileData({
                            ...profileData,
                            department: value
                        });
                    }}
                    items={departments}>
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.iconName}>
                                    {strings.yourDepartment}
                                </Text>
                                <Text style={styles.input}>
                                    {profileData.department
                                        ? departments.find(
                                              e =>
                                                  e.value ===
                                                  profileData.department
                                          )?.label
                                        : strings.selectDepartment}
                                </Text>
                            </View>
                            <View style={styles.secondaryItem}>
                                <Entypo name="chevron-thin-right" size={20} />
                            </View>
                        </View>
                    </View>
                </RNPickerSelect>

                <View style={styles.footer}>
                    <TouchableWithoutFeedback
                        onPress={onSavePress}
                        text={strings.save}>
                        <Text style={styles.footerText}>
                            <Text style={styles.bold}>{strings.save}</Text>
                        </Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1
    },
    topBanner: {
        height: 230
    },
    banner: {
        flex: 1,
        resizeMode: 'cover'
    },
    absoluteWrapper: {
        position: 'absolute'
    },
    buttonWrapper: {
        marginLeft: -80,
        marginTop: -120,
        justifyContent: 'center',
        alignItems: 'center'
    },

    avatar: {
        height: 120,
        width: 120,
        backgroundColor: colors.white,
        borderRadius: 100
    },
    content: {
        flex: 1,
        backgroundColor: colors.white
    },
    changeWrapper: {
        position: 'absolute'
    },
    title: {
        padding: 10,
        paddingTop: 20,
        fontSize: 19
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inputWrapper: {
        justifyContent: 'center',
        padding: 10
    },
    secondaryItem: {
        justifyContent: 'center',
        paddingRight: 10
    },
    inputStyle: {
        backgroundColor: colors.white
    },
    input: {
        fontSize: 18,
        maxWidth: 200
    },
    mapWrapper: {
        height: 200
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    row: {
        flexDirection: 'row'
    },
    footer: {
        backgroundColor: colors.red,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        margin: 10
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
    userData: user
});

const mapDispatchToProps = {
    showModal
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);

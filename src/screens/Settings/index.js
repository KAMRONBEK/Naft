import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Alert,
    ScrollView,
    TextInput,
    TouchableWithoutFeedback
} from 'react-native';
import RoundButton from '../../components/RoundButton';
import colors from '../../constants/colors';
import strings from '../../locales/strings';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {connect} from 'react-redux';
import {showModal} from '../../redux/actions';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import images from '../../assets/images';
import requests from '../../api/requests';
import RectangleButton from '../../components/RectangleButton';

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
    let [inputBorderColor, setInputBorderColor] = useState('');
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
        } catch (error) {}
        console.log({res: res.data});
        setProfileData(res.data);
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
    }, [userData]);

    //images
    let [banner, setBanner] = useState('');
    let [avatar, setAvatar] = useState({
        // uri: user.profile.pmeta && user.profile.pmeta.banner_img
    });

    const onBannerPress = () => {
        ImagePicker.showImagePicker(options, response => {
            if (response.uri) {
                setBanner(response);
            }
        });
    };
    const onAvatarPress = () => {
        ImagePicker.showImagePicker(options, response => {
            if (response.uri) {
                setAvatar(response);
            }
        });
        //TODO upload to the server
    };

    let onSavePress = async () => {
        //TODO requests to remote api
        // let res = await requests.profile.update(profileData)
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
                        borderColor={colors.white}
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
                <View style={styles.box}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.iconName}>
                            {strings.selectGender}
                        </Text>
                        <Text style={styles.input}>Male</Text>
                    </View>
                    <View style={styles.secondaryItem}>
                        <Entypo name="chevron-thin-right" size={20} />
                    </View>
                </View>
                <View style={styles.box}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.iconName}>{strings.firstName}</Text>
                        <TextInput
                            value={profileData.firstName}
                            onChangeText={e => handleChange('firstName', e)}
                            onFocus={() => {
                                setInputBorderColor(colors.red);
                            }}
                            onEndEditing={() => {
                                setInputBorderColor(colors.white);
                            }}
                            style={[
                                styles.inputStyle,
                                {
                                    borderColor: inputBorderColor
                                }
                            ]}
                            placeholder={strings.enterYourFirstName}
                        />
                        {/* <Text style={styles.input}>Kamronbek</Text> */}
                    </View>
                </View>
                <View style={styles.box}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.iconName}>{strings.lastName}</Text>
                        <TextInput
                            value={profileData.lastName}
                            onChangeText={e => handleChange('lastName', e)}
                            onFocus={() => {
                                setInputBorderColor(colors.red);
                            }}
                            onEndEditing={() => {
                                setInputBorderColor(colors.white);
                            }}
                            style={[
                                styles.inputStyle,
                                {
                                    borderColor: inputBorderColor
                                }
                            ]}
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
                            onChangeText={e =>
                                handleChange('yourHourlyRate', e)
                            }
                            onFocus={() => {
                                setInputBorderColor(colors.red);
                            }}
                            onEndEditing={() => {
                                setInputBorderColor(colors.white);
                            }}
                            style={[
                                styles.inputStyle,
                                {
                                    borderColor: inputBorderColor
                                }
                            ]}
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
                            onChangeText={e => handleChange('yourTagline', e)}
                            onFocus={() => {
                                setInputBorderColor(colors.red);
                            }}
                            onEndEditing={() => {
                                setInputBorderColor(colors.white);
                            }}
                            style={[
                                styles.inputStyle,
                                {
                                    borderColor: inputBorderColor
                                }
                            ]}
                            placeholder={strings.enterHourlyRate}
                        />
                    </View>
                </View>
                <Text style={styles.title}>{strings.yourLocation}</Text>
                <View style={styles.box}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.iconName}>
                            {strings.selectCountry}
                        </Text>
                        <Text style={styles.input}>Male</Text>
                    </View>
                    <View style={styles.secondaryItem}>
                        <Entypo name="chevron-thin-right" size={20} />
                    </View>
                </View>
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
                <View style={styles.box}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.iconName}>
                            {strings.numOfEmployees}
                        </Text>
                        <Text style={styles.input}>
                            2 - 9 {strings.employees}
                        </Text>
                    </View>
                    <View style={styles.secondaryItem}>
                        <Entypo name="chevron-thin-right" size={20} />
                    </View>
                </View>
                <View style={styles.box}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.iconName}>
                            {strings.yourDepartment}
                        </Text>
                        <Text style={styles.input}>
                            {strings.marketingOrSales}
                        </Text>
                    </View>
                    <View style={styles.secondaryItem}>
                        <Entypo name="chevron-thin-right" size={20} />
                    </View>
                </View>

                <View>
                    <View style={styles.buttonWrapper}>
                        <RectangleButton
                            onPress={onSavePress}
                            textColor={colors.white}
                            text={strings.save}
                        />
                    </View>
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
        borderTopColor: colors.paleGray,
        borderTopWidth: 0.3,
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
        borderColor: colors.yellow,
        backgroundColor: colors.white,
        height: 30
        // width: 300
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

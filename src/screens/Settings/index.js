import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    PermissionsAndroid
} from 'react-native';
import {WebView} from 'react-native-webview';
import RoundButton from '../../components/RoundButton';
import colors from '../../constants/colors';
import strings from '../../locales/strings';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {TextInput} from 'react-native-paper';

{
    /* <WebView
            source={{uri: 'http://naft.uz/register'}}
            style={{fmarginTop: 20}}
		/> */
}

const Settings = () => {
    let [bannerWidth, setBannerWidth] = useState(0);
    let [bannerHeight, setBannerHeight] = useState(0);

    let [buttonWidth, setButtonWidth] = useState(0);

    let [inputBorderColor, setInputBorderColor] = useState('');

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

    async function requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Cool Photo App Location Permission',
                    message: 'Cool Photo App needs access to your location ',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK'
                }
            );
            // console.warn(granted);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // console.warn('You can use the location');
            } else {
                // console.warn('Location permission denied');
            }
        } catch (err) {
            // console.warn(err);
        }
    }

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
        requestLocationPermission();
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
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View
                onLayout={({nativeEvent}) => {
                    setBannerWidth(nativeEvent.layout.width);
                    setBannerHeight(nativeEvent.layout.height);
                }}
                style={styles.topBanner}>
                <Image
                    style={styles.banner}
                    source={{
                        uri:
                            'https://cdn5.f-cdn.com/contestentries/161530/14448983/54edf5c20a2af_thumb900.jpg'
                    }}
                />
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
                    source={{
                        uri:
                            'https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png'
                    }}
                    style={styles.avatar}
                />
                <View style={styles.buttonWrapper}>
                    <RoundButton
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
                            {strings.yourHourlyRate} ($)
                        </Text>
                        <TextInput
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
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
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
        height: 50,
        width: 300
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

export default Settings;

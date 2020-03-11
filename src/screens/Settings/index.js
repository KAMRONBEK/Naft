import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {WebView} from 'react-native-webview';
import RoundButton from '../../components/RoundButton';
import colors from '../../constants/colors';
import strings from '../../locales/strings';
import Entypo from 'react-native-vector-icons/Entypo';

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

    return (
        <View style={styles.container}>
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
                        <Text style={styles.input}>Male</Text>
                    </View>
                    <View style={styles.secondaryItem}>
                        <Text>asd</Text>
                    </View>
                </View>
            </View>
        </View>
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
    input: {
        fontSize: 18
    }
});

export default Settings;

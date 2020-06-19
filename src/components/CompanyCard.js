import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import colors from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import strings from '../locales/strings';
import {withNavigation} from 'react-navigation';
const CompanyCard = ({item, navigation}) => {
    let [bannerWidth, setBannerWidth] = useState(0);
    let [isFavorite, setIsFavorite] = useState(
        (item && item.favotire) || false
    );

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                navigation.navigate('CompanyPage');
            }}>
            <View style={styles.contianer}>
                <View
                    style={styles.banner}
                    onLayout={e => {
                        setBannerWidth(e.nativeEvent.layout.width);
                    }}>
                    <Image
                        style={[
                            styles.bannerImage,
                            {
                                width: bannerWidth
                            }
                        ]}
                        source={{
                            uri: item.banner
                        }}
                    />
                </View>
                <View style={styles.contentWrapper}>
                    <View style={styles.left}>
                        <View style={styles.imageWrapper}>
                            <Image
                                source={{uri: item.image}}
                                style={styles.image}
                            />
                        </View>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                setIsFavorite(!isFavorite);
                            }}>
                            <View
                                style={[
                                    styles.favIcon,
                                    isFavorite && {
                                        backgroundColor: colors.red,
                                        borderColor: colors.red
                                    }
                                ]}>
                                <Ionicons
                                    name="ios-heart"
                                    size={15}
                                    color={
                                        isFavorite
                                            ? colors.white
                                            : colors.paleGray
                                    }
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.titleWrapper}>
                            <Ionicons
                                name="md-checkmark-circle"
                                color={colors.green}
                                size={14}
                                style={{width: 20}}
                            />
                            <Text style={styles.name}>
                                {!!item && item.name}
                            </Text>
                        </View>
                        <Text numberOfLines={1} style={styles.desc}>
                            {item.desc}
                        </Text>
                        <View style={styles.titleWrapper}>
                            <Text style={styles.link}>{strings.openJobs}</Text>
                            <View style={styles.verticalLine} />
                            <Text style={styles.link}>
                                {strings.fullProfile}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    contianer: {
        backgroundColor: colors.white,
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 10
    },
    banner: {
        flex: 1
    },
    bannerImage: {
        height: 70,
        width: 100,
        resizeMode: 'cover'
    },
    contentWrapper: {
        flexDirection: 'row'
    },
    imageWrapper: {
        height: 70,
        marginTop: -30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        borderWidth: 1,
        borderColor: colors.paleTransparent,
        borderRadius: 5,
        overflow: 'hidden'
    },
    image: {
        height: 70,
        width: 70
    },
    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    left: {
        paddingHorizontal: 15,
        alignItems: 'center'
    },
    favIcon: {
        marginTop: 10,
        width: 25,
        height: 25,
        right: 0,
        borderWidth: 1,
        borderColor: colors.paleGray,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white
    },
    content: {
        paddingVertical: 15,
        flex: 0
    },
    name: {
        color: colors.black
    },
    desc: {
        width: 220,
        fontSize: 18
    },
    link: {
        color: colors.blue,
        paddingVertical: 5
    },
    verticalLine: {
        marginHorizontal: 20,
        height: 15,
        borderWidth: 1,
        borderColor: colors.paleGray
    }
});

export default withNavigation(CompanyCard);

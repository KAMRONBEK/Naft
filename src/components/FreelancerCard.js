import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
    LayoutAnimation
} from 'react-native';
import colors from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {withNavigation} from 'react-navigation';
const FreelancerCard = ({item, navigation}) => {
    let [isFavorite, setIsFavorite] = useState((item && item.fav) || false);
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                navigation.navigate('FreelancerPage', {
                    freelancer: item
                });
            }}>
            <View style={styles.container}>
                <View style={styles.box}>
                    {/* {!!item && item.tag && item.tag && ( */}
                    <View style={styles.tag} />
                    {/* )} */}
                    <View style={styles.imageWrapper}>
                        <Image
                            source={{
                                uri: item.profile_img
                            }}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.content}>
                        <View style={styles.titleWrapper}>
                            <Ionicons
                                name="md-checkmark-circle"
                                color={colors.green}
                                size={14}
                                style={{width: 20}}
                            />
                            <Text style={styles.title}>
                                {!!item && item.name}
                            </Text>
                        </View>
                        <Text numberOfLines={1} style={styles.desc}>
                            {!!item && item.content}
                        </Text>
                        <View style={styles.infoWrapper}>
                            <View style={styles.titleWrapper}>
                                <FontAwesome
                                    name="money"
                                    color={colors.black}
                                    size={13}
                                    style={{width: 20}}
                                />
                                <Text style={styles.title}>
                                    {!!item && item._perhour_rate1}
                                </Text>
                            </View>
                            <View
                                style={{
                                    borderWidth: 1,
                                    marginHorizontal: 10,
                                    height: 15,
                                    borderColor: colors.black
                                }}
                            />
                            <View style={styles.titleWrapper}>
                                <FontAwesome
                                    name="map-marker"
                                    color={colors.paleGray}
                                    size={14}
                                    style={{width: 20}}
                                />
                                <Text style={styles.title}>
                                    {!!item.location && item.location._country}
                                </Text>
                            </View>
                        </View>
                    </View>
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
                            color={isFavorite ? colors.white : colors.paleGray}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        marginBottom: 10,
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    box: {
        backgroundColor: colors.white,
        padding: 18,
        marginRight: 12,
        flex: 1,
        borderRadius: 5,
        overflow: 'hidden',
        flexDirection: 'row',
        borderWidth: 0.3,
        borderColor: colors.paleGray
    },
    tag: {
        position: 'absolute',
        width: 0,
        height: 0,
        borderWidth: 15,
        borderStyle: 'solid',
        borderTopColor: colors.red,
        borderLeftColor: colors.red,
        borderBottomColor: 'transparent',
        borderRightColor: 'transparent'
    },
    imageWrapper: {
        overflow: 'hidden'
    },
    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        color: colors.black
    },
    desc: {
        fontSize: 17,
        color: colors.black
    },
    infoWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        borderRadius: 5,
        width: 70,
        height: 70,
        resizeMode: 'cover'
    },
    content: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    favIcon: {
        position: 'absolute',
        width: 25,
        height: 25,
        right: 0,
        borderWidth: 1,
        borderColor: colors.paleGray,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white
    }
});

export default FreelancerCard;

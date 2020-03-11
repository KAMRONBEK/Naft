import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import colors from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const JobCard = ({item, vertical, navigation}) => {
    let [isFavorite, setIsFavorite] = useState(item.fav);

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                navigation.navigate('JobPage');
            }}>
            <View
                style={[
                    styles.container,
                    !!vertical && {
                        paddingBottom: 10
                    }
                ]}>
                <View style={styles.box}>
                    {item.tag && (
                        <View
                            style={[
                                styles.tag,
                                item.tag && {
                                    borderTopColor: item.tag,
                                    borderLeftColor: item.tag
                                }
                            ]}
                        />
                    )}
                    <View style={styles.content}>
                        <View style={styles.titleWrapper}>
                            <Ionicons
                                name="md-checkmark-circle"
                                color={colors.green}
                                size={14}
                                style={{width: 20}}
                            />
                            <Text style={styles.title}>Alfredo Kamuran</Text>
                        </View>
                        <Text numberOfLines={1} style={styles.desc}>
                            This is some description words
                        </Text>
                        <View style={styles.infoWrapper}>
                            <FontAwesome
                                name="dollar"
                                color={colors.green}
                                size={14}
                                style={{width: 20}}
                            />
                            <Text style={styles.info}>Professional</Text>
                        </View>
                        <View style={styles.infoWrapper}>
                            <FontAwesome
                                name="map-marker"
                                color={colors.paleGray}
                                size={14}
                                style={{width: 20}}
                            />
                            <Text style={styles.info}>England</Text>
                        </View>
                        <View style={styles.infoWrapper}>
                            <FontAwesome
                                name="folder-o"
                                color={colors.blue}
                                size={14}
                                style={{width: 20}}
                            />
                            <Text style={styles.info}>Type: Per Hour</Text>
                        </View>
                        <View style={styles.infoWrapper}>
                            <Ionicons
                                name="md-time"
                                color={colors.red}
                                size={14}
                                style={{width: 20}}
                            />
                            <Text style={styles.info}>Professional</Text>
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
                            },
                            vertical && {
                                bottom: 35,
                                right: 3
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
        minWidth: 260,
        backgroundColor: 'transparent',
        paddingBottom: 15,
        paddingRight: 15,
        // marginTop: 15,
        flexDirection: 'row'
    },
    box: {
        flex: 1,
        padding: 18,
        backgroundColor: colors.white,
        borderRadius: 5,
        overflow: 'hidden',
        flexDirection: 'row',
        borderWidth: 0.3,
        borderColor: colors.paleGray
    },
    tag: {
        top: 0,
        left: 0,
        position: 'absolute',
        width: 0,
        height: 0,
        borderWidth: 15,
        borderStyle: 'solid',
        borderTopColor: colors.green,
        borderLeftColor: colors.green,
        borderBottomColor: 'transparent',
        borderRightColor: 'transparent'
    },
    content: {
        flex: 1,
        paddingRight: 10,
        justifyContent: 'space-between'
    },
    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        color: colors.black
    },
    desc: {
        paddingVertical: 5,
        fontSize: 17
    },
    infoWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    info: {
        paddingVertical: 3
    },
    favIcon: {
        position: 'absolute',
        width: 25,
        height: 25,
        right: 35,
        bottom: 5,
        borderWidth: 1,
        borderColor: colors.paleGray,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white
    }
});

export default JobCard;

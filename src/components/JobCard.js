import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import colors from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const JobCard = ({item}) => {
    let [isFavorite, setIsFavorite] = useState(item.fav);

    return (
        <View style={styles.container}>
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
                        }
                    ]}>
                    <Ionicons
                        name="ios-heart"
                        size={25}
                        color={isFavorite ? colors.white : colors.paleGray}
                    />
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 260,
        backgroundColor: 'transparent',
        paddingBottom: 20,
        paddingRight: 15,
        marginTop: 15,
        flexDirection: 'row'
    },
    box: {
        flex: 1,
        padding: 18,
        backgroundColor: colors.white,
        borderRadius: 5,
        overflow: 'hidden',
        flexDirection: 'row'
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
        width: 40,
        height: 40,
        right: 30,
        bottom: 0,
        borderWidth: 1,
        borderColor: colors.paleGray,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white
    }
});

export default JobCard;

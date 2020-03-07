import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import colors from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomStars from '../components/CustomStars';

const FeedbackCard = ({item}) => {
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <View style={styles.imageWrapper}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: item.image
                        }}
                    />
                </View>
                <View style={styles.aside}>
                    <View style={styles.nameWrapper}>
                        <Ionicons
                            name="md-checkmark-circle"
                            color={colors.green}
                            size={14}
                            style={{width: 20}}
                        />
                        <Text lineBreakMode="tail" style={styles.name}>
                            {item.name}
                        </Text>
                    </View>
                    <Text
                        lineBreakMode="tail"
                        numberOfLines={1}
                        style={styles.desc}>
                        {item.desc}
                    </Text>
                </View>
            </View>
            <View style={styles.middle}>
                <View style={styles.box}>
                    <View style={styles.iconWrapper}>
                        <Ionicons name="ios-star-outline" size={30} />
                    </View>
                    <Text numberOfLines={1} style={styles.boxText}>
                        Beginner
                    </Text>
                </View>
                <View style={styles.box}>
                    <View style={styles.iconWrapper}>
                        <FontAwesome name="flag-o" size={28} />
                    </View>
                    <Text numberOfLines={1} style={styles.boxText}>
                        England
                    </Text>
                </View>
                {!item.finished && (
                    <View style={styles.box}>
                        <View style={styles.iconWrapper}>
                            <AntDesign name="clockcircleo" size={30} />
                        </View>
                        <Text numberOfLines={1} style={styles.boxText}>
                            In Progress
                        </Text>
                    </View>
                )}
                {item.finished && (
                    <>
                        <View style={styles.box}>
                            <View style={styles.iconWrapper}>
                                <AntDesign name="calendar" size={27} />
                            </View>
                            <Text numberOfLines={1} style={styles.boxText}>
                                {item.completedDate}
                            </Text>
                        </View>
                        {item.stars && (
                            <View style={styles.box}>
                                <View style={styles.iconWrapper}>
                                    <SimpleLineIcons name="badge" size={27} />
                                </View>
                                <CustomStars numberOfStars={item.stars} />
                            </View>
                        )}
                    </>
                )}
            </View>
            <View style={styles.bottom}>
                <Text style={styles.quote}>"{item.quote}"</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        borderWidth: 0.3,
        borderColor: colors.paleGray,
        borderRadius: 5,
        backgroundColor: colors.white
    },
    top: {
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 0.5,
        borderColor: colors.paleGray
    },
    imageWrapper: {
        borderRadius: 5,
        overflow: 'hidden',
        width: 60,
        height: 60,
        borderRadius: 5
    },
    image: {
        width: 60,
        height: 60
    },
    aside: {
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    nameWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    desc: {
        fontSize: 17,
        width: 200
    },
    middle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 0.5,
        borderColor: colors.paleGray
    },
    box: {
        width: (Dimensions.get('window').width - 60) / 4,
        justifyContent: 'flex-end',
        alignItems: 'center'
        // height: 55
    },
    iconWrapper: {
        height: 35
    },
    boxText: {
        textAlign: 'center'
    },
    bottom: {
        padding: 15
    },
    quote: {
        fontStyle: 'italic'
    }
});

export default FeedbackCard;

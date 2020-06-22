import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import strings from '../locales/strings';

const FreelancerPageCard = ({item}) => {
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View style={styles.tag} />
                <Image
                    source={{
                        uri: item && item.profile_img
                    }}
                    style={styles.image}
                />
                <View style={styles.aside}>
                    <View style={styles.titleWrapper}>
                        <Ionicons
                            name="md-checkmark-circle"
                            color={colors.green}
                            size={14}
                            style={{width: 20}}
                        />
                        <Text style={styles.title}>Kamronbek Juraev</Text>
                    </View>

                    <Text style={styles.desc}>
                        This is some long description
                    </Text>
                </View>
            </View>
            <View style={styles.secondary}>
                <Text style={styles.rightText}>{strings.hourlyRate}</Text>
                <Text style={styles.leftText}>
                    {item && item._perhour_rate1}
                </Text>
            </View>
            <View style={styles.secondary}>
                <Text style={styles.rightText}>{strings.location}</Text>
                <Text style={styles.leftText}>
                    {item && item.location._country}
                </Text>
            </View>
            <View style={styles.secondary}>
                <Text style={styles.rightText}>{strings.reviews}</Text>
                <Text style={styles.leftText}>{strings.noReviewsYet}</Text>
            </View>
            <View style={styles.secondary}>
                <Text style={styles.rightText}>{strings.registerYear}</Text>
                <Text style={styles.leftText}>{item.member_since}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: 5,
        borderColor: colors.paleGray,
        borderWidth: 0.2
    },
    main: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center'
    },
    tag: {
        top: 0,
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
    image: {
        borderRadius: 5,
        height: 70,
        width: 70
    },
    aside: {
        paddingHorizontal: 10,
        paddingRight: 30,
        flexDirection: 'column'
    },
    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {},
    desc: {
        fontSize: 20,
        color: colors.black
    },
    secondary: {
        borderTopColor: colors.paleGray,
        padding: 15,
        flexDirection: 'row',
        borderTopWidth: 0.5,
        justifyContent: 'space-between'
    }
});

export default FreelancerPageCard;

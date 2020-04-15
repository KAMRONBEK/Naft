import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import colors from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RectangleButton from './RectangleButton';

const CompanyPageCard = ({}) => {
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View style={styles.tag} />
                <Image
                    source={{
                        uri:
                            'https://humancapitalmedia.com/wp-content/uploads/sites/14/2017/02/gray-square.png'
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
                <Text style={styles.textCenter}>Company ID: SDF12312DSFSD</Text>
                <View style={styles.buttonWrapper}>
                    <RectangleButton
                        backColor={colors.red}
                        fill
                        textColor={colors.white}
                        text="some"
                        minWidth={260}
                    />
                    <RectangleButton
                        backColor={colors.green}
                        iconName="md-share"
                        fill={true}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        // elevation: 3,
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: 5,
        borderColor: colors.paleGray,
        elevation: 4,
        borderWidth: 0.2
    },
    main: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        borderBottomColor: colors.paleGray,
        borderBottomWidth: 0.4
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
        padding: 15
    },
    textCenter: {
        textAlign: 'center'
    },
    buttonWrapper: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default CompanyPageCard;

import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../constants/colors';
import images from '../assets/images';

const Attachment = ({item}) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconWrapper}>
                <Image source={images.file} style={styles.icon} />
            </View>
            <Text numberOfLines={1} style={styles.name}>
                {item.document_name}
            </Text>
            <Text style={styles.size} numberOfLines={1}>
                {item.size}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 0.3,
        borderColor: colors.paleGray,
        marginRight: 10,
        width: 130,
        height: 170,
        padding: 15
    },
    iconWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100
    },
    icon: {
        height: 60,
        width: 60
    },
    name: {
        textAlign: 'center',
        fontSize: 16
    },
    size: {textAlign: 'center', fontSize: 14}
});

export default Attachment;

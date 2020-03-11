import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../constants/colors';

const Attachment = ({item}) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconWrapper}>
                <AntDesign name="filetext1" size={40} />
            </View>
            <Text numberOfLines={1} style={styles.name}>
                {item.name}
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
    name: {
        textAlign: 'center',
        fontSize: 16
    },
    size: {textAlign: 'center', fontSize: 14}
});

export default Attachment;

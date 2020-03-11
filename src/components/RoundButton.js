import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../constants/colors';
import strings from '../locales/strings';

const RoundButton = ({backColor, iconName, text, borderColor}) => {
    return (
        <View
            style={[
                styles.container,
                backColor && {
                    backgroundColor: backColor
                },
                borderColor && {
                    borderColor: borderColor,
                    borderWidth: 1
                }
            ]}>
            <AntDesign name={iconName} size={22} color={colors.white} />
            {text && <Text style={styles.text}>{text}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7,
        flexDirection: 'row',
        borderRadius: 100,
        elevation: 5
    },
    text: {
        marginHorizontal: 7,
        fontSize: 16,
        color: colors.white
    },
    box: {
        borderWidth: 1,
        flexDirection: 'column'
    }
});

export default RoundButton;

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../constants/colors';
import strings from '../locales/strings';

const RoundButton = ({backColor, iconName, text, borderColor, onPress}) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
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
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7,
        flexDirection: 'row',
        borderRadius: 100,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62
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

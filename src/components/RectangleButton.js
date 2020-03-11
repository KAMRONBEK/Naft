import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import colors from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RectangleButton = ({
    onPress,
    text,
    textColor,
    backColor,
    fill,
    full,
    iconName,
    minWidth
}) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View
                style={[
                    styles.container,
                    minWidth && {
                        minWidth: minWidth
                    },
                    fill &&
                        backColor && {
                            backgroundColor: backColor
                        }
                ]}>
                {iconName ? (
                    <Ionicons name={iconName} size={25} color={colors.white} />
                ) : (
                    <Text
                        style={[
                            styles.text,
                            backColor
                                ? {
                                      fontWeight: 'bold',
                                      color: textColor
                                          ? textColor
                                          : colors.white
                                  }
                                : {
                                      fontSize: 15,
                                      color: textColor
                                          ? textColor
                                          : colors.white
                                  }
                        ]}>
                        {text}
                    </Text>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        padding: 15,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        textTransform: 'capitalize'
    }
});

export default RectangleButton;

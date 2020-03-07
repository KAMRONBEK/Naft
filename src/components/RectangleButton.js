import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import colors from '../constants/colors';

const RectangleButton = ({onPress, text, textColor, backColor, fill, full}) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View
                style={[
                    styles.container,
                    fill &&
                        backColor && {
                            backgroundColor: backColor
                        }
                ]}>
                <Text
                    style={[
                        styles.text,
                        backColor
                            ? {
                                  fontWeight: 'bold',
                                  color: textColor ? textColor : colors.white
                              }
                            : {
                                  fontSize: 15,
                                  color: textColor ? textColor : colors.white
                              }
                    ]}>
                    {text}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        paddingVertical: 15,
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        textTransform: 'capitalize'
    }
});

export default RectangleButton;

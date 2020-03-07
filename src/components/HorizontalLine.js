import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../constants/colors';

const HorizontalLine = () => {
    return <View style={styles.container} />;
};

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 0.5,
        marginVertical: 10,
        borderBottomColor: colors.paleGray
    }
});

export default HorizontalLine;

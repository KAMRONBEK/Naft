import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../constants/colors';

const BulletText = ({item}) => {
    return (
        <View style={styles.container}>
            <FontAwesome name="dot-circle-o" color={colors.black} size={10} />
            <Text style={styles.name}>{item.name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingVertical: 5
    },
    name: {paddingLeft: 10}
});

export default BulletText;

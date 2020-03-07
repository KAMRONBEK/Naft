import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../constants/colors';

const CustomStars = ({numberOfStars}) => {
    let stars = [];
    for (let i = 0; i < numberOfStars; ++i) {
        stars.push(<Entypo name="star" size={12} color={colors.gold} />);
    }
    for (let i = 0; i < 5 - numberOfStars; ++i) {
        stars.push(
            <Entypo name="star-outlined" size={12} color={colors.gold} />
        );
    }

    return <View style={styles.container}>{stars}</View>;
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
});

export default CustomStars;

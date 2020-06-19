import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../constants/colors';

const ExperienceCard = ({item}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.middle}>
                <FontAwesome name="building-o" />
                <Text style={styles.text}>{item.location}</Text>
                <View
                    style={{
                        marginHorizontal: 7,
                        height: 15,
                        borderWidth: 0.5,
                        borderColor: colors.black
                    }}
                />
                <AntDesign name="calendar" />
                <Text style={styles.text}>
                    {item.fromDate} - {item.toDate ? item.toDate : 'Till Now'}
                </Text>
            </View>
            <Text style={styles.quote}>{`"${item.quote}"`}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        paddingHorizontal: 20,
        borderWidth: 0.5,
        borderColor: colors.paleGray,
        borderRadius: 5,
        marginTop: 7
    },
    middle: {
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center'
    },
    text: {paddingHorizontal: 5},
    name: {
        fontSize: 17,
        color: colors.black
    },
    quote: {
        paddingTop: 10,
        fontStyle: 'italic'
    }
});

export default ExperienceCard;

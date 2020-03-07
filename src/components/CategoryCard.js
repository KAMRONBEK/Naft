import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import colors from '../constants/colors';

const CatogoryCard = ({item}) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{
                    uri: 'https://content.etilize.com/Finish/1031247865.jpg'
                }}
            />
            <View style={styles.textWrapper}>
                <Text>{item.name}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingVertical: 15,
        backgroundColor: colors.white,
        marginRight: 7,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5
    },
    image: {
        height: 50,
        width: 50
    },
    textWrapper: {
        width: 80,
        paddingHorizontal: 10,
        justifyContent: 'center'
    }
});

export default CatogoryCard;

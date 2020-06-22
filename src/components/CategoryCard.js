import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import colors from '../constants/colors';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const CatogoryCard = ({item, navigation}) => {
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                navigation.navigate('Jobs');
            }}>
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{
                        uri: item.image
                    }}
                />
                <View style={styles.textWrapper}>
                    <Text style={styles.text}>{item.name}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingVertical: 10,
        backgroundColor: colors.white,
        marginRight: 7,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 0.3,
        borderColor: colors.paleGray
    },
    image: {
        height: 50,
        width: 50
    },
    textWrapper: {
        width: 90,
        paddingHorizontal: 10,
        justifyContent: 'center'
    },
    text: {fontSize: 12}
});

export default CatogoryCard;

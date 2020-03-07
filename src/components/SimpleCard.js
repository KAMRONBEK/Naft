import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Linking,
    TouchableWithoutFeedback
} from 'react-native';
import colors from '../constants/colors';

const SimpleCard = ({item}) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageWrapper}>
                <Image
                    style={styles.image}
                    source={{
                        uri: item.image
                            ? item.image
                            : 'https://content.etilize.com/Finish/1031247865.jpg'
                    }}
                />
            </View>
            <View style={styles.aside}>
                {item.name && <Text style={styles.name}>{item.name}</Text>}
                {item.link && (
                    <TouchableWithoutFeedback
                        onPress={() => Linking.openURL(`http://${item.link}/`)}>
                        <Text style={styles.link}>{item.link}</Text>
                    </TouchableWithoutFeedback>
                )}
                <Text style={styles.title}>{item.title}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 10,
        padding: 15,
        borderWidth: 0.2,
        borderColor: colors.paleGray,
        borderRadius: 5,
        backgroundColor: colors.white
    },
    imageWrapper: {
        borderRadius: 5,
        overflow: 'hidden',
        width: 60,
        height: 60
    },
    image: {
        width: 60,
        height: 60
    },
    title: {
        fontSize: 18
    },
    aside: {
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    link: {color: colors.blue}
});

export default SimpleCard;

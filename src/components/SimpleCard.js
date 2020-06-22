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
                            ? item.image.url
                            : 'https://content.etilize.com/Finish/1031247865.jpg'
                    }}
                />
            </View>
            <View style={styles.aside}>
                {/* {item.url && <Text style={styles.name}>{item.title}</Text>} */}
                {item.url && (
                    <TouchableWithoutFeedback
                        onPress={() => Linking.openURL(`http://${item.url}/`)}>
                        <Text style={styles.link}>{item.url}</Text>
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
        borderRadius: 5,
        backgroundColor: colors.white,
        borderWidth: 0.2,
        borderColor: colors.paleGray
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

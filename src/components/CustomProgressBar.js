import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import colors from '../constants/colors';

const CustomProgressBar = ({item}) => {
    let [containerWidth, setContainerWidth] = useState(0);

    return (
        <View
            onLayout={event => {
                let {x, y, width, height} = event.nativeEvent.layout;
                setContainerWidth(width);
            }}
            style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.text}>{item && item.skill_name}</Text>
                <Text style={styles.text}>{item && item.skill_val}</Text>
            </View>
            <View
                style={[
                    styles.bar,
                    item &&
                        item.skill_val && {
                            width: (containerWidth * item.skill_val) / 100
                        }
                ]}>
                <Image
                    source={{
                        uri:
                            'https://images3.pixlis.com/background-image-horizontal-lines-and-stripes-seamless-tileable-white-green-22hnvh.png'
                    }}
                    style={styles.barImage}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    bar: {
        flex: 1,
        borderRadius: 5,
        overflow: 'hidden'
    },
    barImage: {
        borderRadius: 5,
        borderColor: colors.green,
        borderWidth: 1,
        height: 5,
        resizeMode: 'repeat'
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5
    },
    text: {
        fontSize: 15
    }
});

export default CustomProgressBar;

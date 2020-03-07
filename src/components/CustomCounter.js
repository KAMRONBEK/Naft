import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../constants/colors';

const CustomCounter = () => {
    return (
        <View style={styles.container}>
            <View style={styles.block}>
                <Text
                    style={[
                        styles.data,
                        {
                            color: colors.green
                        }
                    ]}>
                    03
                </Text>
                <Text style={styles.name}>Ongoing Ptojects</Text>
            </View>
            <View style={styles.block}>
                <Text
                    style={[
                        styles.data,
                        {
                            color: colors.blue
                        }
                    ]}>
                    1503
                </Text>
                <Text style={styles.name}>Completed Projects</Text>
            </View>
            <View style={styles.block}>
                <Text
                    style={[
                        styles.data,
                        {
                            color: colors.orange
                        }
                    ]}>
                    02
                </Text>
                <Text style={styles.name}>Cancelled Projects</Text>
            </View>
            <View style={styles.block}>
                <Text
                    style={[
                        styles.data,
                        {
                            color: colors.deepLilac
                        }
                    ]}>
                    25k
                </Text>
                <Text style={styles.name}>Served Hours</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    block: {
        width: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    data: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    name: {textAlign: 'center'}
});

export default CustomCounter;

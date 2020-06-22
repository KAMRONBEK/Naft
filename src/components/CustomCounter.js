import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../constants/colors';
import strings from '../locales/strings';

const CustomCounter = ({item}) => {
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
                    {item.ongoning_jobs}
                </Text>
                <Text style={styles.name}>{strings.currentProjects}</Text>
            </View>
            <View style={styles.block}>
                <Text
                    style={[
                        styles.data,
                        {
                            color: colors.blue
                        }
                    ]}>
                    {item.completed_jobs}
                </Text>
                <Text style={styles.name}>{strings.completedProjects}</Text>
            </View>
            <View style={styles.block}>
                <Text
                    style={[
                        styles.data,
                        {
                            color: colors.orange
                        }
                    ]}>
                    {item.cancelled_jobs}
                </Text>
                <Text style={styles.name}>{strings.cancelledProjects}</Text>
            </View>
            <View style={styles.block}>
                <Text
                    style={[
                        styles.data,
                        {
                            color: colors.deepLilac
                        }
                    ]}>
                    {item.wt_total_rating}
                </Text>
                <Text style={styles.name}>{strings.allEarnings}</Text>
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

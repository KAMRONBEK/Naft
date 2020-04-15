import React from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import colors from '../../constants/colors';
import JobCard from '../../components/JobCard';
import {withNavigation} from 'react-navigation';
export const freelancerList = [
    {
        id: 1,
        name: 'Emilia Clark',
        title: 'How comunication happens',
        hourRate: 12,
        location: 'England'
    },
    {
        id: 2,
        name: 'Emilia Clark',
        title: 'How comunication happens',
        hourRate: 12,
        location: 'England',
        tag: colors.red
    },
    {
        id: 3,
        name: 'Emilia Clark',
        title: 'How comunication happens',
        hourRate: 12,
        location: 'England'
    },
    {
        id: 4,
        name: 'Emilia Clark',
        title: 'How comunication happens',
        hourRate: 12,
        location: 'England',
        tag: colors.blue
    },
    {
        id: 5,
        name: 'Emilia Clark',
        title: 'How comunication happens',
        hourRate: 12,
        location: 'England'
    },
    {
        id: 6,
        name: 'Emilia Clark',
        title: 'How comunication happens',
        hourRate: 12,
        location: 'England',
        tag: colors.yellow
    },
    {
        id: 7,
        name: 'Emilia Clark',
        title: 'How comunication happens',
        hourRate: 12,
        location: 'England'
    },
    {
        id: 8,
        name: 'Emilia Clark',
        title: 'How comunication happens',
        hourRate: 12,
        location: 'England'
    },
    {
        id: 9,
        name: 'Emilia Clark',
        title: 'How comunication happens',
        hourRate: 12,
        location: 'England'
    }
];

const Jobs = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View>
                <FlatList
                    data={freelancerList}
                    renderItem={({item}) => (
                        <JobCard
                            vertical={true}
                            item={item}
                            navigation={navigation}
                        />
                    )}
                    keyExtractor={item => item.id.toString()}
                    style={{
                        marginTop: 10,
                        overflow: 'visible'
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 15
    },
    top: {
        backgroundColor: colors.darkGrayBlue,
        height: 190,
        overflow: 'visible'
    },
    cardWrapper: {}
});

export default withNavigation(Jobs);

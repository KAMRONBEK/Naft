import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import FreelancerCard from '../../components/FreelancerCard';
import {FlatList} from 'react-native-gesture-handler';

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

const Freelancer = ({navigation}) => {
    return (
        <>
            {/* <ScrollView
            showsVerticalScrollIndicator={false}
          style={styles.container}>*/}
            <View style={styles.container}>
                <FlatList
                    data={freelancerList}
                    renderItem={({item}) => (
                        <FreelancerCard item={item} navigation={navigation} />
                    )}
                    keyExtractor={item => item.id.toString()}
                    style={{
                        marginTop: 10,
                        overflow: 'visible',
                        flex: 1
                    }}
                />
            </View>
            {/* </ScrollView> */}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    top: {
        backgroundColor: colors.darkGrayBlue,
        height: 190,
        overflow: 'visible'
    },
    cardWrapper: {
        paddingHorizontal: 20
    }
});

export default Freelancer;

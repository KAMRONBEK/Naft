import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SearchItem from '../components/SearchItem';
import colors from '../constants/colors';
import {FlatList} from 'react-native-gesture-handler';
import JobCard from '../components/JobCard';

const Home = () => {
    const jobList = [
        {
            id: 1,
            tag: colors.green,
            fav: true
        },
        {
            id: 2,
            tag: colors.orange,
            fav: false
        },
        {
            id: 3,
            tag: colors.yellow,
            fav: true
        }
    ];

    return (
        <View style={styles.container}>
            <SearchItem tag={colors.blue} fav={true} />
            <SearchItem fav={true} />
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={jobList}
                renderItem={({item}) => <JobCard item={item} />}
                keyExtractor={item => item.id.toString()}
                style={{
                    marginLeft: 15,
                    overflow: 'visible'
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {}
});

export default Home;

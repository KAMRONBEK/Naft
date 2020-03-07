import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    FlatList
} from 'react-native';
import FreelancerCard from '../../components/FreelancerCard';
import colors from '../../constants/colors';
import JobCard from '../../components/JobCard';
import CategoryCard from '../../components/CategoryCard';

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

    const cateogryList = [
        {
            id: 1,
            name: 'Graphics & Design'
        },
        {
            id: 2,
            name: 'Graphics & Design'
        },
        {
            id: 3,
            name: 'Graphics & Design'
        },
        {
            id: 4,
            name: 'Graphics & Design'
        },
        {
            id: 5,
            name: 'Graphics & Design'
        }
    ];

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            <View style={styles.top}>
                <View style={styles.banner}>
                    <Text style={styles.bannerTitle}>Explore Categories</Text>
                    <Text style={styles.bannerSubTitle}>
                        Professional by categoies
                    </Text>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        data={cateogryList}
                        renderItem={({item, index}) => (
                            <CategoryCard key={item.id} item={item} />
                        )}
                        style={{
                            overflow: 'visible'
                        }}
                    />
                </View>
            </View>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>Featured Freepancers</Text>
                <Text style={styles.subTitle}>People You Can Rely On</Text>
            </View>
            <FreelancerCard tag={colors.blue} fav={false} />
            <FreelancerCard fav={true} />
            <FreelancerCard tag={colors.orange} fav={true} />
            <FreelancerCard tag={colors.yellow} fav={false} />
            <FreelancerCard fav={true} />
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>Latest Posted Jobs</Text>
                <Text style={styles.subTitle}>Start Today For Better</Text>
            </View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={jobList}
                renderItem={({item, index}) => (
                    <JobCard key={index} item={item} />
                )}
                keyExtractor={item => item.id.toString()}
                style={{
                    marginLeft: 15,
                    overflow: 'visible'
                }}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        overflow: 'visible'
    },
    top: {
        backgroundColor: colors.darkGrayBlue,
        height: 190,
        marginBottom: 50,
        overflow: 'visible'
    },
    banner: {
        // position: 'absolute',
        top: 85,
        marginLeft: 15,
        overflow: 'visible'
    },
    bannerTitle: {
        fontSize: 20,
        color: colors.white
    },
    bannerSubTitle: {
        fontSize: 17,
        color: colors.white,
        paddingBottom: 15
    },
    titleWrapper: {
        marginLeft: 15,
        paddingBottom: 5,
        paddingTop: 15
    },
    title: {
        fontSize: 20,
        color: colors.black
    },
    subTitle: {
        paddingBottom: 10,
        color: colors.darkGray
    }
});

export default Home;

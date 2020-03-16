import React, {useState, useEffect} from 'react';
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
import {freelancerList} from '../Jobs';
import {withNavigation} from '@react-navigation/compat';
import requests from '../../api/requests';

export const jobList = [
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

const Home = ({navigation}) => {
    const [categoryList, setCategoryList] = useState([{}, {}, {}]);

    useEffect(() => {}, [
        requests.list
            .getCategory()
            .then(res => {
                setCategoryList(res.data);
            })
            .catch(err => {
                console.warn(err);
            })
    ]);

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            <View style={styles.topImage}>
                <Image
                    source={{
                        uri:
                            'https://demotix.com/wp-content/uploads/2019/10/job.jpg'
                    }}
                    style={styles.image}
                />
            </View>
            <View style={styles.banner}>
                <Text style={styles.bannerTitle}>Explore Categories</Text>
                <Text style={styles.bannerSubTitle}>
                    Professional by categoies
                </Text>
                {!!categoryList && (
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        data={categoryList || [{id: 1, name: 'some'}]}
                        renderItem={({item, index}) => (
                            <CategoryCard item={item} />
                        )}
                        style={{
                            overflow: 'visible'
                        }}
                    />
                )}
            </View>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>Featured Freepancers</Text>
                <Text style={styles.subTitle}>People You Can Rely On</Text>
            </View>
            <FlatList
                style={{
                    overflow: 'visible'
                }}
                data={freelancerList}
                renderItem={({item}) => (
                    <FreelancerCard item={item} navigation={navigation} />
                )}
            />
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>Latest Posted Jobs</Text>
                <Text style={styles.subTitle}>Start Today For Better</Text>
            </View>
            <FlatList
                data={freelancerList}
                renderItem={({item}) => (
                    <JobCard
                        keyExtractor={item => item.toString()}
                        item={item}
                        navigation={navigation}
                    />
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
        overflow: 'visible',
        backgroundColor: colors.white
    },
    topImage: {
        borderRadius: 5,
        overflow: 'hidden'
    },
    image: {
        borderRadius: 5,
        height: 200,
        resizeMode: 'cover'
    },
    top: {
        backgroundColor: colors.darkGrayBlue,
        height: 190,
        marginBottom: 50,
        overflow: 'visible'
    },
    banner: {
        // position: 'absolute',
        marginTop: -100,
        marginLeft: 15,
        overflow: 'visible'
    },
    bannerTitle: {
        fontSize: 20,
        color: colors.white,
        fontWeight: 'bold'
    },
    bannerSubTitle: {
        fontSize: 15,
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

export default withNavigation(Home);

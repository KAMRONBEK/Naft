import React, {useEffect, useState} from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {connect} from 'react-redux';
import requests from '../../api/requests';
import CategoryCard from '../../components/CategoryCard';
import FreelancerCard from '../../components/FreelancerCard';
import JobCard from '../../components/JobCard';
import colors from '../../constants/colors';
import strings from '../../locales/strings';
import {hideLoading, showLoading} from '../../redux/actions/appState';

const Home = ({navigation, showLoading, hideLoading, user}) => {
    const [categoryList, setCategoryList] = useState([]);
    const [freelancerList, setFreelancerList] = useState([]);
    const [jobList, setJobList] = useState([]);

    let effect = async () => {
        showLoading(strings.loading);
        try {
            //get categories
            let categoies = await requests.list.getCategory();
            if (categoies.data.type !== 'error')
                setCategoryList(categoies.data);

            //get freelancers
            let freelancers = await requests.list.getFreelancer('latest', 5);
            if (freelancers.data.type !== 'error')
                setFreelancerList(freelancers.data);

            //get jobs
            let jobs = await requests.list.getJobs('latest', 5);
            if (jobs.data.type !== 'error') setJobList(jobs.data);
        } catch (error) {
            console.warn(error.message);
        } finally {
        }
    };

    useEffect(() => {
        effect();
    }, []);

    return (
        <SafeAreaView
            style={{flex: 1, backgroundColor: colors.white}}
            showsVerticalScrollIndicator={false}>
            <FlatList
                ListHeaderComponent={() => {
                    return (
                        <>
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
                                <Text style={styles.bannerTitle}>
                                    {strings.categories}
                                </Text>
                                <Text style={styles.bannerSubTitle}>
                                    {strings.profsByCategory}
                                </Text>
                                {!!categoryList && (
                                    <FlatList
                                        showsHorizontalScrollIndicator={false}
                                        horizontal={true}
                                        data={
                                            categoryList || [
                                                {id: 1, name: 'some'}
                                            ]
                                        }
                                        renderItem={({item, index}) => (
                                            <CategoryCard
                                                item={item}
                                                navigation={navigation}
                                            />
                                        )}
                                        keyExtractor={(item, index) =>
                                            index.toString()
                                        }
                                        style={{
                                            overflow: 'visible'
                                        }}
                                    />
                                )}
                            </View>
                            <View style={styles.titleWrapper}>
                                <Text style={styles.title}>
                                    {strings.featuredFreelancers}
                                </Text>
                                <Text style={styles.subTitle}>
                                    {strings.peopleYouCanTrust}
                                </Text>
                            </View>
                        </>
                    );
                }}
                style={{
                    overflow: 'visible'
                }}
                keyExtractor={(item, index) => index.toString()}
                data={
                    freelancerList || [
                        {
                            id: 'asda',
                            name: 'asdas'
                        }
                    ]
                }
                renderItem={({item, index}) => (
                    <FreelancerCard item={item} navigation={navigation} />
                )}
                ListFooterComponent={() => {
                    return (
                        <>
                            <View style={styles.titleWrapper}>
                                <Text style={styles.title}>
                                    {strings.latestJobs}
                                </Text>
                                <Text style={styles.subTitle}>
                                    {strings.dontBeLate}
                                </Text>
                            </View>
                            <FlatList
                                horizontal={true}
                                data={jobList || []}
                                renderItem={({item, index}) => (
                                    <JobCard
                                        item={item}
                                        navigation={navigation}
                                    />
                                )}
                                keyExtractor={index => index.toString()}
                                style={{
                                    marginLeft: 15,
                                    overflow: 'visible'
                                }}
                            />
                        </>
                    );
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'visible',
        backgroundColor: colors.white
    },
    topImage: {
        borderBottomLeftRadius: 5,
        borderBottomLeftRadius: 5,
        overflow: 'hidden'
    },
    image: {
        borderBottomLeftRadius: 5,
        borderBottomLeftRadius: 5,
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

// const mapStateToProps = state => {};
const mapStateToProps = ({user}) => ({
    user
});

const mapDispatchToProps = {
    showLoading,
    hideLoading
};

let ConnectedHome = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

export default ConnectedHome;

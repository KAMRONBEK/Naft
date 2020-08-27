import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import requests from '../../api/requests';
import JobCard from '../../components/JobCard';
import colors from '../../constants/colors';
import strings from '../../locales/strings';
import {hideLoading, showLoading} from '../../redux/actions';

const Jobs = ({navigation, showLoading, hideLoading}) => {
    let [pageIndex, setPageIndex] = useState(1);
    let [jobList, setJobList] = useState([]);

    let [loading, setLoading] = useState(false);
    const effect = async () => {
        showLoading(strings.loading);
        try {
            let categorySlug = navigation.getParam('categorySlug') || '';
            let jobRes = await requests.list.getJobs(
                'latest',
                10,
                '',
                pageIndex,
                '',
                categorySlug
            );
            setJobList(jobRes.data || []);
        } catch (error) {
            console.warn(error.message);
        } finally {
            hideLoading();
        }
    };

    const fetchJobs = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        try {
            let categorySlug = navigation.getParam('categorySlug') || '';
            let res = await requests.list.getJobs(
                'latest',
                10,
                '',
                pageIndex + 1,
                categorySlug
            );
            if (res.data.type != 'error') {
                setJobList([...jobList, ...res.data]);
                setPageIndex(pageIndex + 1);
            }
        } catch (error) {
            console.warn(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        effect();
    }, [navigation.state.params]);

    return (
        <View style={styles.container}>
            <FlatList
                data={jobList}
                renderItem={({item}) => (
                    <JobCard
                        vertical={true}
                        item={item}
                        navigation={navigation}
                    />
                )}
                keyExtractor={index => index.toString()}
                onEndReached={fetchJobs}
                onEndReachedThreshold={0.5}
            />
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

const mapDispatchToProps = {
    showLoading,
    hideLoading
};

const ConnectedJobs = connect(
    null,
    mapDispatchToProps
)(Jobs);

export default ConnectedJobs;

import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import colors from '../../constants/colors';
import JobCard from '../../components/JobCard';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import requests from '../../api/requests';
import {showLoading, hideLoading} from '../../redux/actions';
import strings from '../../locales/strings';

const Jobs = ({navigation, showLoading, hideLoading}) => {
    let [pageIndex, setPageIndex] = useState(1);
    let [jobList, setJobList] = useState([]);

    let [loading, setLoading] = useState(false);

    const effect = async () => {
        showLoading(strings.loading);
        try {
            let jobRes = await requests.list.getJobs(
                'latest',
                10,
                '',
                pageIndex
            );
            setJobList(jobRes.data);
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
            let res = await requests.list.getJobs(
                'latest',
                10,
                '',
                pageIndex + 1
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
    }, [navigation]);

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

export default withNavigation(ConnectedJobs);

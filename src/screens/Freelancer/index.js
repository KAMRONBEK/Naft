import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import FreelancerCard from '../../components/FreelancerCard';
import {FlatList} from 'react-native-gesture-handler';
import {showLoading, hideLoading} from '../../redux/actions';
import strings from '../../locales/strings';
import {connect} from 'react-redux';
import requests from '../../api/requests';

const Freelancer = ({navigation, hideLoading, showLoading}) => {
    let [pageIndex, setPageIndex] = useState(1);
    let [freelancerList, setFreelancerList] = useState([]);

    let [loading, setLoading] = useState(false);

    const effect = async () => {
        showLoading(strings.loading);
        try {
            let freelancerRes = await requests.list.getFreelancer(
                'latest',
                10,
                '',
                pageIndex
            );
            setFreelancerList(freelancerRes.data);
        } catch (error) {
            console.warn(error.message);
        } finally {
            hideLoading();
        }
    };

    const fetchFreelancers = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        try {
            let res = await requests.list.getFreelancer(
                'latest',
                10,
                '',
                pageIndex + 1
            );
            console.warn(res.data.type);
            if (res.data.type != 'error') {
                setFreelancerList([...freelancerList, ...res.data]);
            }
            setPageIndex(pageIndex + 1);
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
                data={freelancerList}
                renderItem={({item}) => (
                    <FreelancerCard item={item} navigation={navigation} />
                )}
                keyExtractor={index => {
                    index;
                }}
                style={{
                    marginTop: 10,
                    overflow: 'visible'
                }}
                onEndReached={fetchFreelancers}
                onEndReachedThreshold={0.5}
            />
        </View>
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

const mapDispatchToProps = {
    showLoading,
    hideLoading
};

export default connect(
    null,
    mapDispatchToProps
)(Freelancer);

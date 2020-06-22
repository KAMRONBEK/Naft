import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet, FlatList} from 'react-native';
import CompanyCard from '../../components/CompanyCard';
import strings from '../../locales/strings';
import {showLoading, hideLoading} from '../../redux/actions';
import {connect} from 'react-redux';
import requests from '../../api/requests';

const Comapany = ({navigation, showLoading, hideLoading}) => {
    let [pageIndex, setPageIndex] = useState(1);
    let [companyList, setCompanyList] = useState([]);
    let [loading, setLoading] = useState(false);

    const effect = async () => {
        showLoading(strings.loading);
        try {
            let companyRes = await requests.list.getCompanies(
                'latest',
                10,
                pageIndex
            );
            setCompanyList(companyRes.data);
        } catch (error) {
            console.warn(error.message);
        } finally {
            hideLoading();
        }
    };

    const fetchCompanies = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        try {
            let res = await requests.list.getCompanies(
                'latest',
                10,
                pageIndex + 1
            );
            if (res.data.type != 'error') {
                setCompanyList([...companyList, ...res.data]);
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
            <View>
                <FlatList
                    style={{
                        paddingHorizontal: 15,
                        marginTop: 10
                    }}
                    data={companyList}
                    renderItem={({item}) => <CompanyCard item={item} />}
                    keyExtractor={index => index.toString()}
                    onEndReached={fetchCompanies}
                    onEndReachedThreshold={0.5}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contianer: {
        flex: 1
    }
});

const mapDispatchToProps = {
    showLoading,
    hideLoading
};

export default connect(
    null,
    mapDispatchToProps
)(Comapany);

import React from 'react';
import {View, Text, ScrollView, StyleSheet, FlatList} from 'react-native';
import CompanyCard from '../../components/CompanyCard';

const Comapany = () => {
    const companyList = [
        {
            id: 1,
            image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRtYO9V_qOSTfT_uW0U8ow_cjG29TqUlPAU7bC9b4Wj-pg-PMiD',
            banner:
                'https://assets.entrepreneur.com/content/3x2/2000/20150805204041-google-company-building-corporate.jpeg',
            name: 'Google',
            favorite: true,
            desc: ' Examples of Companies With Fantastic Cultures'
        },
        {
            id: 2,
            image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRtYO9V_qOSTfT_uW0U8ow_cjG29TqUlPAU7bC9b4Wj-pg-PMiD',
            banner:
                'https://assets.entrepreneur.com/content/3x2/2000/20150805204041-google-company-building-corporate.jpeg',
            name: 'Google',
            favorite: true,
            desc: ' Examples of Companies With Fantastic Cultures'
        },
        {
            id: 3,
            image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRtYO9V_qOSTfT_uW0U8ow_cjG29TqUlPAU7bC9b4Wj-pg-PMiD',
            banner:
                'https://assets.entrepreneur.com/content/3x2/2000/20150805204041-google-company-building-corporate.jpeg',
            name: 'Google',
            favorite: true,
            desc: ' Examples of Companies With Fantastic Cultures'
        },
        {
            id: 4,
            image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRtYO9V_qOSTfT_uW0U8ow_cjG29TqUlPAU7bC9b4Wj-pg-PMiD',
            banner:
                'https://assets.entrepreneur.com/content/3x2/2000/20150805204041-google-company-building-corporate.jpeg',
            name: 'Google',
            favorite: true,
            desc: ' Examples of Companies With Fantastic Cultures'
        },
        {
            id: 5,
            image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRtYO9V_qOSTfT_uW0U8ow_cjG29TqUlPAU7bC9b4Wj-pg-PMiD',
            banner:
                'https://assets.entrepreneur.com/content/3x2/2000/20150805204041-google-company-building-corporate.jpeg',
            name: 'Google',
            favorite: true,
            desc: ' Examples of Companies With Fantastic Cultures'
        },
        {
            id: 6,
            image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRtYO9V_qOSTfT_uW0U8ow_cjG29TqUlPAU7bC9b4Wj-pg-PMiD',
            banner:
                'https://assets.entrepreneur.com/content/3x2/2000/20150805204041-google-company-building-corporate.jpeg',
            name: 'Google',
            favorite: true,
            desc: ' Examples of Companies With Fantastic Cultures'
        }
    ];

    return (
        <ScrollView style={styles.container}>
            <FlatList
                style={{
                    paddingHorizontal: 15,
                    marginTop: 10
                }}
                data={companyList}
                renderItem={({item}) => <CompanyCard item={item} />}
                keyExtractor={item => item.id}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contianer: {}
});

export default Comapany;

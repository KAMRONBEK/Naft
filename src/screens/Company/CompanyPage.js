import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    FlatList
} from 'react-native';
import colors from '../../constants/colors';
import CompanyPageCard from '../../components/CompanyPageCard';
import strings from '../../locales/strings';
import JobCard from '../../components/JobCard';
import {jobList} from '../Home';

const CompanyPage = ({navigation}) => {
    let company = navigation.getParam('company');

    return (
        <ScrollView style={styles.container}>
            <View style={styles.topImage}>
                <Image
                    source={{
                        uri: !!company.banner_img
                            ? company.banner_img
                            : 'https://ehyperspace.com/wp-content/uploads/2019/10/7.jpg'
                    }}
                    style={styles.image}
                />
            </View>
            <View style={styles.cardWrapper}>
                <CompanyPageCard item={company} />
            </View>
            <View style={styles.contentWrapper}>
                <Text style={styles.title}>{strings.about}</Text>
                <Text>{company.employer_des} </Text>
                <Text style={styles.title}>{strings.jobOpenings}</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={jobList}
                    renderItem={({item}) => (
                        <JobCard
                            item={item}
                            vertical={true}
                            key={item.id.toString()}
                        />
                    )}
                    style={{overflow: 'hidden'}}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1
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
    cardWrapper: {
        marginTop: -100,
        paddingHorizontal: 15
    },
    contentWrapper: {
        padding: 15,
        paddingBottom: 0,
        paddingVertical: 10
    },
    title: {
        marginTop: 10,
        paddingBottom: 15,
        fontSize: 19
    }
});

export default CompanyPage;

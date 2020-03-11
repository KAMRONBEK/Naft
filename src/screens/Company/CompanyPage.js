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

const CompanyPage = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.topImage}>
                <Image
                    source={{
                        uri:
                            'https://i1.wp.com/geoawesomeness.com/wp-content/uploads/2017/09/Coding-Geospatial.jpg?ssl=1'
                    }}
                    style={styles.image}
                />
            </View>
            <View style={styles.cardWrapper}>
                <CompanyPageCard />
            </View>
            <View style={styles.contentWrapper}>
                <Text style={styles.title}>Project Stats</Text>
                <Text>
                    Consectetur adipisicing elit, sedsmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minimame quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat. Duis aute irure dolor in repit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariri
                    Excepteur sint occaecat cupidatat non proident, sunt in
                </Text>
                <Text>{''}</Text>
                <Text>
                    culpa qui officia deserunt mollit anim. Sed ut perspiciatis
                    unde omnis iste natus error sitatatem accusantium doloremque
                    laudantium, totam rem aciam eaque ipsa quae ab illo
                    inventore veritatis et quasi archo beatae vitae dicta sunt
                    explicabo. Nemo enim ipsam vim quia voluptas sit aspernatur
                    aut odit aut fugit.
                </Text>
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

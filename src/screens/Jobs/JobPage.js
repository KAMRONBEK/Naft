import React from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import JobPageCard from '../../components/JobPageCard';
import colors from '../../constants/colors';
import strings from '../../locales/strings';
import {FlatList} from 'react-native-gesture-handler';
import BulletText from '../../components/BulletText';
import RectangleButton from '../../components/RectangleButton';
import Attachment from '../../components/Attachment';

const skillList = [
    {id: 1, name: 'PHP'},
    {id: 2, name: 'PHP'},
    {id: 3, name: 'PHP'},
    {id: 4, name: 'PHP'},
    {id: 5, name: 'PHP'}
];

const attachmentList = [
    {id: 1, name: 'WireFrame Documentation', size: '512 kb'},
    {id: 2, name: 'WireFrame Documentation', size: '512 kb'},
    {id: 3, name: 'WireFrame Documentation', size: '512 kb'},
    {id: 4, name: 'WireFrame Documentation', size: '512 kb'},
    {id: 5, name: 'WireFrame Documentation', size: '512 kb'},
    {id: 6, name: 'WireFrame Documentation', size: '512 kb'},
    {id: 7, name: 'WireFrame Documentation', size: '512 kb'}
];

const JobPage = ({navigation}) => {
    let job = navigation.getParam('job');

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                ListHeaderComponent={() => {
                    return (
                        <>
                            <JobPageCard item={job} />
                            <Text style={styles.title}>
                                {strings.projectDetails}
                            </Text>
                            <Text>{job.project_content}</Text>
                            <Text style={styles.title}>
                                {strings.skillsRequired}
                            </Text>
                        </>
                    );
                }}
                numColumns={2}
                contentContainerStyle={styles.contentWrapper}
                data={job.skills}
                renderItem={({item}) => <BulletText item={item} />}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={() => {
                    return (
                        <>
                            <Text style={styles.title}>
                                {strings.attachments}
                            </Text>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                data={job.attanchents}
                                horizontal={true}
                                renderItem={({item}) => (
                                    <Attachment item={item} />
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                            <View style={styles.buttonWrapper}>
                                <RectangleButton
                                    fill
                                    backColor={colors.blue}
                                    text={strings.sendProposal}
                                    minWidth={180}
                                />
                                <RectangleButton
                                    fill
                                    backColor={colors.green}
                                    iconName="md-share"
                                />
                                <RectangleButton
                                    fill
                                    backColor={colors.red}
                                    iconName="md-information-circle-outline"
                                />
                            </View>
                        </>
                    );
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1
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
    },
    buttonWrapper: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default JobPage;

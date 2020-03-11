import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
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

const JobPage = () => {
    return (
        <ScrollView style={styles.container}>
            <JobPageCard />
            <View style={styles.contentWrapper}>
                <Text style={styles.title}>{strings.projectDetails}</Text>
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
                <Text style={styles.title}>{strings.skillsRequired}</Text>
                <FlatList
                    numColumns={2}
                    data={skillList}
                    renderItem={({item}) => <BulletText item={item} />}
                />
                <Text style={styles.title}>{strings.attachments}</Text>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={attachmentList}
                    horizontal={true}
                    renderItem={({item}) => <Attachment item={item} />}
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
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white
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

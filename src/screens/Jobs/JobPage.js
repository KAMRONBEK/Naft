import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Alert
} from 'react-native';
import JobPageCard from '../../components/JobPageCard';
import colors from '../../constants/colors';
import strings from '../../locales/strings';
import {FlatList} from 'react-native-gesture-handler';
import BulletText from '../../components/BulletText';
import RectangleButton from '../../components/RectangleButton';
import Attachment from '../../components/Attachment';
import {connect} from 'react-redux';
import {hideLoading, showLoading} from '../../redux/actions/index';
import requests from '../../api/requests';
import {normalizeFilters} from '../../utils/utilities';
import {Modal} from 'react-native-paper';

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

const JobPage = ({navigation, showLoading, hideLoading, user}) => {
    let job = navigation.getParam('job');
    let onSubscribePress = () => {
        // showLoading();
        console.warn({user, job});
        if (Object.keys(user.profle || {}).length <= 0) {
            return Alert.alert(strings.attention, strings.pleaseLogin, [
                {style: 'cancel', text: strings.CANCEL},
                {
                    onPress: () => navigation.navigate('Login'),
                    style: 'default',
                    text: strings.OK
                }
            ]);
        }
        let submitData = {};
        try {
            requests.act.submitProposal(normalizeFilters());
        } catch (error) {}
    };
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
                            <Text>{job.project_content_text}</Text>
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
                                    onPress={onSubscribePress}
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
            <Modal />
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

const mapStateToProps = ({user}) => ({user});

const mapDispatchToProps = {
    showLoading,
    hideLoading
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(JobPage);

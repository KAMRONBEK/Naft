import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import colors from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FreelancerPageCard from '../../components/FreelancerPageCard';
import CustomCounter from '../../components/CustomCounter';
import RectangleButton from '../../components/RectangleButton';
import CustomProgressBar from '../../components/CustomProgressBar';
import {FlatList} from 'react-native-gesture-handler';
import HorizontalLine from '../../components/HorizontalLine';
import SimpleCard from '../../components/SimpleCard';
import FeedbackCard from '../../components/FeedbackCard';
import ExperienceCard from '../../components/ExperienceCard';
import strings from '../../locales/strings';

const FreelancerPage = ({navigation}) => {
    let freelancer = navigation.getParam('freelancer');

    return (
        <ScrollView style={styles.container}>
            <View style={styles.topImage}>
                <Image
                    source={{
                        uri: freelancer && freelancer.banner_img
                    }}
                    style={styles.image}
                />
            </View>
            <View
                style={[
                    styles.cardWrapper,
                    {
                        marginTop: -100
                    }
                ]}>
                <FreelancerPageCard item={freelancer} />
            </View>

            <View style={styles.cardWrapper}>
                <Text style={styles.title}>{strings.about}</Text>
                <Text>{freelancer.content}</Text>
                <Text style={styles.title}>{strings.projectStats}</Text>
                <CustomCounter item={freelancer} />
                {/* <View style={styles.alertTextWrapper}>
                    <Text style={styles.alertSign}>*</Text>
                    <Text style={styles.textCenter}>
                        Consectetur adipisicing elit sedsmod tempor incididunt
                        ut labore et dolore magna
                    </Text>
                </View> */}
                <View style={styles.buttonWrapper}>
                    <RectangleButton
                        backColor={colors.red}
                        text={strings.sendOffer}
                        fill
                    />
                </View>
            </View>
            <HorizontalLine />
            <View style={styles.cardWrapper}>
                <Text style={styles.title}>{strings.mySkills}</Text>
                <FlatList
                    data={freelancer.skills}
                    renderItem={({item}) => {
                        return <CustomProgressBar item={item} />;
                    }}
                    keyExtractor={index => index.toString()}
                />
                {/* <RectangleButton
                    fill={false}
                    text="show more"
                    textColor={colors.blue}
                /> */}
            </View>
            <HorizontalLine />
            <View style={styles.cardWrapper}>
                <Text style={styles.title}>{strings.awardAndCertificate}</Text>
                <FlatList
                    data={freelancer._awards}
                    renderItem={({item}) => {
                        return <SimpleCard item={item} />;
                    }}
                    keyExtractor={index => index.toString()}
                />
            </View>
            {/* <HorizontalLine />
            <View style={styles.cardWrapper}>
                <Text style={styles.title}>Client Feedback</Text>
                <FlatList
                    data={feedbackList}
                    renderItem={({item}) => {
                        return <FeedbackCard item={item} key={item.id} />;
                    }}
                />
                <RectangleButton text="show more" textColor={colors.blue} />
            </View> */}
            <HorizontalLine />
            <View style={styles.cardWrapper}>
                <Text style={styles.title}>{strings.projects}</Text>
                <FlatList
                    data={freelancer._projects}
                    renderItem={({item}) => {
                        return <SimpleCard item={item} />;
                    }}
                    keyExtractor={index => index.toString()}
                />
                {/* <RectangleButton text="show more" textColor={colors.blue} /> */}
            </View>
            <HorizontalLine />
            <View style={styles.cardWrapper}>
                <Text style={styles.title}>{strings.experience}</Text>
                <FlatList
                    data={freelancer._experiences}
                    renderItem={({item}) => {
                        return <ExperienceCard item={item} />;
                    }}
                    keyExtractor={index => index.toString()}
                />
                {/* <RectangleButton text="show more" textColor={colors.blue} /> */}
            </View>
            <View style={styles.cardWrapper}>
                <Text style={styles.title}>{strings.education}</Text>
                <FlatList
                    data={freelancer._educations}
                    renderItem={({item}) => {
                        return <ExperienceCard item={item} />;
                    }}
                    keyExtractor={index => index.toString()}
                />
                {/* <RectangleButton text="show more" textColor={colors.blue} /> */}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: colors.white
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
        padding: 15,
        paddingBottom: 0,
        paddingVertical: 10
    },
    title: {
        marginTop: 10,
        paddingBottom: 15,
        fontSize: 19
    },
    alertTextWrapper: {
        paddingTop: 30,
        paddingHorizontal: 20,
        flexDirection: 'row'
    },
    alertSign: {
        color: colors.red
    },
    textCenter: {
        textAlign: 'center'
    },
    buttonWrapper: {
        padding: 10,
        paddingHorizontal: 50
    }
});

export default FreelancerPage;

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

const FreelancerPage = ({}) => {
    const skillList = [
        {id: 1, name: 'PHP', percent: 95},
        {id: 2, name: 'Java', percent: 75},
        {id: 3, name: 'Go', percent: 90},
        {id: 4, name: 'Javascript', percent: 50},
        {id: 5, name: 'React', percent: 80},
        {id: 6, name: 'Yarn', percent: 25},
        {id: 7, name: 'Npm', percent: 90}
    ];

    const awardList = [
        {
            id: 1,
            name: 'Apr 15, 2019',
            title: 'Best Communication'
        },
        {
            id: 2,
            name: 'Apr 15, 2019',
            title: 'Best Communication'
        },
        {
            id: 3,
            name: 'Apr 15, 2019',
            title: 'Best Communication'
        },
        {
            id: 4,
            name: 'Apr 15, 2019',
            title: 'Best Communication'
        }
    ];

    const projectList = [
        {
            id: 1,
            link: 'naft.uz',
            title: 'Naft.uz',
            image:
                'http://naft.uz/uploads/pages/5/1579153406-1558518016-1557484284-mobile-img.png'
        },
        {
            id: 2,
            link: 'naft.uz',
            title: 'Naft.uz',
            image:
                'http://naft.uz/uploads/pages/5/1579153406-1558518016-1557484284-mobile-img.png'
        },
        {
            id: 3,
            link: 'naft.uz',
            title: 'Naft.uz',
            image:
                'http://naft.uz/uploads/pages/5/1579153406-1558518016-1557484284-mobile-img.png'
        },
        {
            id: 4,
            link: 'naft.uz',
            title: 'Naft.uz',
            image:
                'http://naft.uz/uploads/pages/5/1579153406-1558518016-1557484284-mobile-img.png'
        }
    ];

    const feedbackList = [
        {
            id: 1,
            name: 'Teaforest Studio',
            desc: 'Need help for translating this to this',
            image: 'https://www.kallanish.com/static/src/images/user.png',
            completedDate: 'May 30,2019',
            // stars: 3,
            finished: true,
            quote:
                'Cnsectetur adipisicing sedsmod tempor incididunt ut labore et dolore magna andem'
        },
        {
            id: 2,
            name: 'Someother Studio',
            desc: 'Need help for translating this to this',
            image: 'https://www.kallanish.com/static/src/images/user.png',
            completedDate: 'May 30,2019',
            stars: 5,
            finished: true,
            quote:
                'Cnsectetur adipisicing sedsmod tempor incididunt ut labore et dolore magna andem'
        },
        {
            id: 3,
            name: 'Maybe Studio',
            desc: 'Need help for translating this to this',
            image: 'https://www.kallanish.com/static/src/images/user.png',
            // completedDate: 'May 30,2019',
            stars: 3,
            finished: false,
            quote:
                'Cnsectetur adipisicing sedsmod tempor incididunt ut labore et dolore magna andem'
        },
        {
            id: 4,
            name: 'Teaforest Studio',
            desc: 'Need help for translating this to this',
            image: 'https://www.kallanish.com/static/src/images/user.png',
            completedDate: 'May 30,2019',
            stars: 3,
            finished: true,
            quote:
                'Cnsectetur adipisicing sedsmod tempor incididunt ut labore et dolore magna andem'
        },
        {
            id: 5,
            name: 'Teaforest Studio',
            desc: 'Need help for translating this to this',
            image: 'https://www.kallanish.com/static/src/images/user.png',
            // completedDate: 'May 30,2019',
            // stars: 2,
            finished: false,
            quote:
                'Cnsectetur adipisicing sedsmod tempor incididunt ut labore et dolore magna andem'
        }
    ];

    const experienceList = [
        {
            id: 1,
            name: 'Animation and Advanced VFX',
            location: 'Amen Techno',
            fromDate: 'Aug 2017',
            quote:
                'Cnsectetur adipisicing sedsmod tempor incididunt ut labore et dolore magna andem'
        },
        {
            id: 2,
            name: 'Animation and Advanced VFX',
            location: 'Amen Techno',
            fromDate: 'Aug 2017',
            toDate: 'Jul 2018',
            quote:
                'Cnsectetur adipisicing sedsmod tempor incididunt ut labore et dolore magna andem'
        },
        {
            id: 3,
            name: 'Animation and Advanced VFX',
            location: 'Amen Techno',
            fromDate: 'Aug 2017',
            toDate: 'Jul 2018',
            quote:
                'Cnsectetur adipisicing sedsmod tempor incididunt ut labore et dolore magna andem'
        },
        {
            id: 4,
            name: 'Animation and Advanced VFX',
            location: 'Amen Techno',
            fromDate: 'Aug 2017',
            quote:
                'Cnsectetur adipisicing sedsmod tempor incididunt ut labore et dolore magna andem'
        },
        {
            id: 5,
            name: 'Animation and Advanced VFX',
            location: 'Amen Techno',
            fromDate: 'Aug 2017',
            toDate: 'Jul 2018',
            quote:
                'Cnsectetur adipisicing sedsmod tempor incididunt ut labore et dolore magna andem'
        }
    ];

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
            <View
                style={[
                    styles.cardWrapper,
                    {
                        marginTop: -100
                    }
                ]}>
                <FreelancerPageCard />
            </View>

            <View style={styles.cardWrapper}>
                <Text style={styles.title}>About</Text>
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
                <Text style={styles.title}>Project Stats</Text>
                <CustomCounter />

                <View style={styles.alertTextWrapper}>
                    <Text style={styles.alertSign}>*</Text>
                    <Text style={styles.textCenter}>
                        Consectetur adipisicing elit sedsmod tempor incididunt
                        ut labore et dolore magna
                    </Text>
                </View>
                <View style={styles.buttonWrapper}>
                    <RectangleButton
                        backColor={colors.red}
                        text="send offer"
                        fill
                    />
                </View>
            </View>
            <HorizontalLine />
            <View style={styles.cardWrapper}>
                <Text style={styles.title}>My Skills</Text>
                <FlatList
                    data={skillList}
                    renderItem={({item}) => {
                        return <CustomProgressBar item={item} key={item.id} />;
                    }}
                />
                <RectangleButton
                    fill={false}
                    text="show more"
                    textColor={colors.blue}
                />
            </View>
            <HorizontalLine />
            <View style={styles.cardWrapper}>
                <Text style={styles.title}>Awards & Certifications</Text>
                <FlatList
                    data={awardList}
                    renderItem={({item}) => {
                        return <SimpleCard item={item} key={item.id} />;
                    }}
                />
            </View>
            <HorizontalLine />
            <View style={styles.cardWrapper}>
                <Text style={styles.title}>Client Feedback</Text>
                <FlatList
                    data={feedbackList}
                    renderItem={({item}) => {
                        return <FeedbackCard item={item} key={item.id} />;
                    }}
                />
                <RectangleButton text="show more" textColor={colors.blue} />
            </View>
            <HorizontalLine />
            <View style={styles.cardWrapper}>
                <Text style={styles.title}>Crafted Projects</Text>
                <FlatList
                    data={projectList}
                    renderItem={({item}) => {
                        return <SimpleCard item={item} key={item.id} />;
                    }}
                />
                <RectangleButton text="show more" textColor={colors.blue} />
            </View>
            <HorizontalLine />
            <View style={styles.cardWrapper}>
                <Text style={styles.title}>Experience</Text>
                <FlatList
                    data={experienceList}
                    renderItem={({item}) => {
                        return <ExperienceCard item={item} key={item.id} />;
                    }}
                />
                <RectangleButton text="show more" textColor={colors.blue} />
            </View>
            <View style={styles.cardWrapper}>
                <Text style={styles.title}>Education</Text>
                <FlatList
                    data={experienceList}
                    renderItem={({item}) => {
                        return <ExperienceCard item={item} key={item.id} />;
                    }}
                />
                <RectangleButton text="show more" textColor={colors.blue} />
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

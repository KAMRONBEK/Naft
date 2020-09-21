import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Image
} from 'react-native';
import SearchBar from '../components/SearchBar';
import Icons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import {withNavigation} from 'react-navigation';
import Animated, {Easing} from 'react-native-reanimated';
import images from '../assets/images';
// import {useIsDrawerOpen} from '@react-navigation/drawer';
// import {DrawerGestureContext} from '@react-navigation/drawer/src/index';

let SimpleLineIcons = Animated.createAnimatedComponent(Icons);

const Header = ({navigation, progress, back, title, noMenu}) => {
    // const isDrawerOpen = useIsDrawerOpen();

    // let [rotateValue] = useState(new Animated.Value(0));

    // let rotateAnimation = () => {
    //     Animated.timing(rotateValue, {
    //         toValue: isDrawerOpen ? 45 : 0,
    //         duration: isDrawerOpen ? 200 : 100,
    //         easing: Easing.linear
    //     }).start(() => {});
    // };

    // const interpolatedRotateAnimation = Animated.concat(
    //     rotateValue,
    //     'deg'
    // ); /* '0deg' */

    // useEffect(() => {
    //     rotateAnimation();
    // }, [isDrawerOpen]);

    return (
        <View style={styles.container}>
            {back && (
                <TouchableWithoutFeedback
                    onPress={() => {
                        navigation.popToTop();
                    }}>
                    <View
                        style={{
                            padding: 5,
                            marginRight: 15
                        }}>
                        <Ionicons
                            name="ios-arrow-back"
                            size={25}
                            color={colors.white}
                        />
                    </View>
                </TouchableWithoutFeedback>
            )}
            {!noMenu && (
                <TouchableWithoutFeedback
                    onPress={() => navigation.toggleDrawer()}>
                    <View style={[styles.iconWrapper]}>
                        {/* <DrawerGestureContext.Consumer>
                        {props => {
                            let ref = props || props.current;
                            return (
                                <SimpleLineIcons
                                    name="menu"
                                    color={colors.white}
                                    size={25}
                                    style={{
                                        transform: [
                                            {
                                                rotate: interpolatedRotateAnimation
                                            }
                                        ]
                                    }}
                                />
                            );
                        }}
                    </DrawerGestureContext.Consumer> */}
                        {/* <SimpleLineIcons
                        name="menu"
                        color={colors.white}
                        size={25}
                        style={{
                            transform: [
                                {
                                    rotate: '0deg'
                                }
                            ]
                        }}
                    /> */}
                        <Image source={images.menu} style={styles.icon} />
                    </View>
                </TouchableWithoutFeedback>
            )}
            {!title ? (
                <View style={styles.searchWrapper}>
                    <SearchBar />
                </View>
            ) : (
                <View
                    style={[
                        styles.titleWrapper,
                        back ||
                            (!noMenu && {
                                paddingRight: 45
                            })
                    ]}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.red,
        padding: 12,
        alignItems: 'center'
    },
    iconWrapper: {
        paddingRight: 20
    },
    icon: {
        height: 20,
        width: 30,
        tintColor: colors.white
    },
    searchWrapper: {
        flex: 1
    },
    titleWrapper: {
        flex: 1
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.white
    }
});

export default withNavigation(Header);

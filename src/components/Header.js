import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import SearchBar from '../components/SearchBar';
import Icons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import {withNavigation} from '@react-navigation/compat';
import {useIsDrawerOpen} from '@react-navigation/drawer';
import Animated, {Easing} from 'react-native-reanimated';
import {DrawerGestureContext} from '@react-navigation/drawer/src/index';

let SimpleLineIcons = Animated.createAnimatedComponent(Icons);

const Header = ({navigation, progress, back}) => {
    const isDrawerOpen = useIsDrawerOpen();

    let [rotateValue] = useState(new Animated.Value(0));

    let rotateAnimation = () => {
        Animated.timing(rotateValue, {
            toValue: isDrawerOpen ? 45 : 0,
            duration: isDrawerOpen ? 200 : 100,
            easing: Easing.linear
        }).start(() => {});
    };

    const interpolatedRotateAnimation = Animated.concat(
        rotateValue,
        'deg'
    ); /* '0deg' */

    useEffect(() => {
        rotateAnimation();
    }, [isDrawerOpen]);

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
                            marginRight: 10
                        }}>
                        <Ionicons
                            name="ios-arrow-back"
                            size={25}
                            color={colors.white}
                        />
                    </View>
                </TouchableWithoutFeedback>
            )}
            <TouchableWithoutFeedback
                onPress={() => {
                    navigation.toggleDrawer();
                }}>
                <View style={[styles.iconWrapper]}>
                    <DrawerGestureContext.Consumer>
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
                    </DrawerGestureContext.Consumer>
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.searchWrapper}>
                <SearchBar />
            </View>
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
        paddingRight: 30
    },
    searchWrapper: {
        flex: 1
    }
});

export default withNavigation(Header);

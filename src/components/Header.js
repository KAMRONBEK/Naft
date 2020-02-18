import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    LayoutAnimation
} from 'react-native';
import SearchBar from '../components/SearchBar';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import colors from '../constants/colors';
import {withNavigation} from '@react-navigation/compat';
import {useIsDrawerOpen} from '@react-navigation/drawer';

const Header = ({navigation}) => {
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback
                onPress={() => {
                    LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.linear
                    );
                    navigation.toggleDrawer();
                }}>
                <View style={[styles.iconWrapper]}>
                    <SimpleLineIcons
                        name="menu"
                        color={colors.white}
                        size={25}
                        style={
                            useIsDrawerOpen()
                                ? {
                                      transform: [{rotate: '45deg'}]
                                  }
                                : {
                                      transform: [{rotate: '0deg'}]
                                  }
                        }
                    />
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

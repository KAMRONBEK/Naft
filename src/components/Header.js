import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SearchBar from '../components/SearchBar';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import colors from '../constants/colors';

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.iconWrapper}>
                <SimpleLineIcons name="menu" color={colors.white} size={25} />
            </View>
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
        padding: 15,
        alignItems: 'center'
    },
    iconWrapper: {
        paddingRight: 30
    },
    searchWrapper: {
        flex: 1
    }
});

export default Header;

import React from 'react';
import {View, Text} from 'react-native';

const SearchItem = () => {
    return (
        <View style={styles.container}>
            <View style={styles.box}></View>
            <View style={styles.favIcon}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    box: {},
    favIcon: {}
});

export default SearchItem;

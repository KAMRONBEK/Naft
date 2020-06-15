import LottieView from 'lottie-react-native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import lotties from '../assets/lotties';
import colors from '../constants/colors';

const LoadingModal = ({loadingMessage, isLoading}) => {
    if (!isLoading) {
        return null;
    }
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <LottieView source={lotties.loading} autoPlay loop />
                <Text style={styles.text}>{loadingMessage}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        justifyContent: 'center',
        backgroundColor: colors.white
    },
    content: {
        borderWidth: 1,
        marginTop: -40,
        alignItems: 'center'
    },
    text: {
        color: colors.black,
        fontSize: 18,
        marginTop: 300
    }
});

const mapStateToProps = ({appState: {loadingMessage, isLoading}}) => ({
    loadingMessage,
    isLoading
});

const mapDispatchToProps = {};

export default connect(mapStateToProps)(LoadingModal);

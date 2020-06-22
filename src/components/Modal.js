import React from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import colors from '../constants/colors';
import {connect} from 'react-redux';
import {hideModal} from '../redux/actions';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import strings from '../locales/strings';

const Modal = ({hideModal, modalVisible, modalMessage, modalType}) => {
    if (!modalVisible) {
        return null;
    }

    const onPress = () => {
        hideModal();
    };
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.titleWrapper}>
                    <EvilIcons name="exclamation" color={modalType} size={50} />
                    <Text style={styles.title}>{modalMessage}</Text>
                </View>
                <TouchableWithoutFeedback onPress={onPress}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>{strings.ok}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.darkTransparent,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        backgroundColor: colors.white,
        height: 280,
        width: 200,
        borderRadius: 10,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    titleWrapper: {
        alignItems: 'center'
    },
    title: {
        paddingTop: 20,
        color: colors.darkGrayBlue,
        fontSize: 16
    },
    button: {
        backgroundColor: colors.green,
        width: 80,
        height: 55,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white
    }
});

const mapStateToProps = ({appState}) => ({
    modalVisible: appState.modalVisible,
    modalMessage: appState.modalMessage,
    modalType: appState.modalType
});

const mapDispatchToProps = {
    hideModal
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Modal);

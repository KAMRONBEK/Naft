import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {withNavigation} from 'react-navigation';
import colors from '../constants/colors';

const DrawerItem = ({name, antIcon, simpleIcon, to, onPress, navigation}) => {
    return (
        <TouchableWithoutFeedback
            onPress={
                onPress
                    ? onPress
                    : () => {
                          navigation.navigate(to);
                      }
            }>
            <View style={styles.container}>
                {antIcon ? (
                    <AntDesign name={antIcon} size={25} color={colors.black} />
                ) : (
                    <></>
                )}
                {simpleIcon ? (
                    <SimpleLineIcons
                        name={simpleIcon}
                        size={25}
                        color={colors.black}
                    />
                ) : (
                    <></>
                )}
                <Text style={styles.name}>{name}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    name: {
        color: colors.black
        // color: colors.white
    }
});

export default withNavigation(DrawerItem);

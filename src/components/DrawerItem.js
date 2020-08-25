import React from 'react';
import {View, Text, StyleSheet, Linking} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {withNavigation} from 'react-navigation';
import colors from '../constants/colors';

const DrawerItem = ({
    name,
    antIcon,
    simpleIcon,
    to,
    onPress,
    navigation,
    link
}) => {
    return (
        <TouchableWithoutFeedback
            onPress={
                onPress
                    ? onPress
                    : () => {
                          if (link) {
                              Linking.openURL(to);
                          } else {
                              navigation.navigate(to);
                          }
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
        alignItems: 'center',
        paddingBottom: 30
    },
    name: {
        color: colors.black,
        textAlign: 'center'
        // color: colors.white
    }
});

export default withNavigation(DrawerItem);

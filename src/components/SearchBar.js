import React, {useState} from 'react';
import {View, Text, StyleSheet, LayoutAnimation} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../constants/colors';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import strings from '../locales/strings';

const SearchBar = () => {
    let [searchOn, setSearchOn] = useState(false);

    return (
        <View
            style={[
                styles.container,
                searchOn && {
                    flexDirection: 'row-reverse'
                }
            ]}>
            {!searchOn ? (
                <View style={styles.iconWrapper}>
                    <EvilIcons name="search" color={colors.white} size={25} />
                </View>
            ) : (
                <TouchableOpacity>
                    <View style={styles.iconWrapper}>
                        <EvilIcons
                            name="search"
                            color={colors.white}
                            size={35}
                        />
                    </View>
                </TouchableOpacity>
            )}
            <View
                style={[
                    styles.inputWrapper,
                    searchOn && {
                        flex: 1
                    }
                ]}>
                <TextInput
                    style={[
                        styles.input,
                        searchOn && {
                            width: 220
                        }
                    ]}
                    placeholder={strings.imLookingFor}
                    placeholderTextColor={colors.white}
                    onFocus={() => {
                        LayoutAnimation.configureNext(
                            LayoutAnimation.Presets.easeInEaseOut
                        );
                        setSearchOn(!searchOn);
                    }}
                    onEndEditing={() => {
                        LayoutAnimation.configureNext(
                            LayoutAnimation.Presets.easeInEaseOut
                        );
                        setSearchOn(false);
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.paleTransparent,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100
    },
    iconWrapper: {
        paddingHorizontal: 10
    },
    inputWrapper: {},
    input: {
        marginHorizontal: 10,
        color: colors.white,
        margin: 0,
        padding: 0,
        height: 40,
        width: 100
    }
});

export default SearchBar;

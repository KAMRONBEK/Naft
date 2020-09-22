import React, { useState } from 'react'
import axios from 'axios'

import { connect } from 'react-redux'
import { userLoaded } from '../../redux/actions'

import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    TouchableWithoutFeedback,
} from 'react-native'
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('window')
const INJECTEDJAVASCRIPT = 'const meta = document.createElement(\'meta\'); meta.setAttribute(\'content\', \'width=device-width, initial-scale=1, maximum-scale=0.99, user-scalable=0\'); meta.setAttribute(\'name\', \'viewport\'); document.getElementsByTagName(\'head\')[0].appendChild(meta);'

const mapStateToProps = ({user}) => ({
    userData: user
});

const mapDispatchToProps = {userLoaded};

const BuyAccount = ({
    navigation,
    userLoaded,
    userData,
}) => {
    const [loading, setLoading] = useState(false)

    const onPress = async () => {
        setLoading(true)
        let response = await axios.get(`http://naft.uz/api/v1/user/info/${userData.profile.umeta.id}`)
        let { pmeta } = response.data.profile
        if(pmeta.is_paid){
            userLoaded(response.data)
        }
        setLoading(false)
    }

    return(
        <View style={styles.container}>
            <View style={styles.btnCont}>
                <Text style={styles.text}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, rem voluptate? Alias error ex omnis?
                </Text>
                {loading ? (
                    <View style={styles.indicatorCont}>
                        <ActivityIndicator
                            color={'#fff'}
                            animating={loading}
                        />
                    </View>
                ) : (
                    <TouchableWithoutFeedback onPress={onPress}>
                        <Text style={styles.btn}>
                            To'lovni tekshirish
                        </Text>
                    </TouchableWithoutFeedback>
                )}
            </View>
            <WebView
                source={{
                    uri: 'https://naft.uz/yandexpay/41',
                }}
                injectedJavaScript={INJECTEDJAVASCRIPT}
                scalesPageToFit={false}
                scrollEnabled
                originWhitelist={['*']}
                style={styles.webViewContainer}
            />
        </View>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BuyAccount)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    btnCont: {
        paddingVertical: 24,
        backgroundColor: '#eee'
    },
    text: {
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 18,
        marginVertical: 8,
        paddingHorizontal: 24,
        textAlign: 'justify'
    },
    indicatorCont: {
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 5,
        alignSelf: 'center',
        backgroundColor: '#6864EC'
    },
    btn: {
        padding: 12,
        fontSize: 14,
        color: '#fff',
        lineHeight: 16,
        borderRadius: 5,
        fontWeight: 'bold',
        alignSelf: 'center',
        backgroundColor: '#6864EC',
    },
    webViewContainer: {
        // width,
        // height,
    }
})
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
// const html = '<iframe src="https://promo-money.ru/quickpay/button-widget?targets=ACTIVATION&default-sum=300&button-text=11&yamoney-payment-type=on&button-size=l&button-color=orange&successURL=&quickpay=small&account=41001951153675&" width="227" height="48" frameborder="0" allowtransparency="true" scrolling="no"></iframe>';
const html = '<iframe src="https://promo-money.ru/quickpay/shop-widget?writer=seller&targets=%D0%90%D0%BA%D1%82%D0%B8%D0%B2%D0%B0%D1%86%D0%B8%D1%8F%20%D0%B0%D0%BA%D0%BA%D0%B0%D1%83%D0%BD%D1%82%D0%B0&targets-hint=&default-sum=200&button-text=11&payment-type-choice=on&phone=on&hint=&successURL=https%3A%2F%2Fnaft.uz%2FyandexPayGate&quickpay=shop&account=410011993428689" width="423" height="222" frameborder="0" allowtransparency="true" scrolling="no"></iframe>'

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
                source={{ html }}
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
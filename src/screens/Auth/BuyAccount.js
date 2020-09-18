import React from 'react';
import {StyleSheet, View, Text, Platform, Button} from 'react-native';
import YandexPayment, {
    Shop,
    Payment,
    PaymentToken
} from 'react-native-yandex-payment';
import {WebView} from 'react-native-webview';

const shop = {
    id: '12212',
    token: 'test_SHOP_TOKEN',
    name: 'Shop name',
    description: 'Shop description'
};
const payment = {
    amount: 399.99,
    currency: 'RUB', // 'RUB' | 'USD' | 'EUR'
    types: ['YANDEX_MONEY'] // 'YANDEX_MONEY' | 'BANK_CARD' | 'SBERBANK' | 'PAY'. PAY - means Google Pay or Apple Pay
};

const html =
    '<iframe src="https://promo-money.ru/quickpay/button-widget?targets=ACTIVATION&default-sum=300&button-text=11&yamoney-payment-type=on&button-size=l&button-color=orange&successURL=&quickpay=small&account=41001951153675&" width="227" height="48" frameborder="0" allowtransparency="true" scrolling="no"></iframe>';

const BuyAccount = navigation => {
    return (
        <View style={styles.container}>
            <Text> salom </Text>

            <WebView
                source={{html: html}}
                style={{width: 100, height: 200, backgroundColor: 'red'}}
            />

            <Button
                title="show"
                style={{
                    marginTop: 100,
                    backgroundColor: '#ffcc00',
                    borderRadius: 8
                }}
                text="show "
                onPress={async () => {
                    const result = await YandexPayment.show(
                        {
                            id: 122112,
                            token: 'config.token',
                            name: 'React shop',
                            description: `Buy on ${Platform.OS} ${
                                Platform.Version
                            }`
                        },
                        {
                            amount: 1.01,
                            currency: this.state.currency,
                            types: Object.values(
                                this.state.paymentTypes
                            ).filter(it => it !== null)
                        }
                    );
                    alert(JSON.stringify(result));
                    console.warn(JSON.stringify(result));
                }}
            />
        </View>
    );
};

export default BuyAccount;

const styles = StyleSheet.create({
    container: {}
});

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native'
import checkImg from '../../assets/images/instagram-check.jpg'

const item = {
    fullName: 'Madina Abdullayeva',
    img: 'https://hafidiy-restapi.herokuapp.com/avatars/female/avatar40.jpeg',
    address: 'Tashkent',
    balance: 100,
    orderNumber: 17,
    company: 'Akfa-Medline'
}

const Info = (props) => {

    useEffect(() => {
        console.log('id: ', props.userData.id)
    }, [])

    return(
        <View style={styles.container}>
            {item.company ? (
                <Image
                    source={checkImg}
                    style={styles.absImg}
                />
            ) : null}
            <Image
                source={{ uri: item.img }}
                style={styles.img}
            />
            <View style={styles.infoBox}>
                {item.company ? (
                    <View style={styles.infoRow}>
                        <Text style={styles.text1}>орназизация:</Text>
                        <Text style={styles.text2}>{item.company}</Text>
                    </View>
                ) : null}
                <View style={styles.infoRow}>
                    <Text style={styles.text1}>имя:</Text>
                    <Text style={styles.text2}>{item.fullName}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.text1}>город:</Text>
                    <Text style={styles.text2}>{item.address}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.text1}>баланс:</Text>
                    <Text style={styles.text2}>{`${item.balance} $`}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.text1}>очередь:</Text>
                    <Text style={styles.text2}>{item.orderNumber}</Text>
                </View>
            </View>
        </View>
    )
}

const mapStateToProps = ({user}) => ({
    userData: user
});

const mapDispatchToProps = {
    
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Info);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    absImg: {
        width: 25,
        height: 25,
        position: 'absolute',
        top: 16,
        right: 16,
    },
    img: {
        width: 150,
        height: 150,
        marginTop: 24,
        borderRadius: 75,
        resizeMode: 'cover',
        alignSelf: 'center',
    },
    infoBox: {
        marginTop: 40,
        paddingHorizontal: 24,
    },
    infoRow: {
        padding: 8,
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text1: {
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 18,
    },
    text2: {
        fontSize: 14,
        lineHeight: 16,
        marginLeft: 24,
        fontWeight: '500',
    },
})
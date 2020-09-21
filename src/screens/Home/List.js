import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    Image,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableWithoutFeedback,
} from 'react-native';

const ScreenTmp = ({navigation}) => {
    const [cards, setCards] = useState([]);
    const [page, setPage] = useState(1);

    const [stateFetch, setStateFetch] = useState({
        loading: false,
        refreshing: false,
        error: false
    });

    const effect = async () => {
        // const url = `https://hafidiy-restapi.herokuapp.com/api/people?page=${page}&limit=10`;
        const url = `http://naft.uz/api/v1/users?show_users=10&page_number=${page}`
        setStateFetch({...stateFetch, loading: true});
        try {
            const response = await axios.get(url);

            setCards([...cards, ...response.data]);
            setStateFetch({
                ...stateFetch,
                loading: false,
                error: null,
                refreshing: false
            });
        } catch (err) {
            console.log('apiError: ', err);
            setStateFetch({
                ...stateFetch,
                loading: false,
                error: err,
                refreshing: false
            });
        }
    };

    useEffect(() => {
        effect();
    }, []);

    const handleLoadMore = () => {
        setPage(page + 1);
        effect();
    };

    const handleRefresh = () => {
        setCards([]);
        setPage(1);
        setStateFetch({...stateFetch, refreshing: true});

        effect();
    };

    const renderSeparator = () => (
        <View
            style={{
                height: 1,
                width: '86%',
                backgroundColor: '#ced0ce',
                marginLeft: '14%'
            }}
        />
    );

    const onPress = () => navigation.navigate('Info', { name: 'Hafidiy', id: 10 })

    const renderItem = ({item}) => (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.card}>
                <Image
                    style={styles.img}
                    source={{uri: item.avatar || null}}
                />
                <View style={styles.info}>
                    <Text style={styles.date}>{item.created_at}</Text>
                    <Text style={styles.name}>
                        {`${item.first_name} ${item.last_name}`}
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    const renderFooter = () => {
        if (!stateFetch.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: '#ced0ce'
                }}>
                <ActivityIndicator animating size={'large'} />
            </View>
        );
    };

    return (
        <FlatList
            data={cards}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            ItemSeparatorComponent={renderSeparator}
            ListFooterComponent={renderFooter}
            refreshing={stateFetch.refreshing}
            onRefresh={handleRefresh}
            onEndReached={handleLoadMore}
            onEndThreshold={10}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    card: {
        paddingLeft: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        borderColor: '#ddd',
        borderBottomWidth: 1
    },
    img: {
        width: 80,
        height: 80,
        borderRadius: 50
    },
    info: {
        marginLeft: 20,
        justifyContent: 'space-evenly'
    },
    date: {
        fontWeight: 'normal',
        fontSize: 12,
        lineHeight: 14
    },
    name: {
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: 17
    },
    price: {
        color: 'gray'
    }
});

export default ScreenTmp;

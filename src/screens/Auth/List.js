import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {SearchBar} from 'react-native-elements';

const imgUrl =
    'https://hafidiy-restapi.herokuapp.com/avatars/male/avatar38.jpeg';

const ScreenTmp = () => {
    const [didMount, setDidMount] = useState(true);
    const [cards, setCards] = useState([]);
    const [page, setPage] = useState(1);
    const [seed, setSeed] = useState(1);

    const [stateFetch, setStateFetch] = useState({
        loading: false,
        refreshing: false,
        error: false
    });

    const effect = async () => {
        const url = `https://hafidiy-restapi.herokuapp.com/api/people?page=${page}&limit=10`;
        setStateFetch({...stateFetch, loading: true});
        try {
            const response = await axios.get(url);

            console.log('response: ', Object.keys(response));

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
        if (didMount) {
            setDidMount(false);
            effect();
            console.log('effect');
        }
    }, []);

    useEffect(() => {
        console.log('cards.length: ', cards.length);
    }, [cards]);

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

    const renderHeader = () => (
        <SearchBar placeholder="Type here..." lightTheme round />
    );

    const renderItem = ({item}) => (
        // <ListItem
        //     roundAvatar
        //     title={`${item.name.first} ${item.name.last}`}
        //     subtitle={item.email}
        //     avatar={{ uri: item.picture.thumbnail }}
        //     containerStyle={{ borderBottomWidth: 0 }}
        // />
        <View style={styles.card}>
            <Image
                style={styles.img}
                source={{uri: item.avatar}}
                // source={{ uri: item.picture.thumbnail }}
            />
            <View style={styles.info}>
                <Text style={styles.date}>{item.cell}</Text>
                <Text style={styles.price}>
                    {Math.round(Math.random() * 10000000)} so'm
                </Text>
                <Text style={styles.name}>
                    {`${item.name.first} ${item.name.last}`}
                </Text>
            </View>
        </View>
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
            // keyExtractor={item => item._id}
            ItemSeparatorComponent={renderSeparator}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            refreshing={stateFetch.refreshing}
            onRefresh={handleRefresh}
            onEndReached={handleLoadMore}
            onEndThreshold={10}
        />
        // <View style={styles.container}>
        //     <ScrollView
        //         showsVerticalScrollIndicator={false}
        //         refreshControl={<RefreshControl onRefresh={effect} refreshing={stateFetch.loading}/>}
        //     >
        //         {stateData.cards.length ? stateData.cards.map((card, index) => (
        //             <View key={index} style={styles.card}>
        //                 <Image source={{ uri: card.avatar }} style={styles.img} />
        //                 <View style={styles.info}>
        //                     <Text style={styles.date}>{card.cell}</Text>
        //                     <Text style={styles.name}>
        //                         {`${card.name.first} ${card.name.last}`}
        //                     </Text>
        //                 </View>
        //             </View>
        //         )) : null}
        //     </ScrollView>
        // </View>
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

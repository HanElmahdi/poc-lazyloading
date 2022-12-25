
import { ActivityIndicator, Alert, View, Text, Image, StyleSheet } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view';
import { useState, React, useEffect } from 'react'
import { showMessage } from "react-native-flash-message";

const AppRecord = () => {
    
    state = {
        gettingMoreList: false,
        offset: 0
    };

    const [listData, setListData] = useState([])
    const [isAPIbusy, setAPIBusy] = useState(false)
    const [offset, setOffset] = useState(0)

    const fetchProducts = async () => {
        setAPIBusy(true);
        console.log("https://dummyjson.com/users?skip="+offset+"&limit=20")
        const resp = await fetch("https://dummyjson.com/users?skip="+offset+"&limit=20");
        const data = await resp.json();
        setOffset(offset+20);
        setListData(listData.concat(data.users) || []);
        console.log('-------- fetchProducts ------------')
        setAPIBusy(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteItem = (id) => {

        return Alert.alert(
            "Are you sure!",
            "Are you sure you want to remove this record?",
            [
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: () => {
                        setListData(listData.filter(item => item.id != id));
                        showMessage({
                            message: "Success",
                            description: "Ths items is removed!",
                            type: "success",
                        });
                    },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "No",
                },
            ]
        );
    };

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20; //Distance from the bottom you want it to trigger.
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    const loadMoreList = () => {
        // Generate 10 fake items
        fetchProducts();
        
        setTimeout(() => {
            this.state.gettingMoreList = false
        }, 3000);
    };

    updateState = () => this.state.gettingMoreList = true;

    return (
        <View>
            <SwipeListView
                data={listData}
                renderItem={(data, rowMap) => (
                    <View style={styles.container}>
                        <Image source={{uri:data.item.image}} style={(data.index % 2 == 0) ? styles.avatar : styles.avatar2} />
                        <View style={styles.groupText}>
                            <Text style={styles.nameDisplay}>({data.item.id}) {data.item.firstName}</Text>
                            <Text style={styles.function}>{data.item.address.city}</Text>
                            <Text style={styles.email}>{data.item.email}</Text>
                        </View>
                    </View>
                )}
                renderHiddenItem={(data, rowMap) => (
                    <View style={styles.rowBack}>
                        <Text style={styles.greenBtn}>Show</Text>
                        <Text style={styles.redBtn} onPress={() => {
                            deleteItem(data.item.id)
                        }
                        }>Delete</Text>

                    </View>
                )}
                rightOpenValue={-66}
                /*onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) {
                        loadMoreList();
                    }
                }}
                scrollEventThrottle={400}*/
                onEndReached={({ nativeEvent }) => {
                    loadMoreList();
                }
                }
                onEndReachedThreshold={0}
                style = {(isAPIbusy) ? styles.swipelistbottom : styles.swipelist}
            />
            <ActivityIndicator
                animating = {isAPIbusy}
                color = '#bc2b78'
                size = "large"
                style = {styles.activityIndicator}/>
        </View>
    );
};

export default AppRecord;

const styles = StyleSheet.create({
    activityIndicator: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        top: -25,
    },
    swipelistbottom: {
        marginBottom:50
    },
    rowFront: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f6f8fa',
        borderColor:'#d0d7de',
        borderWidth:1,
        padding: 8,
    },
    rowBack: {
        flex: 1,
        paddingVertical: 0,
        flexDirection: 'row',
        alignItems: 'center',
        top: -5,
        justifyContent: 'space-between'
    },
    redBtn: {
        color: '#fff',
        fontWeight: '900',
        paddingVertical: 24,
        paddingHorizontal: 12,
        backgroundColor: 'red',
    },
    greenBtn: {
        color: '#fff',
        fontWeight: '900',
        paddingVertical: 24,
        paddingHorizontal: 12,
        backgroundColor: 'green',
    },

    // Items : img & text
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'red'
    },
    avatar2: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'blue'
    },
    groupText: {
        flex: 1,
        marginLeft: 12
    },
    nameDisplay: {
        fontWeight: '900',
        fontSize: 14,
        color: '#57606a',
        marginTop: 0
    },
    function: {
        fontWeight: '700',
        fontSize: 11,
        color: '#57606a',
        marginTop: 0
    },
    email: {
        fontSize: 12,
        color: '#57606a',
        marginTop: 0
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        marginBottom: 8,
        backgroundColor: '#ecf0f1',
        padding: 8,
    }
});
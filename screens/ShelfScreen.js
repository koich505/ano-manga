import React, {useContext,useState, useEffect} from 'react';
import { FlatList, SafeAreaView,ImageBackground, StyleSheet,Alert,StatusBar,Platform,View} from 'react-native';
import ListItem from '../components/ListItem';
import AMBanner from '../context/AMBanner';
import BG from '../assets/ShelfScreenBG.png'
import { ApiContext } from '../context/ApiContext'
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Input } from "native-base";

const styles = StyleSheet.create({
    BGImage: {
        width: "100%",
        height: "100%",

    },
    safeAreaView: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    searchBar: {
        margin: 5,
    }
})


const ShelfScreen = () => {
    const { newBookList, bookListDispatch,setBookList, getBookImage,database,bookList } = useContext(ApiContext)
    const [filteredBookList, setFilteredBookList] = useState(newBookList)
    const [bookSearchWord, setBookSearchWord] = useState("")
    useEffect(() => {
        setBookList(newBookList)
        setFilteredBookList(newBookList.filter(item => {return item.done == 0}))
    }, [newBookList])

    const dispatch = (type, id) => {
        bookListDispatch({ type: type, id: id,database: database })
    }
    const changeImage = (word, num, id) => {
        getBookImage(word, num).then(res => {
            bookListDispatch({ type: 'changeImage', id: id, img: res.img, database:database })
        })
        
    }
    const done = (type, id) => {
        Alert.alert(
            "読み終わった！",
            "この漫画をリストから削除します",
            [
                { text: "OK", onPress:() => bookListDispatch({type: type,id: id ,database: database}) },
                {
                    text: "Cancel",
                    style: "cancel"
                }
            ],
            { cancelable: true }
        );
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ExpoStatusBar style="auto" />
            <ImageBackground source={BG} resizeMode="cover" style={styles.BGImage} imageStyle={{opacity: 0.4}}>
                <AMBanner />
                <View style={styles.searchBar}>
                    <Input
                        onChangeText={searchword => setBookSearchWord(searchword)}
                        placeholder="検索"
                        variant="rounded"
                        isFullWidth={true}
                    />
                </View>
                <FlatList
                    data={filteredBookList.filter(book => book.title.includes(bookSearchWord))}
                    renderItem={({ item }) => (
                        <ListItem
                            item={item}
                            dispatch={(type, id) => dispatch(type, id)}
                            changeImage={(word, num, id) => changeImage(word, num, id)}
                            done={(type, id) => done(type, id)}
                        />
                )}
                    keyExtractor={(item, index) => item.id.toString()}
                >

                </FlatList>
                
            </ImageBackground>
        </ SafeAreaView>

    );
}

export default ShelfScreen




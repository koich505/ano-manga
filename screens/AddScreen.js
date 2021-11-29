import React, {useContext} from "react";
import {View, StyleSheet,SafeAreaView,ImageBackground,Platform,StatusBar } from "react-native"
import SearchForm from "../components/addbook/SearchForm";
import SearchResult from "../components/addbook/SearchResult";
import { ApiContext } from "../context/ApiContext";
import AMBanner from '../context/AMBanner';
import BG from '../assets/ShelfScreenBG.png'
import { StatusBar as ExpoStatusBar } from "expo-status-bar";


const styles = StyleSheet.create({
    container: {
        fontFamily: "Inter_900Black",
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    searchForm: {
        alignItems: "center",
        justifyContent: "center",
        height: '20%',
        paddingTop: 40,
        
    },
    searchResult: {
        height: "70%"
    },
    BGImage: {
        width: "100%",
        height: "100%",

    },
    safeAreaView: {
        flex:1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    
})



const AddScreen = () => {
    const screen = (screen) => {
        switch (screen) {
            case ("none"):
                return <View></View>
            case ("result"):
                return <SearchResult />
        }
    }
    const { bookResultScreen } = useContext(ApiContext)
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ExpoStatusBar style="auto" />
            <ImageBackground source={BG} resizeMode="cover" style={styles.BGImage} imageStyle={{opacity: 0.4}}>
                <AMBanner　/>
                <View style={styles.searchForm}>
                    <SearchForm />
                </View>
                <View style={styles.searchResult}>
                    {screen(bookResultScreen)}
                    </View>
                    
            </ImageBackground>
        </SafeAreaView>
    );
}

export default AddScreen
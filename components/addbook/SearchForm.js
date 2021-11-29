import React, { useContext } from "react";
import { View,StyleSheet, Button, Text} from 'react-native';
import { ApiContext } from "../../context/ApiContext";
import { Input,IconButton,Icon} from "native-base";
import { AntDesign } from "@expo/vector-icons"
import {WToast} from 'react-native-smart-tip'

const Style = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: 'center'
    },

    searchBox: {
        borderColor: 'black',
        width: "60%"
    }
})


const SearchForm = () => {

    const { getBookData, setSearchword, searchWord, setBookResultScreen, initDatabase } = useContext(ApiContext)

    const showToast = () => {
        const toastOpts = {
            data: 'タイトルを入力してね！',
            textColor: '#FFFFFF',
            backgroundColor: '#BCBABE',
            duration: WToast.duration.LONG,
            position: WToast.position.CENTER,
        }
        WToast.show(toastOpts)
    }
    

    const pressSearch = () => {
        if (searchWord == "") {
            showToast()
            setBookResultScreen('none')
        } else {
            getBookData()
        }
    }

    return (
        <View style={Style.container}>
            <View style={Style.searchBox}>
                <Input
                onChangeText={searchword => setSearchword(searchword)}
                    placeholder="タイトルを入力"
                />
            </View>
            <IconButton icon={<Icon size = "md" as ={<AntDesign name ="search1" />}/>}  onPress={pressSearch} />

        </View>
    )
}

export default SearchForm
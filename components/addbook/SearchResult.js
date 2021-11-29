import React, {useContext} from 'react'
import { ApiContext} from '../../context/ApiContext'
import { View, Image, StyleSheet,ImageBackground,TouchableOpacity,Text } from 'react-native'
import searchResultBG from '../../assets/searchResultBG.png'
import {WToast} from 'react-native-smart-tip'

const styles = StyleSheet.create({
    BGImage: {
        width: "100%",
        height: "93%"
    },
    title: {
        fontSize: 20,
        padding: 10
    },

    resultContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10%'
    },
    image: {
        height: "80%",
        width: "100%"
    },
    button: {
        backgroundColor: '#64B5F6',
        borderRadius: 5,
        marginTop: '10%',
        height: "15%",
        width: "45%",
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        
    },
    buttonText: {
        color: "white",
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 20
    }
})


const SearchResult = () => {
    const { bookResult, addBook } = useContext(ApiContext)
    const showToast = () => {
        const toastOpts = {
            data: '本棚に追加しました',
            textColor: '#FFFFFF',
            backgroundColor: '#BCBABE',
            duration: WToast.duration.LONG,
            position: WToast.position.CENTER,
        }
        WToast.show(toastOpts)
    }

    const bookToShelf = () => {
        addBook()
        showToast()
    }
    return (
        <View>
            <ImageBackground source={searchResultBG} resizeMode="cover" style={styles.BGImage} imageStyle={{opacity: 0.1}}>
                <View style = {styles.resultContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: bookResult.img }}
                        resizeMode='contain' />
                    <TouchableOpacity style={styles.button} onPress={bookToShelf}>
                        <Text style={styles.buttonText}>本棚に追加</Text><Text/>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>

    )
}

export default SearchResult
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Center, IconButton, Icon } from 'native-base'
import { useFonts } from 'expo-font'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    itemContainer: {
        width: "100%",
        borderColor: "gray",
        borderWidth: 1,
        borderStyle: "dashed",
        borderRadius: 10,
        flexDirection: 'row',
        margin: 3,
    },
    leftContainer: {
        height: '100%',
        width: "30%"
    },
    rightContainer: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",

    },
    titleContainer: {
        flex: 4,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize:20,
        fontFamily:'comicFont'
    },
    readContainer: {
        flex: 3,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    readCountContainer: {
        flexDirection: 'column',
    },
    readCountMain: {
        fontSize: 20,
        fontFamily:'comicFont'
    },
    readCountSub: {
        fontSize: 10,
        color: "gray",
        fontFamily:'comicFont'

    },
    readCountButton: {
        justifyContent: 'center',
    },
    buttons: {
        textAlign: 'center',
    },
    funcs: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'

    }


});

const ListItem = (props) => {
    const [loaded] = useFonts({ comicFont: require('../assets/fonts/DotGothic16-Regular.ttf') })
     if (!loaded) {
        return null;
     }
    const containerHeight = () => {
        if (Platform.isPad) {
            return 380
        } else {
            return 150
        }
    }

    return (
        <View style={[styles.itemContainer, {height: containerHeight()}]}>
            <View style={styles.leftContainer}>
                <Image
                    style={{ width: "95%", height: '95%', borderRadius: 5, margin: 3}}
                    source={{ uri: props.item.img }}
                />
            </View>
            <View style={styles.rightContainer}>
                <View style={styles.titleContainer} >
                    <Text style={styles.title} numberOfLines={3}>
                    {props.item.title}
                    </Text>
                </View>
                
                <View style={styles.readContainer}>
                    <View style={styles.readCountButton} >
                        <Center flex={1}>
                            <IconButton icon={<Icon size="sm" as={<AntDesign name="arrowdown" />} />} onPress={() => props.dispatch("dec_read",props.item.id)}/>
                        </Center>
                    </View>
                    <Text style={styles.readCountContainer}>
                        <Text style={styles.readCountMain}>
                            {props.item.read} 巻
                        </Text>
                        <Text style={styles.readCountSub}>
                            まで読んだ
                        </Text>
                    </Text>
                    <View style={styles.readCountButton} >
                        <Center flex={1}>
                            <IconButton icon={<Icon size = "sm" as ={<AntDesign name ="arrowup" />}/>}  onPress={() => props.dispatch("add_read",props.item.id)} />
                        </Center>
                    </View>
                </View>
                <View style = {styles.funcs}>
                    <View>
                        <TouchableOpacity onPress={() => props.changeImage(props.item.title,props.item.read,props.item.id)}>
                            <Image source={require('../assets/icons/refreshBook.png')} resizeMode='contain' style={{ height: '100%',width: 30}}/>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => props.done("done",props.item.id)}>
                            <Image source={require('../assets/icons/doneBook.png')} resizeMode='contain' style={{ height: '100%',width: 30}}/>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </View>
        </View>
    )
}

export default ListItem;
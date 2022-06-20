import React from "react"
import { StyleSheet,View,Text,Image} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFonts } from 'expo-font'


const styles = StyleSheet.create({
    screen: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        fontSize: 50,
        height: '85%',
        width: '100%'
    },
    navcontainer: {
        flex: 1,
        backgroundColor: 'gray'
    },
    title: {
        fontFamily: 'comicFont',
        textAlign: 'center',
        fontSize: 20,
        width: '80%'
    },
    description: {
        width: '80%',
        textAlign: 'center',
    },
    screenOdd: {
        backgroundColor: '#F1F1F2',
    },
    screenEven: {
        backgroundColor:'#BCBABE',
    },
    image: {
        height: '60%',
        width: '59%',
        borderRadius:15
    },
})

const slider = [
    {
        key: 1,
        title: 'ダウンロードありがとうございます！',
        description: 'このアプリの使い方を説明します！',
        style: [styles.screenOdd,styles.screen],
        image: require('../assets/introModalGIFs/thanks.png'),
    },
    {
        key: 2,
        title: '①「漫画を追加」を選択',
        description: '検索画面に移動します',
        style: [styles.screenEven, styles.screen],
        image: require('../assets/introModalGIFs/navigation.gif'),
    },
    {
        key: 3,
        title: '②タイトルを入れて検索',
        description: '\n正しい画像が表示されない場合は漫画の正式名称を入れてみてね！',
        style: [styles.screenOdd, styles.screen],
        image: require('../assets/introModalGIFs/searchBook.gif'),
    },
    {
        key: 4,
        title: '③「本棚に追加」ボタンを押す',
        description: '本棚に本が追加されます',
        style: [styles.screenEven, styles.screen],
        image: require('../assets/introModalGIFs/addBook.gif'),
    },
    {
        key: 5,
        title: '④矢印を操作して読んだ巻数を記録！',
        description: '',
        style: [styles.screenOdd, styles.screen],
        image: require('../assets/introModalGIFs/addRead.gif'),
    },
    {
        key: 6,
        title: '⑤左下のアイコンをクリックすると表紙が更新されます',
        description: '\n正しい表紙が表示されない場合があります……',
        style: [styles.screenEven, styles.screen],
        image: require('../assets/introModalGIFs/changeImage.gif'),
    },
    {
        key: 7,
        title: '⑥読み終わった漫画は右下のアイコンでリストから削除できます',
        description: '早速使ってみよう！',
        style: [styles.screenOdd, styles.screen],
        image: require('../assets/introModalGIFs/done.gif'),
    },
];


const renderNextButton = () => {
    return (
        <View style={styles.buttonCircle}>
          <Icon
            name="arrow-forward-circle-outline"
            color="black"
            size={40}
          />
        </View>
    )
}

const renderDoneButton = () => {
    return (
        <View style={styles.buttonCircle}>
        <Icon
          name="md-checkmark"
          color="black"
            size={40}
        />
      </View>
    )
}

const renderComponent = ({ item }) => {
    return (
            
            <View style={item.style}>
                <Text style={styles.title}>
                    {item.title}
                </Text>
                <Image style={styles.image} source={item.image} resizeMode='contain'/>
                <Text style={styles.description}>
                    {item.description}
                </Text>
            </View>
    )
}

const IntroModal = (props) => {
    const [loaded] = useFonts({ comicFont: require('../assets/fonts/DotGothic16-Regular.ttf') })
    if (!loaded) {
        return null;
    }
    return(
        <AppIntroSlider
            renderItem={renderComponent}
            data={slider}
            renderNextButton={renderNextButton}
            renderDoneButton={renderDoneButton}
            keyExtractor={item => item.key.toString()}
            onDone={ props.done }
        />
        )
}


export default IntroModal
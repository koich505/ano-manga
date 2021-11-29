import React from 'react'
import { AdMobBanner } from 'expo-ads-admob';
import { View } from 'react-native'
import { admodAndroidBunner, admodIOSBunner } from '@env';

const AMBanner = () => {
    return (
        <View>
            <AdMobBanner
              adUnitID={
                __DEV__ ? "ca-app-pub-3940256099942544/6300978111" // テスト広告
                            : Platform.select({
                                ios: admodIOSBunner , // iOS
                                android:admodAndroidBunner , // Androidandroid 
                })
              }
              onDidFailToReceiveAdWithError={console.log("Ad Fail error")} 
            />
        </View>
    )
}

export default AMBanner;
import React from 'react';
import { AdMobInterstitial } from 'expo-ads-admob'
import {admodAndroidInterstitial, admodIOSInterstitial} from '@env';


export const Interstitial = async() => {
    if(__DEV__){
      AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712')// テスト広告
    } else {
      if(Platform.OS === 'ios'){
        AdMobInterstitial.setAdUnitID(admodIOSInterstitial)//iOS
      }else{
        AdMobInterstitial.setAdUnitID(admodAndroidInterstitial); //android
      } 
    }
    await AdMobInterstitial.requestAdAsync().then(() => {
    AdMobInterstitial.showAdAsync()
    }).catch(() => {console.log('show interstitial err')})
    ;
}
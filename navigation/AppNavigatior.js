import React, { useContext} from "react";
import 'react-native-gesture-handler';
import {View} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShelfScreen from '../screens/ShelfScreen';
import AddScreen from '../screens/AddScreen';
import { NativeBaseProvider } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ApiContext } from '../context/ApiContext'
import IntroModal from '../screens/IntroModal'
import { WRootToastApp } from 'react-native-smart-tip'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenOption = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    let iconName;

    if (route.name == "本棚") {
      iconName = "bookshelf"
    } else if(route.name == '漫画を追加'){
      iconName = 'book-search'
    }
    return (<MaterialCommunityIcons name={iconName} size={size} color={color} />)
  }
})

const tabBarOptions = {
  activeTintColor: '#3F51B5',
  style: {
    backgroundColor: '#F2F2F2',
    height: '10%',
  },
  labelStyle: {
    fontSize: 15
  }
}

const ShelfStack = () => {

  return (
      <Stack.Navigator>
        <Stack.Screen name="Shelf" component={ShelfScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
  )
}

const AddStack = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Add" component={AddScreen} options={{headerShown: false}} />
      </Stack.Navigator>
  )
}

const MyTabs = () => {
  
  return (
    <Tab.Navigator screenOptions={screenOption} tabBarOptions={tabBarOptions}>
      <Tab.Screen name="本棚" component={ShelfStack} />
      <Tab.Screen name = "漫画を追加" component={AddStack} />
    </Tab.Navigator>
  )
}


export default AppNavigator = () => {
  const { showIntroModel, finIntroModal} = useContext(ApiContext)
  switch (showIntroModel) {
    case (0):
      return (
        <NavigationContainer>
            <WRootToastApp>
            <NativeBaseProvider>
                <MyTabs />
              </NativeBaseProvider>
            </WRootToastApp>
        </NavigationContainer>
      )
    case (1):
      return (
        <IntroModal done={() => finIntroModal()}/>
      )
    default:
      return(<View></View>)
  }


}
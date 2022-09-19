import { useRef, useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter';
import { Background } from './src/components/Background';
import { Routes } from './src/routes';
import { Loading } from './src/components/Loading';
import './src/services/notificationsConfig'
import { Subscription } from 'expo-modules-core'
import {getPushNotificationToken} from './src/services/getPushNotificationToken'
import * as Notifications from 'expo-notifications'

export default function App() {
  const getNotificationListener = useRef<Subscription>()
  const responseNotificationListener = useRef<Subscription>()

  useEffect(() => {
    getPushNotificationToken()
  }, [])

  useEffect(() => {
    getNotificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification)
    })
    responseNotificationListener.current = Notifications.addNotificationReceivedListener(reponse => {
      console.log(reponse)
    })
    return () => {
      if(getNotificationListener.current  && responseNotificationListener.current) {
        Notifications.removeNotificationSubscription(getNotificationListener.current)
        Notifications.removeNotificationSubscription(responseNotificationListener.current)
      }
    }
  }, [])
  const [fontsLoaded] = useFonts({
    Inter_400Regular, 
    Inter_600SemiBold, 
    Inter_700Bold, 
    Inter_900Black
  })
  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes/> : <Loading/>}
    </Background>
  );
}

const styles = StyleSheet.create({

});

import { useEffect, useRef } from 'react';
import { StatusBar } from 'react-native';
import { Background } from './src/components/Background';

import { Routes } from './src/Routes';

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter'
import { Loading } from './src/components/Loading';
import * as Notifications from 'expo-notifications';
import './src/services/notfications';
import { getPushNotficationToken } from './src/services/getPushNotficationToken';
import { Subscription } from 'expo-modules-core';


export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  })

  const getNotificationsListnen = useRef<Subscription>();
  const responseNotificationsListnen = useRef<Subscription>();

  useEffect(() => {
    getPushNotficationToken();
  }, [])

  useEffect(() => {
    getNotificationsListnen.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification)
    })

    responseNotificationsListnen.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response)
    })

    return () => {
      if(getNotificationsListnen.current && responseNotificationsListnen.current){
        Notifications.removeNotificationSubscription(getNotificationsListnen.current);
        Notifications.removeNotificationSubscription(responseNotificationsListnen.current);
      }
    }
  },[])

  return (
    <Background>

      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {fontsLoaded ? <Routes /> : <Loading />}

    </Background>
  );
}


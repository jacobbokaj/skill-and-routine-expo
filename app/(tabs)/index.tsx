import { Image, StyleSheet, Platform, Text, View, Button } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import TimerControl from '@/components/TimerControl';
import SkillChosen from '@/components/SkillChosen';
import { getItem, setItem } from '@/app/utils/AsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useFocusEffect, useNavigation } from 'expo-router';

export default function HomeScreen() {
  const currentDate = new Date();

  const navigation = useNavigation();

  const [data, setData] = useState(null);

  const [timerCountt, setTimerCount] = useState(true);

  useEffect(() => {
    const ww = navigation.addListener('focus', () => {

      const fetchData = async () => {

        const result = await getItem('username');

        const data = await result;
        setData(data);  // Set state with the fetched data
      };

      fetchData();
    })
    return ww;
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      setTimerCount(true);
      //alert('Screen was focused' + timerCountt);
      // Do something when the screen is focused
      return () => {
        setTimerCount(false);
      //  alert('Screen was unfocused: ' + timerCountt);
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );


  useEffect(() => {

    const fData = async () => {
      const result = await setItem('username', 20);
      const data = await result;

    }
    console.log("hihih");
    fData();
  }, [])





  return (
    <View className="bg-slate-600">
      <View className="mt-20">
        <Text className="text-3xl text-blue-500 text-center px-5"> Motivation app</Text>
        <Text className=" text-3xl text-blue-500 text-center">DATA: {data}</Text>
      </View>
      <View className="justify-center items-center space-y-4 mt-10 bg-slate-600">

        <SkillChosen />

      </View>
      <View className=" justify-center items-center space-y-4 mt-40">
        <TimerControl timerCount={timerCountt}/>
      </View>
    </View>
  );
}

/*<ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
        <View className="flex-1 justify-center items-center">

        <Text className="text-5xl text-blue-500">Helloww</Text>
        </View>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>*/
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

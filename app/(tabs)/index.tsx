import { Image, StyleSheet, Platform, Text, View, Button } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import TimerControl from '@/components/TimerControl';
import SkillChosen from '@/components/SkillChosen';
import  SkillData  from '../interfaces-ts/SkillData';
import { getItem, setItem } from '@/app/utils/AsyncStorage';
import { getSkillData } from '../utils/AsyncStorageSkillData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useFocusEffect, useNavigation } from 'expo-router';


export default function HomeScreen() {
  const [data, setData] = useState(null);
  const [skillData, setSkillData] = useState<SkillData[]>([]);
  const [skillNames, setSkillNames] = useState<string[]>([]);
  const [timerCountt, setTimerCountt] = useState(true);
  var today = new Date();
 
 
 /* useFocusEffect(
    React.useCallback(() => {
      setTimerCount(true);


    const fetch =   async () => {
    
        const result = await getItem('username');
    
        const data = await result;
        setData(data);  // Set state with the fetched data
        console.log("from index data: " + data);
      };
      fetch();

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
  */

  useEffect(() => {

    const exampleSkillData: SkillData = {
      data: {
          name: "Yoga",
          totalTime: 120,
          streak: 10,
          TimeInfo: [
              { dato: "2025-04-01", time: 30 },
              { dato: "2025-04-02", time: 20 },
              { dato: "2025-04-03", time: 25 },
              { dato: "2025-04-04", time: 15 },
              { dato: "2025-04-05", time: 30 },
          ]
      }
  };

    const fData = async () => {
      const result = await setItem('Yoga', exampleSkillData);
      const data = await result;

    }

    fData();

    const fetch =   async () => {
    
      const result = await getSkillData('Yoga');
  
      if (result !== null) {
        const sD = skillData;
        sD.push(result);
        setSkillData(sD);  // Add new data to the existing array
      
        setSkillNames(skillData?.map(skill => skill.data.name) ?? []);
        console.log(skillNames[skillNames.length -1]);
      }
    };
    fetch();

  }, []);
  console.log("hello from index");




  return (
    <View>
      
      <Image
        source={require('@/assets/bg/background.png')}
        className="absolute w-full h-full z-0 self-center"

        resizeMode="cover"
      />
      <View className="mt-20">
        <Text className="text-3xl text-white text-center px-5"> Skill Learning</Text>
      </View>
      <View className="justify-center items-center space-y-4 mt-10 bg-slate-200">

        <SkillChosen skills={skillNames}/>

      </View>
      <View className=" justify-center items-center space-y-4 mt-40">
        <Text className=" text-3xl text-white text-center">Date: { + today.getDate() }/{ today.getMonth() + 1}/{today.getFullYear()}</Text>
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

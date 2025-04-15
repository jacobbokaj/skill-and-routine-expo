import { Image, StyleSheet, Platform, Text, View, Button } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import TimerControl from '@/components/TimerControl';
import SkillChosen from '@/components/SkillChosen';
import  SkillData  from '../interfaces-ts/SkillData';
import SkillsAddedData from '../interfaces-ts/SkillsAddedData';
import { getItem, setItem } from '@/app/utils/AsyncStorage';
import { getAsyncSkillsAddedData, setAsyncSkillsAddedData } from '../utils/AsyncStorageSkillsAddedData';
import { getAsyncSkillData, setAsyncSkillData } from '../utils/AsyncStorageSkillData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useFocusEffect, useNavigation } from 'expo-router';
import { isLoading } from 'expo-font';


export default function HomeScreen() {

  const [skillsData, setSkillsData] = useState<SkillData[]>([]);
  const [skillsAddedData, setSkillsAddedData] = useState<SkillsAddedData>({
    data: {
      skillNames: []
    }
  });
  const [currentSkillSeconds,setCurrentSkillSeconds] = useState(0);
  const [isTimerOn, setIsTimerOn] = useState(true);
  const [chosenSkill, setChosenSkill] = useState<SkillData>();
  const [isLoading, setIsLoading] = useState(true);
  // Not the best way but it works. I switch the boolean value true/false to make a call in TimerControl component.
  const [dropdownMenuIsInteracted,setdropdownMenuIsInteracted] = useState(false);
  var today = new Date();
 
 
  const exampleSkillData: SkillData = {
    data: {
        name: "Yoga",
        totalTime: 120,
        streak: 10,
        TimeInfo: [
            { dato: "01-03-2025", time: 30 },
            { dato: "02-03-2025", time: 20 },
            { dato: "03-03-2025", time: 25 },
            { dato: "04-03-2025", time: 15 },
            { dato: "05-03-2025", time: 30 },
        ]
    }
  };


  // Fail something with react render and async. So because async run in a diffirent thread so render wont wait on the async to finish.


  useFocusEffect(

    //Going to this webpage.
    React.useCallback(() => {
      setIsTimerOn(true);
      ImplementData();

      //Leaving this webpage.
      return () => {
        setIsTimerOn(false);
      };
    }, [])
  );
  
  const ImplementData = () =>{
    
    const fetchSki =   async () => {
      

      // PLACE HOLDER CODE----------------------------------------------
      skillsAddedData?.data.skillNames.push(exampleSkillData.data.name);


      await setAsyncSkillsAddedData('SkillsAddedData',skillsAddedData);
  
    };
    fetchSki();
    
    const fetchSkillsAddedData =   async () => {
  
      const result = await getAsyncSkillsAddedData('SkillsAddedData');
  
      if(result != undefined){

        setSkillsAddedData(result);
      }
      setIsLoading(false)
    };
  
  
    fetchSkillsAddedData();
  
    const fetchAll = async () => {
      const promises = skillsAddedData.data.skillNames.map(name => getAsyncSkillData(name));
      const results = await Promise.all(promises);
  
      const validResults = results.filter(
        (result): result is SkillData =>
          result !== null && !skillsData.some(skill => skill.data.name === result.data.name)
      );
      setSkillsData(validResults);  
    };
  
    fetchAll();
    setIsLoading(false);   
  }


  const handleSkillChosen = (skillName: string) => {

    var foundSkillData = null;

    for (let i = 0; i < skillsData.length; i++) {

      if (skillsData[i].data.name == skillName) {
        setChosenSkill(skillsData[i]);
        foundSkillData = skillsData[i];
        break;
      } 
           
    }

    const seconds = foundSkillData?.data.totalTime ?? 0;
    setCurrentSkillSeconds(seconds);
    setdropdownMenuIsInteracted(!dropdownMenuIsInteracted);
  }


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

      {isLoading ? (
  <Text className="text-white text-center mt-10">Loading...</Text>
) : (
  <View className="justify-center items-center space-y-4 mt-10 bg-slate-200">
    <SkillChosen skillNames={skillsAddedData.data.skillNames} chosenSkill={handleSkillChosen}/>
  </View>
)}
      <View className=" justify-center items-center space-y-4 mt-40">
        <Text className=" text-3xl text-white text-center">Date: { + today.getDate() }/{ today.getMonth() + 1}/{today.getFullYear()}</Text>
        <TimerControl isTimerOn={isTimerOn} currentSkillSeconds={currentSkillSeconds} dropdownMenuIsInteracted={dropdownMenuIsInteracted}/>
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

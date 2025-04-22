import { StyleSheet, Image, Platform, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { getItem, setItem } from '@/app/utils/AsyncStorage';
import { useFocusEffect } from 'expo-router';
import React from 'react';
import SkillChosen from '@/components/SkillChosen';
import SkillData from '../interfaces-ts/SkillData';
import SkillNamesData from '../interfaces-ts/SkillNamesData';
import { getAsyncSkillData } from '../utils/AsyncStorageSkillData';
import { getAsyncSkillNamesData, setAsyncSkillNamesData } from '../utils/AsyncStorageSkillNamesData';

export default function Profile() {
  const [skillsData, setSkillsData] = useState<SkillData[]>([]);
  const [skillNamesData, setSkillNamesData] = useState<SkillNamesData>({
    data: {
      skillNames: []
    }
  });
  const [chosenSkill, setChosenSkill] = useState<SkillData>();
  const [isLoading, setIsLoading] = useState(true);
  
  
  const exampleSkillData: SkillData = {
    data: {
      name: "Yoga",
      totalTime: 120,
      streak: 10,
      TimeInfo: [
        { date: "01-03-2025", time: 30 },
        { date: "02-03-2025", time: 20 },
        { date: "03-03-2025", time: 25 },
        { date: "04-03-2025", time: 15 },
        { date: "05-03-2025", time: 30 },
        { date: "15-04-2025", time: 45 },
        { date: "16-04-2025", time: 42 },
      ]
    }
  };

 const [data, setData] = useState(null);
  useEffect(() => {
    
      // Asynchronous function inside useEffect
      const fetchData = async () => {
        const result = await getItem('username');
  
        const data = await result;
  
        console.log("from profile data: " + data);
        setData(data);  // Set state with the fetched data
      };
      
      fetchData();  // Call the async function
    }, []);


    useFocusEffect(
    
        //Going to this webpage.
        React.useCallback(() => {
          setIsLoading(true);

          const pushSkillNamesData = async () => {
              skillNamesData.data.skillNames.push(exampleSkillData.data.name);
              await setAsyncSkillNamesData('skillNamesData',skillNamesData);


          }

          pushSkillNamesData();

          const fetchSkillNamesData = async () => {
            const result = await getAsyncSkillNamesData('skillNamesData');

            if (result != undefined) {
              setSkillNamesData(result);
            }
            setIsLoading(false);
          };
          
          fetchSkillNamesData();
          //Leaving this webpage.
          return () => {
            
          };
        }, [])
      );
    


    const handleSkillChosen = (skillName: string) => {
      
    }
  return (
    <View>
      
      <Image
              source={require('@/assets/bg/background.png')}
              className="absolute w-full h-full z-0 self-center"
      
              resizeMode="cover"
      />
      <View className="mt-20">
        <Text className="text-3xl text-white text-center px-5"> Profile</Text>
      </View>

      {isLoading ? (
        <Text className="text-white text-center mt-10">Loading...</Text>
      ) : (
        <View className="justify-center items-center space-y-4 mt-10 bg-slate-200">
          <SkillChosen skillNames={skillNamesData.data.skillNames} chosenSkill={handleSkillChosen} />
        </View>
      )}

      <Text className=" text-3xl text-blue-500 text-center">DATA: {data}</Text>

    </View>
   
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});

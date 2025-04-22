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
import { getAsyncSkillNamesData } from '../utils/AsyncStorageSkillNamesData';

export default function Profile() {
  const [skillsData, setSkillsData] = useState<SkillData[]>([]);
    const [skillNamesData, setSkillNamesData] = useState<SkillNamesData>({
      data: {
        skillNames: []
      }
    });
  const [chosenSkill, setChosenSkill] = useState<SkillData>();
  const [isLoading, setIsLoading] = useState(true);




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

          const fetchSkillNamesData = async () => {
            const result = await getAsyncSkillNamesData('skillNamesData');

            if (result != undefined) {
              setSkillNamesData(result);
            }
            setIsLoading(false);
          };
          

          //Leaving this webpage.
          return () => {
            
          };
        }, [])
      );
    

    const skillNames = [
      'Training',
      'Instrument',
      'Draw',
      'Yoga',
      'Meditation',
      'Language',
      'Garden',
      'Make Games',
    ];

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

      <View className="justify-center items-center space-y-4 mt-10 bg-slate-200">
        <SkillChosen skillNames={skillNames} chosenSkill={handleSkillChosen}/>
      </View>
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

import { StyleSheet, Image, Platform, Text, View, TextInput, TouchableOpacity } from 'react-native';
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
import { getAsyncSkillData, setAsyncSkillData } from '../utils/AsyncStorageSkillData';
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
  const [todayTime, setTodayTime] = useState(0);
  const [newSkill,setNewSkill] = useState<string>('');
  var today = new Date();

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


  useFocusEffect(

    //Going to this webpage.
    React.useCallback(() => {
      setIsLoading(true);

      const pushSkillNamesData = async () => {
        skillNamesData.data.skillNames.push(exampleSkillData.data.name);
        await setAsyncSkillNamesData('skillNamesData', skillNamesData);


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


      const pushSkillsData = async () => {
        await setAsyncSkillData('skillData', exampleSkillData);
      };

      pushSkillsData();

      const fetchSkillsData = async () => {
        const promises = skillNamesData.data.skillNames.map(name => getAsyncSkillData(name));
        const results = await Promise.all(promises);

        const validResults = results.filter(
          (result): result is SkillData =>
            result !== null && !skillsData.some(skill => skill.data.name === result.data.name)
        );
        setSkillsData(validResults);
      };

      fetchSkillsData();



      //Leaving this webpage.
      return () => {

      };
    }, [])
  );


  const formatDate = (day: string, month: string, year: string) => {
    var dayConvert = day.length === 2 ? day : `0${day}`;
    var monthConvert = month.length == 2 ? month : `0${month}`;
    return `${dayConvert}-${monthConvert}-${year}`;
  };


  const findTodayTime = (chosenSkill: SkillData) => {
    var time = 0;
    const todayDate = formatDate(today.getDate().toString(),(today.getMonth() + 1).toString(),today.getFullYear().toString());
    for (let i = 0; i < chosenSkill.data.TimeInfo.length; i++) {

        if (todayDate === chosenSkill.data.TimeInfo[i].date) {
          time =chosenSkill.data.TimeInfo[i].time;
        }
    }
    return time;
  }

  const handleSkillChosen = (skillName: string) => {

    for (let i = 0; i < skillsData.length; i++) {

      if (skillName === skillsData[i].data.name) {
        setChosenSkill(skillsData[i]);
        break;
      }
    }

    if (chosenSkill !== undefined) {     
     setTodayTime(findTodayTime(chosenSkill));
    }
  }


  const handleAddSkill = (skill: string) => {

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

      {chosenSkill ? (
        <View>
          <Text className="text-white text-center mt-10">{formatDate(today.getDate().toString(),(today.getMonth() + 1).toString(),today.getFullYear().toString())} time: {todayTime} </Text>
          <Text className="text-white text-center mt-10">Total time : {chosenSkill?.data.totalTime} </Text>
        </View>
      ) : (
        <Text></Text>
      )}

      <TextInput 
        style={textStyles.input}
      placeholder='Textw'/>


      <TouchableOpacity
              onPress={() => handleAddSkill(newSkill)}
            >
                <Text className="text-3xl text-white">Reset day</Text>
            </TouchableOpacity>

    </View>
    
  );
}

const textStyles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});




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

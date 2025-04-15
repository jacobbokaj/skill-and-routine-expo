import  SkillData  from '../interfaces-ts/SkillData'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const getAsyncSkillData = async (key: string): Promise<SkillData | null> => {
  try {
    const value = await AsyncStorage.getItem(key);


    const skillData: SkillData | null = value != null ? JSON.parse(value) as SkillData : null;
    return skillData;
  } catch (error) {
    console.error('Error getting item:', error);
    return null;
  }
};

export const setAsyncSkillData = async (key : string, value: string) => {
  try {

    await AsyncStorage.setItem(key, JSON.stringify(value));
   // console.log("item set: " + key + "  value: "+ value);
 //   console.log("host");
  } catch (error) {
    console.error('Error setting item:', error);
  }
};
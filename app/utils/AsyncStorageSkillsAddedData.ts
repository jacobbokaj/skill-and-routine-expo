import SkillsAddedData from "../interfaces-ts/SkillsAddedData";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const getAsyncSkillsAddedData = async (key: string): Promise<SkillsAddedData | null> => {
  try {
    const value = await AsyncStorage.getItem(key);


    const skillsAddedData: SkillsAddedData | null = value != null ? JSON.parse(value) as SkillsAddedData : null;
    return skillsAddedData;
  } catch (error) {
    console.log('Does not have a skillsAddedData json file in database.');
    return null;
  }
};

export const setAsyncSkillsAddedData = async (key : string, value: SkillsAddedData) => {
  try {

    await AsyncStorage.setItem(key, JSON.stringify(value));
   // console.log("item set: " + key + "  value: "+ value);
 //   console.log("host");
  } catch (error) {
    console.error('Error setting item:', error);
  }
};
import SkillNamesData from "../interfaces-ts/SkillNamesData";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const getAsyncSkillNamesData = async (key: string): Promise<SkillNamesData | null> => {
  try {
    const value = await AsyncStorage.getItem(key);


    const SkillNamesData: SkillNamesData | null = value != null ? JSON.parse(value) as SkillNamesData : null;
    return SkillNamesData;
  } catch (error) {
    console.log('Does not have a SkillNamesData json file in database.');
    return null;
  }
};

export const setAsyncSkillNamesData = async (key : string, value: SkillNamesData) => {
  try {

    await AsyncStorage.setItem(key, JSON.stringify(value));
   // console.log("item set: " + key + "  value: "+ value);
 //   console.log("host");
  } catch (error) {
    console.error('Error setting item:', error);
  }
};
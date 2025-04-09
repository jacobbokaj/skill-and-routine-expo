import  SkillData  from '../interfaces-ts/SkillData'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const getSkillData = async (key: string): Promise<SkillData | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
  //  console.log(value);

    const skillData: SkillData | null = value != null ? JSON.parse(value) as SkillData : null;
    return skillData;
  } catch (error) {
    console.error('Error getting item:', error);
    return null;
  }
};
import { Image, StyleSheet, Platform,Text, View,Button, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getItem, setItem } from '@/app/utils/AsyncStorage';

interface Props{
  isTimerOn: boolean;
  currentSkillSeconds: number;
  dropdown: boolean;
}


export default function TimerControl({isTimerOn, currentSkillSeconds, dropdown} : Props) {
  
  const styles = `bg-blue-500 text-white`;
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);


  function doRun(isRun: boolean){
    setIsRunning(isRun);
    async () => {
          const result = await setItem('timer', seconds);
         // const data = await result;
    
    }
  }



  useEffect(()=> {
    if(isTimerOn == false){
      setIsRunning(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    setSeconds(currentSkillSeconds);
  },[isTimerOn,dropdown]);

  


  useEffect(() => {
    if (isRunning && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
  
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  const handleReset = () => {
    setSeconds(0);
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const resetDayAlert = () =>
    Alert.alert('Reset Day', 'Will you reset time on this day?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => handleReset()},
    ]);



  return (
    <View>



      <View style={{
    borderWidth: 4,
    borderColor: 'green',
    borderRadius: 15,
    padding: 30,
    overflow: 'hidden',
   
    
  }}>

        
        <Text className="text-3xl text-white">{formatTime(seconds)}</Text>
      <TouchableOpacity      
        onPress={() => setIsRunning(prev => !prev)}
      >   
        <Text className="text-3xl text-white">{isRunning ? 'Pause' : 'Play'}</Text>     
      </TouchableOpacity>

      <TouchableOpacity
        onPress={()=> resetDayAlert()}
      >
          <Text className="text-3xl text-white">Reset day</Text>
      </TouchableOpacity>



      </View>




    </View>
  );
}

/*
        <TouchableOpacity className="w-[30]%"
        onPress={handleReset}>
          <Text className="text-3xl text-blue-500">Stop</Text>
        </TouchableOpacity>




*/

import { Image, StyleSheet, Platform,Text, View,Button, TouchableOpacity } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';




export default function TimerControl() {
  const styles = `bg-blue-500 text-white`;
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  return (
    <View className="flex-1 justify-center items-center space-y-4 bg-slate-200">
      <Text className="text-5xl text-blue-500">Helloww</Text>
      <Text className="text-3xl text-blue-500">Timer: {formatTime(seconds)}</Text>

      <TouchableOpacity
        
        onPress={() => setIsRunning(prev => !prev)}
      >
      
      <Text className="text-5xl text-blue-500">{isRunning ? 'Pause' : 'Continue'}</Text>
      </TouchableOpacity>



        <TouchableOpacity className="w-[30]%"
        onPress={handleReset}>
          <Text className="text-5xl text-blue-500">Stop</Text>
        </TouchableOpacity>




    </View>
  );
}
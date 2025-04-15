import React, { useEffect, useState } from 'react';
  import { StyleSheet } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';

interface Props {
  skillNames: string[];
  chosenSkill: (skill: string) => void;
}


  const data = [
    { label: 'Training', value: '1' },
    { label: 'Instrument', value: '2' },
    { label: 'Draw', value: '3' },
    { label: 'Yoga', value: '4' },
    { label: 'Meditation', value: '5' },
    { label: 'Language', value: '6' },
    { label: 'Garden', value: '7' },
    { label: 'Make Games', value: '8' },
  ];

  const SkillChosen = ({ skillNames, chosenSkill }: Props) => {


   
    const [skillNamesWithValues, setSkillNamesWithValues] = useState<{ label: string; value: number }[]>([]);

    const [value, setValue] = useState(null);

    useEffect(()=> {

      setSkillNamesWithValues(skillNames?.map((skill, index)  => ({
        label:  skill, // or something smarter if needed
        value:  index + 1
      })));
    },[skillNames])




    return (
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={skillNamesWithValues ?? []}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select skill"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
          chosenSkill(item.label);
        }}
        
      />
    );
  };

  export default SkillChosen;

  const styles = StyleSheet.create({
    dropdown: {
      margin: 16,
      height: 50,
      borderBottomColor: 'gray',
      borderBottomWidth: 2,
      width: 300
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 20,
    },
    selectedTextStyle: {
      fontSize: 20,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 10,
    },
  });
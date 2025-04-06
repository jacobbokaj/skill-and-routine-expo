import React, { useState } from 'react';
  import { StyleSheet } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';

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

  const SkillChosen = () => {
    const [value, setValue] = useState(null);

    return (
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select skill"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
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
      borderBottomWidth: 0.5,
      width: 300
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
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
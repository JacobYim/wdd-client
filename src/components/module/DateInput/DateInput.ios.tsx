import React from 'react';
import moment from 'moment';
import { DatePickerIOS, View } from 'react-native';

import { Props } from './index';
import TextInput, { HandleChangeText } from 'src/components/module/TextInput';
import { views } from './DateInput.styles';

const DateInput: React.SFC<Props> = ({ label, name, value, handleChange }) => {
  const dummyChange = (data: HandleChangeText) => {
    // Mute TextInput change event
  };

  const handleChangeWithName = (value: Date) => {
    handleChange({ name, value });
  };

  return (
    <>
      <TextInput
        label={label}
        name={name}
        value={moment(value).format('YYYY년 MM월 DD일')}
        handleChange={dummyChange}
      />
      <DatePickerIOS
        style={views.datePicker}
        date={value}
        onDateChange={handleChangeWithName}
        mode="date"
      />
    </>
  );
};

export default DateInput;

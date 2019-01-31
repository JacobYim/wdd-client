import React from 'react';
import DatePicker from 'react-native-datepicker';

import { Props } from './index';
import { views, texts } from './DateInput.styles';
import ModuleContainer from 'src/components/module/ModuleContainer';

const DateInput: React.FC<Props> = ({ label, name, value, handleChange }) => {
  const handleChangeWithName = (str: string, value: Date) => {
    handleChange({ name, value });
  };

  return (
    <ModuleContainer label={label}>
      <DatePicker
        style={views.datePicker}
        customStyles={{
          dateInput: views.dateInput,
          btnTextConfirm: texts.btnTextConfirm,
        }}
        date={value}
        mode="date"
        locale="ko-KO"
        format="YYYY년 MM월 DD일"
        confirmBtnText="확인"
        cancelBtnText="취소"
        showIcon={false}
        onDateChange={handleChangeWithName}
      />
    </ModuleContainer>
  );
};

export default DateInput;

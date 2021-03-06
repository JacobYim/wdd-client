import React from 'react';
import DatePicker from 'react-native-datepicker';
import LabelWrapper from 'src/components/container/LabelWrapper';
import { texts, views } from './DateInput.styles';
import { Props } from './index';

const DateInput: React.FC<Props> = ({ label, name, value, handleChange }) => {
  const handleChangeWithName = (str: string, value: Date) => {
    handleChange({ name, value });
  };

  return (
    <LabelWrapper label={label}>
      <DatePicker
        style={views.datePicker}
        customStyles={{
          dateInput: views.dateInput,
          btnTextConfirm: texts.btnTextConfirm,
          placeholderText: [texts.dateText, texts.placeholder],
          dateText: [texts.dateText, texts.value],
        }}
        date={value}
        mode="date"
        androidMode="spinner"
        locale="ko-KO"
        placeholder={`${label}을 입력해주세요`}
        format="YYYY년 MM월 DD일"
        confirmBtnText="확인"
        cancelBtnText="취소"
        showIcon={false}
        onDateChange={handleChangeWithName}
      />
    </LabelWrapper>
  );
};

export default DateInput;

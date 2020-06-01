import React from 'react';
import '../componentscss/Select.css';
interface P {
  label: string;
  id: string;
  optionData: Array<OptionData>;
  selectedIndex: number;
  onSelect: (index: number) => void; // ((event: React.FormEvent<HTMLOptionElement>) => void) | undefined;
}

interface OptionData {
  value: string;
  name: string;
}
export default function Select(props: P) {
  const optionData = props.optionData.map((option, index) => (
    <option key={index} value={option.value}>
      {option.name}
    </option>
  ));
  return (
    <div className="container">
      <label htmlFor={props.id}>{props.label}</label>
      <select
        name={props.label}
        id={props.id}
        value={props.optionData[props.selectedIndex].value}
        onChange={(event) => {
          event.preventDefault();
          let index = props.optionData
            .map((option) => option.value)
            .indexOf(event.target.value);
          props.onSelect(index);
        }}
      >
        {optionData}
      </select>
    </div>
  );
}

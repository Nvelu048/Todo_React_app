import React from 'react';
import '../componentscss/Textarea.css';
interface P {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required: boolean;
}
export default function Textarea(props: P) {
  return (
    <div className="container">
      <label htmlFor={props.id}>{props.label}</label>
      <textarea
        id={props.id}
        onChange={props.onChange}
        required={props.required}
        value={props.value}
      />
    </div>
  );
}

Textarea.defaultProps = {
  required: false,
};

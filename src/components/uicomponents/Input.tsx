import React, { Fragment } from 'react';
import '../componentscss/Input.css';
import { InputInterface } from '../util/InputInterface';
interface P extends InputInterface {
  value?: string;
  required?: boolean;
  disabled?: boolean;
}
export default function Input(props: P) {
  return (
    <div className="container">
      {props.label ? (
        <label htmlFor={props.id}>{props.label}</label>
      ) : (
        <Fragment />
      )}
      <input
        disabled={props.disabled}
        type={props.type}
        id={props.value}
        value={props.value}
        onChange={props.onChange}
        onClick={props.onClick}
        onSubmit={props.onSubmit}
        required={props.required}
      />
    </div>
  );
}

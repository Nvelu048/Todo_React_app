import React from 'react';
import '../componentscss/Button.css';
interface P {
  onClick: any;
}
export default function Button(props: P) {
  return (
    <button
      style={{
        display: 'flex',
        position: 'fixed',
        width: 50,
        height: 50,
        borderRadius: 25,
        background: 'red',
        bottom: 16,
        right: 16,
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        border: 0,
        outline: 'none',
      }}
      onClick={props.onClick}
    >
      <label style={{ fontSize: 30, color: 'white', textAlign: 'center' }}>
        +
      </label>
    </button>
  );
}

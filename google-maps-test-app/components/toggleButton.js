import React from 'react';
import Image from 'next/image';

const ToggleButton = ({onToggle }) => {
  return (
    <button className="toggle-button" onClick={onToggle}>
      <Image alt='Cat filter toggle button' src={'images/toggle.svg'} height={30} width={30}/>
    </button>
  );
};

export default ToggleButton;
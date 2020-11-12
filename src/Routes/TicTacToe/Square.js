import React from 'react';

const Square = ({ addFocus, classname, onClick, onKeyDown, value }) => {
  return (
    <button
      type="button"
      autoFocus={addFocus}
      className={classname}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {value}
    </button>
  );
};

export default Square;

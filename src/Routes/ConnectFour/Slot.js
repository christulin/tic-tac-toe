import React from 'react';

const Slot = ({entry, addPiece, hasPiece}) => {

  return (
    <div className={entry ? 'slot entry' : 'slot'} onClick={entry ? () => {addPiece(entry - 1)} : function() { console.log('cant click here')}}>
      <div className={`piece ${hasPiece}`}></div>
    </div>
  )
}

export default Slot;
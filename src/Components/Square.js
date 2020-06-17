import React from 'react';

const Square = (props) => {

    return (
    <button type="button" autofocus={props.addFocus} className={props.class} onClick={props.onClick} onKeyDown={props.onKeyDown}>{props.value}</button>
    )
}

export default Square;
import React  from 'react';

function Button ({onClick})  {
    return (<button onClick={() => onClick()} >More More More</button>);
};

export default Button;


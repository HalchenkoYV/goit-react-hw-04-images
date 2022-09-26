import {React, useLayoutEffect, useRef}  from 'react';






function Anchor() {
    const h2ref = useRef(null);
      useLayoutEffect(() => {
    h2ref.current.scrollIntoView();
      }, []);
    
    
    return (<div ref={h2ref}></div>);
};

export default Anchor ;


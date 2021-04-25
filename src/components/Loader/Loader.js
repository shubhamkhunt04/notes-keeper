import React from 'react';

const Loader = () => {
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'90vh'}}>
      <div class='lds-ellipsis'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;

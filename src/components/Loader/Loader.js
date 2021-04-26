import React from 'react';

const Loader = () => {
  return (
    <div className="loader-container">
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

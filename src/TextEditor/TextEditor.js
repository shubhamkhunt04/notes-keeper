import React from 'react';
import ReactQuill from 'react-quill'; // ES6

const TextEditor = ({ value, onChange }) => {
  return (
    <ReactQuill
      style={{ color: 'white' }}
      value={value}
      onChange={onChange}
      placeholder='Note description'
    ></ReactQuill>
  );
};

export default TextEditor;

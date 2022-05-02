import React from 'react';

const AddButton = ({ onClick, children }) => {
  return (
    <button
      className='inline-block text-white font-bold bg-blue-500 rounded-full fixed right-5 bottom-20 text-center py-4 px-6'
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default AddButton;

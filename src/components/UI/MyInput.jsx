import React from 'react';

const MyInput = React.forwardRef((props, ref ) => {
  const { labeltext, name } = props;

  return (
  <div>
    <label
      htmlFor={name}
      className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
    >{labeltext}</label>
    <input
      ref={ref}
      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5'
      
    />
  </div>
  );
});

export default MyInput;

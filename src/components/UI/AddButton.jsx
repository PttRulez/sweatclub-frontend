import React from 'react'
import { Link } from 'react-router-dom';

const AddButton = ({to, children}) => {
  return (
    <Link
        to={to}
        className='inline-block text-white font-bold bg-blue-500 rounded-full absolute right-20 text-center p-4'
      >
        { children }
      </Link>
  )
}

export default AddButton
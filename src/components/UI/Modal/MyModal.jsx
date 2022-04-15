import React from 'react'
import cl from './mymodal.module.css';

function MyModal({children, visible, setVisible, ...props}) {
  const rootClasses = [cl.myModal]
  if(visible) {
    rootClasses.push(cl.active);
  }
  
  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className={cl.myModalContent + ' ' + props.className} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default MyModal
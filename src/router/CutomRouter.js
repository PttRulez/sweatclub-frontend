import { BrowserRouter } from "react-router-dom";
import { useState, useLayoutEffect } from 'react';

const CustomRouter = ({ history, children, ...props }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <BrowserRouter
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </BrowserRouter>
  );
};

export default CustomRouter;
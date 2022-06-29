import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './store/store';
import { Provider } from 'react-redux';
import AppRouter from './router/AppRouter';

import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory({ window });

ReactDOM.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <AppRouter />
    </HistoryRouter>
  </Provider>,
  document.getElementById('root')
);

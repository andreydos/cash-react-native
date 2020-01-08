import LoggedOut from './views/LoggedOut'
import * as React from "react";
import { Provider } from 'react-redux';
import store from './redux/configureStore';

const App = () => {
  return (
    <Provider store={store}>
      <LoggedOut />
    </Provider>
  );
};

export default App;

import * as React from "react";
import { Provider } from 'react-redux';
import store from './redux/configureStore';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import StartScreen from './views/StartScreen';
import Login from './views/Login';
import Notification from './components/Notification';
import Registration from './views/Registration';


let RootStack = createStackNavigator({
    Start: {
      screen: StartScreen
    },
    Login: {
      screen: Login
    },
    Registration: {
      screen: Registration
    }
  },
  {
    initialRouteName: "Registration",
    headerMode: 'none'
  });

let Navigation = createAppContainer(RootStack);

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
      <Notification />
    </Provider>
  );
};

export default App;

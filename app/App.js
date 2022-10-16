import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from './pages/Home';
import ChoresChild from './pages/ChoresChild';
import ChoresParent from './pages/ChoresParent';
import RewardsChild from './pages/RewardsChild';
import RewardsParent from './pages/RewardsParent';



const AppNavigator = createStackNavigator ({
  Home: Home,
  ChoresChild: {screen : ChoresChild},
  ChoresParent: {screen : ChoresParent},
  RewardsChild: {screen : RewardsChild},
  RewardsParent: {screen : RewardsParent}
});

const App = createAppContainer(AppNavigator);



export default App;

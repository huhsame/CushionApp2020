import React from 'react';

import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import CushionDetailScreen from './src/screens/CushionDetailScreen';
import CushionListScreen from './src/screens/CushionListScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as PointProvider } from './src/context/PointContext';

import { setNavigator } from './src/navigationRef';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen, // 맨위에 있는게 디폴트 화면
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  mainFlow: createBottomTabNavigator({
    cushionListFlow: createStackNavigator({
      CushionList: CushionListScreen,
      CushionDetail: CushionDetailScreen
    }),
    Account: AccountScreen
  })
});

const App = createAppContainer(switchNavigator);
export default () => {
  return (
    <AuthProvider>
      <PointProvider>
        <App
          ref={navigator => {
            setNavigator(navigator);
          }}
        />
      </PointProvider>
    </AuthProvider>
  );
};

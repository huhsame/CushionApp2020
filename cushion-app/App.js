import React from 'react';

import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import CushionDetailScreen from './src/screens/CushionDetailScreen';
import ClientListScreen from './src/screens/ClientListScreen';
import CreateClientScreen from './src/screens/CreateClientScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import ClientScreen from './src/screens/ClientScreen';
import CushionRealtimeScreen from './src/screens/CushionRealtimeScreen';
import CushionHourScreen from './src/screens/CushionHourScreen';
import MattRealtimeScreen from './src/screens/MattRealtimeScreen';
import MattHourScreen from './src/screens/MattHourScreen';
import ClientLogScreen from './src/screens/ClientLogScreen';
import EditClientScreen from './src/screens/EditClientScreen';

import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as PressureProvider } from './src/context/PressureContext';
import { Provider as ClientProvider } from './src/context/ClientContext';
import { Provider as LogProvider } from './src/context/LogContext';

import { setNavigator } from './src/navigationRef';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createTabNavigator } from 'react-navigation-tabs';

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen, // 맨위에 있는게 디폴트 화면
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),

  mainFlow: createStackNavigator({
    ClientList: ClientListScreen,
    // CreateClient: CreateClientScreen,
    SmartCM: createStackNavigator({
      Client: ClientScreen,
      Cushion: createBottomTabNavigator({
        cushionRealtime: CushionRealtimeScreen,
        cushionHour: CushionHourScreen
      }),
      Matt: createBottomTabNavigator({
        mattRealtime: MattRealtimeScreen,
        mattHour: MattHourScreen
      }),
      Log: ClientLogScreen,
      editClient: EditClientScreen
    }),
    Account: AccountScreen
  })

  // mainFlow: createBottomTabNavigator({
  //   cushionListFlow: createStackNavigator(
  //     {
  //       ClientList: ClientListScreen,
  //       CreateClient: CreateClientScreen,
  //       CushionDetail: CushionDetailScreen
  //     },
  //     {
  //       initialRouteName: 'ClientList'
  //     }
  //   ),
  //   Account: AccountScreen
  // })
});

const App = createAppContainer(switchNavigator);
export default () => {
  return (
    <AuthProvider>
      <ClientProvider>
        <LogProvider>
          <PressureProvider>
            <App
              ref={navigator => {
                setNavigator(navigator);
              }}
            />
          </PressureProvider>
        </LogProvider>
      </ClientProvider>
    </AuthProvider>
  );
};

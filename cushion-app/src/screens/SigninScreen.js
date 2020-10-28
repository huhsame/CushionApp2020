import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

import { Context as AuthContext } from '../context/AuthContext';

const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthForm
        headerText={'Sign In'}
        errorMessage={state.errorMessage}
        ButtonTitle={'Sign In'}
        onSubmit={signin}
      ></AuthForm>
      <NavLink
        routeName="Signup"
        text="don't have an account? Sign up"
      ></NavLink>
    </View>
  );
};
SigninScreen.navigationOptions = () => {
  return {
    header: () => false
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 70
  }
});

export default SigninScreen;

import React, { useContext } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';

const SignupScreen = () => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthForm
        headerText={'Sign Up'}
        errorMessage={state.errorMessage}
        ButtonTitle={'Sign Up'}
        onSubmit={signup}
      ></AuthForm>
      <NavLink
        routeName="Signin"
        text="Already have an account? Sign in"
      ></NavLink>
    </SafeAreaView>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    header: () => false
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

    marginBottom: 80
  }
});

export default SignupScreen;

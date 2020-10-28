import React, { useContext } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import { NavigationEvents } from 'react-navigation';

import { Context as ClientContext } from '../context/ClientContext';
import ClientForm from '../components/ClientForm';

const CreateClientScreen = () => {
  const { state, createClient, clearErrorMessage } = useContext(ClientContext);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <ClientForm
        headerText={'Create'}
        errorMessage={state.errorMessage}
        ButtonTitle={'Add'}
        onSubmit={createClient}
      ></ClientForm>
    </SafeAreaView>
  );
};

// CreateCushionUserScreen.navigationOptions = () => {
//   return {
//     header: () => false
//   };
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'

    // marginBottom: 80
  }
});

export default CreateClientScreen;

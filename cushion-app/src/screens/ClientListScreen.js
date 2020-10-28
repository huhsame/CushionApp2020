// not yet implemented

import React, { useState, useContext } from 'react';

import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import { SearchBar, Text } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';

import { Feather } from '@expo/vector-icons';

import { Context as AuthContext } from '../context/AuthContext';
import { Context as ClientContext } from '../context/ClientContext';

import Spacer from '../components/Spacer';
import Client from '../components/Client';

const ClientListScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const AuthState = useContext(AuthContext).state;
  const ClientState = useContext(ClientContext).state;
  const { getClientList } = useContext(ClientContext);

  // useEffect(() => {
  //   getClientList();

  //   return () => console.log(client.state.list);
  // }, []);

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => {
    console.log(item);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Client', {
            cushionId: item.cushion,
            username: AuthState.name
          })
        }
      >
        <Client
          cushion={item.cushion}
          id={item.id}
          name={item.name}
          avatarUrl={item.avatarUrl}
          age={item.age}
          sex={item.sex}
          latestLog='last log'
        />
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <NavigationEvents onWillFocus={getClientList} />
      <Text>환영합니다. {AuthState.name} 간호사님 </Text>

      {/* <Spacer>
        <SearchBar
          placeholder='Search'
          onChangeText={setSearch}
          value={search}
          lightTheme
          round
          clearIcon
          showLoading // 흠.. 이거 엔터치면 되는걸로?
          autoCapitalize='none'
          autocorrect={false}
          inputStyle={{ color: 'black' }}
        />
      </Spacer> */}

      <FlatList
        keyExtractor={keyExtractor}
        data={ClientState.list} // 여기에 넣어야겠네
        renderItem={renderItem}
      />
    </View>
  );
};

ClientListScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('CreateClient')}>
        <Feather name='plus' size={30} />
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({});

export default ClientListScreen;

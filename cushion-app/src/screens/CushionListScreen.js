// not yet implemented

import React, { useState } from 'react';

import {
  View,
  StyleSheet,
  Text,
  Button,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { ListItem, Avatar, SearchBar } from 'react-native-elements';

import Spacer from '../components/Spacer';
import CushionUser from '../components/CushionUser';

const CushionListScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');

  // 임시 쿠션유저 데이터 리스트
  const list = [
    {
      cushionId: 1,
      cushionUserId: 1,
      name: '한수연',
      avatarUrl: 'https://placeimg.com/128/128/any',
      age: '62',
      sex: 'Female',
      latestLog: 'is fine'
    },
    {
      cushionId: 2,
      cushionUserId: 2,
      name: '한희영',
      avatarUrl: 'https://placeimg.com/128/128/any',
      age: '53',
      sex: 'Female',
      latestLog: 'fell down'
    },
    {
      cushionId: 3,
      cushionUserId: 3,
      name: '권강준',
      avatarUrl: 'https://placeimg.com/128/128/any',
      age: '79',
      sex: 'Male',
      latestLog: 'Passed away'
    }
  ];

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CushionDetail', { cushionId: item.cushionId })
        }
      >
        <CushionUser
          cushionId={item.cushionId}
          cushionUserId={item.cushionUserId}
          name={item.name}
          avatarUrl={item.avatarUrl}
          age={item.age}
          sex={item.sex}
          latestLog={item.latestLog}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Spacer>
        <SearchBar
          placeholder="Search"
          onChangeText={setSearch}
          value={search}
          lightTheme
          round
          clearIcon
          showLoading // 흠.. 이거 엔터치면 되는걸로?
          autoCapitalize="none"
          autocorrect={false}
          inputStyle={{ color: 'black' }}
        />
      </Spacer>

      <FlatList
        keyExtractor={keyExtractor}
        data={list}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CushionListScreen;

import React, { useState } from 'react';
import {
  StyleSheet,
  Switch,
  View,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from './Spacer';

const ClientForm = ({ headerText, errorMessage, ButtonTitle, onSubmit }) => {
  const [name, setName] = useState(''); // name
  const [cushion, setCushion] = useState(null); // cushion
  const [matt, setMatt] = useState(null); // matt

  // const [id, setId] = useState(null); //id
  const [age, setAge] = useState(null);
  const [sex, setSex] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState(
    'https://placeimg.com/128/128/any'
  );

  const toggleSwitch = () => setSex(previousState => !previousState);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.headerText}>
          {headerText === 'Create' ? '새 사용자 등록' : '사용자 정보 변경'}
        </Text>

        <Spacer>
          <Input
            label='이름'
            value={name}
            onChangeText={setName}
            autoCapitalize='none'
            autoCorrect={false}
          />

          <Input
            label='Cushion Number'
            keyboardType='numeric'
            value={cushion === null ? null : cushion.toString()}
            onChangeText={value =>
              value === '' ? setCushion(null) : setCushion(parseInt(value))
            }
            autoCapitalize='none'
            autoCorrect={false}
          />
          <Input
            label='Matt Number'
            keyboardType='numeric'
            value={matt === null ? null : matt.toString()}
            onChangeText={value =>
              value === '' ? setMatt(null) : setMatt(parseInt(value))
            }
            autoCapitalize='none'
            autoCorrect={false}
          />
          {/* <Input
            label='Cushion User Number'
            keyboardType='numeric'
            value={id === null ? null : id.toString()}
            onChangeText={value =>
              value === '' ? setId(null) : setId(parseInt(value))
            }
            autoCapitalize='none'
            autoCorrect={false}
          /> */}
          <Input
            label='나이'
            keyboardType='numeric'
            value={age === null ? null : age.toString()}
            onChangeText={value =>
              value === '' ? setAge(null) : setAge(parseInt(value))
            }
            autoCapitalize='none'
            autoCorrect={false}
          />

          <View style={styles.sexContainer}>
            <Text style={styles.switchLabel}>성별</Text>
            <Text style={styles.switchValue}>{sex ? '여자' : '남자'}</Text>
            <Switch
              // trackColor={{ false: '#767577', true: '#81b0ff' }}
              // thumbColor={sex ? '#f5dd4b' : '#f4f3f4'}
              // ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={sex}
            />
          </View>
          <Input
            label='프로필 사진'
            value={avatarUrl}
            onChangeText={setAvatarUrl}
            autoCapitalize='none'
            autoCorrect={false}
          />
        </Spacer>
        <Spacer>
          <Button
            title={ButtonTitle}
            onPress={() =>
              onSubmit({
                cushion,
                matt,
                name,
                avatarUrl,
                age,
                sex
              })
            }
          />
        </Spacer>
        <View style={styles.scrollViewOffset}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15
  },
  headerText: {
    fontSize: 23,
    color: 'black',
    alignSelf: 'center',
    fontWeight: '600',
    marginVertical: 30
  },
  sexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 200,
    paddingBottom: 30
  },
  switchLabel: {
    fontSize: 16,
    color: 'grey',
    fontWeight: '600',
    marginRight: 50
    // alignItems: 'left'xs
    // horizontal: 'middle'
  },
  switchValue: {
    fontSize: 16,
    marginRight: 20
  },
  scrollViewOffset: {
    margin: 150
  }
});

export default ClientForm;

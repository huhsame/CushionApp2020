// not yet implemented

import React from 'react';

import { View, StyleSheet, Text, Button } from 'react-native';

const CushionListScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Cushion List</Text>
      <Button
        title="go to Detail"
        onPress={() => navigation.navigate('CushionDetail')}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CushionListScreen;

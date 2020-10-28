import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Spacer from './Spacer';
import { withNavigation } from 'react-navigation'; // 필요하다.

const NavLink = ({ navigation, routeName, text }) => {
  return (
    <>
      <Spacer>
        <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
          <Text style={styles.link}>{text} </Text>
        </TouchableOpacity>
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  link: {
    color: 'blue',
    margin: 18
  }
});

export default withNavigation(NavLink); // withNavigation

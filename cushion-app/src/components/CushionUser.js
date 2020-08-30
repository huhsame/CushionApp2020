import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem, Avatar, Text } from 'react-native-elements';

const CushionUser = ({
  cushionId,
  cushionUserId,
  name,
  avatarUrl,
  age,
  sex,
  latestLog
}) => {
  return (
    <ListItem bottomDivider>
      <Avatar source={{ uri: avatarUrl }} />
      <ListItem.Content>
        <ListItem.Title>{name}</ListItem.Title>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>{age} </Text>
          <Text style={styles.info}>{sex} </Text>
        </View>
        <Text>{latestLog}</Text>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    flexDirection: 'row'
    // alignItems: 'flex-start'
  },
  info: { color: 'grey' }
});

export default CushionUser;

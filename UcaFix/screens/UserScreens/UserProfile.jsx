import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export function UserProfile (props) {
  // Replace these with actual user data
  const userName = 'John Doe';
  const userEmail = 'johndoe@example.com';

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{userName}</Text>
      <Text style={styles.email}>{userEmail}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    marginTop: 5,
  },
});


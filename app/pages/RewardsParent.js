import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';

export default class RewardsParent extends React.Component {
  render() {
    return (
        <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
          Rewards Parent Page
        </Text>
        {/* make the following title and upward; maybe titles for list views */}
        <Text>Requested Rewards</Text>
        {/* make a button at the top or bottom */}
        <TouchableOpacity>
            <Text> Suggest Rewards</Text>
        </TouchableOpacity>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
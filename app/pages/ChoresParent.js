import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';

export default class ChoresParent extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
          Chores Parent Page
        </Text>
        {/* should be shown on each chore; can be changed to dots image */}
        <TouchableOpacity>
            <Text>Edit Chore Details</Text>
        </TouchableOpacity>
        {/* can be a smaller button on top or bottom */}
        <TouchableOpacity>
            <Text>Add Chore</Text>
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
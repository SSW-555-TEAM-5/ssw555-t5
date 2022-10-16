import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';

export default class ChoresChild extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
          Chores Child Page
        </Text>
        {/* the following two components should be availble for each chore, can also be dots image */}
        <TouchableOpacity>
          <Text>View Chore Details</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Chore Completed</Text>    
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
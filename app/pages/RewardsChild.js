import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';

export default class RewardsChild extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* make title and put at top of page, may also be changed in page title */}
        <Text style={styles.title}>
          Rewards Child Page
        </Text>
        {/* make button at bottom of page */}
        <TouchableOpacity>
            <Text>Add Reward</Text>
        </TouchableOpacity>
        {/* place inside reward card, should be an option for each reward; could also be changed out for dots */}
        <TouchableOpacity>
            <Text>Edit Reward</Text>
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
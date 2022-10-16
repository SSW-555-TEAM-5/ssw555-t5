import React from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView, ScrollView, Text } from "react-native";





export default class Home extends React.Component {
    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <TouchableOpacity
                     onPress = {() => this.props.navigation.navigate('ChoresChild')}>
                        <Text>Child Chore View</Text>
                     </TouchableOpacity>
                     <TouchableOpacity
                     onPress = {() => this.props.navigation.navigate('ChoresParent')}>
                        <Text>Parent Chore View</Text>
                     </TouchableOpacity>
                     <TouchableOpacity
                     onPress = {() => this.props.navigation.navigate('RewardsChild')}>
                        <Text>Child Rewards View</Text>
                     </TouchableOpacity>
                     <TouchableOpacity
                     onPress = {() => this.props.navigation.navigate('RewardsParent')}>
                        <Text>Parents Rewards View</Text>
                     </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

// This home page will change for both the parent and child View.
// There will likely be two home pageXOffset, akin to the way the rewards and chores pages are divided
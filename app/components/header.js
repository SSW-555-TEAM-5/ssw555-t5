import { FlatList,View, Text, StyleSheet, Image, SafeAreaView,TouchableOpacity, ScrollView} from "react-native";

//should intake user account so that user name can be displayed, the rest of the info should be constant
// should intake which screen is selected so that the selection can be constantly highlighted so that the page is indicated
export default function navBar(){
    return (
        <SafeAreaView>
            <View style = {{flex:1/6, flexDirection: row}}>
                <TouchableOpacity>
                    {/* should be replaced with an icon */}
                    <Text> switch account </Text>
                </TouchableOpacity>
                <Text> ChoreNScore </Text>
            </View>
            <View style = {{flex:4/6, flexDirection:row}}>
                <View style = {{flex:5/6, flexDirection:column}}>
                    <Text style = {{fontSize:45}}> Welcome</Text>
                    <Text style = {{fontSize:45}}> UserName</Text>
                </View>
                <Image/>
            </View>
            <ScrollView style = {{flex:1/6, flexDirection:row}}>
                <TouchableOpacity>
                    <Text>Chores</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Reward Store</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Inbox</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Manage Account</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
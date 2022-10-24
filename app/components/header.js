import { FlatList,View, Text, StyleSheet, Image, SafeAreaView,TouchableOpacity, ScrollView} from "react-native";

//should intake user account so that user name can be displayed, the rest of the info should be constant
// should intake which screen is selected so that the selection can be constantly highlighted so that the page is indicated
export default function NavBar(){
    return (
        <SafeAreaView>
            <View style = {{flex:1/6, flexDirection: "row", justifyContent: "space-evenly", padding: "2%"}}>
                <TouchableOpacity>
                    {/* should be replaced with an icon */}
                    <Text> switch account </Text>
                </TouchableOpacity>
                <Text> ChoreNScore </Text>
            </View>
            <SafeAreaView style = {{flex:4/6, flexDirection:"row", justifyContent: "space-evenly", padding: "2%"}}>
                <View style = {{flex:5/6, flexDirection: "column", justifyContent: "center"}}>
                    <Text style = {{fontSize:45}}> Welcome, </Text>
                    <Text style = {{fontSize:45}}> UserName</Text>
                </View>
                <Image source = {require('../../assets/childprofile.jpeg')} style = {{width:100, height:100}}/>
            </SafeAreaView>
            <ScrollView style = {{flex:1/6, padding: "2%"}} contentContainerStyle = {{flexDirection:"row", justifyContent: "space-evenly"}}>
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
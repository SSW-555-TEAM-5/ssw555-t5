import {View, Text,SafeAreaView,TouchableOpacity, ScrollView} from "react-native";




//should intake user account so that user name can be displayed, the rest of the info should be constant
// should intake which screen is selected so that the selection can be constantly highlighted so that the page is indicated
export default function NavBar({ navigation,route}) {
    const { accId, docid,firestore } = route.params;
    return (
        <View>
            <ScrollView horizontal = {true} pagingEnabled = {true} style={{flexDirection:'row', padding:'2%'}} contentContainerStyle = {{justifyContent:'space-around', flexDirection:'row', padding: '10%'}}>
                <TouchableOpacity>
                    <Text>Chores</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => {navigation.navigate("ViewRewardChild", { firestore, accId, docid:docid });
                    }}>
                    <Text>Reward Store</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Reward History</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Inbox</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Manage Account</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
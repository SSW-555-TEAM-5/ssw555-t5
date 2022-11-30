import {View, Text,SafeAreaView,TouchableOpacity, ScrollView} from "react-native";




//should intake user account so that user name can be displayed, the rest of the info should be constant
// should intake which screen is selected so that the selection can be constantly highlighted so that the page is indicated
export default function NavBar({ navigation,route}) {
    const { accId, docid,firestore } = route.params;
    return (
            <ScrollView horizontal = {true} contentContainerStyle = {{justifyContent:'space-evenly'}} showsHorizontalScrollIndicator={false}>
                <View style={{paddingVertical:'2%', paddingHorizontal:'10%', flexDirection:'row', backgroundColor:'white', alignContent: 'center'}}>
                    <TouchableOpacity style={{ paddingLeft:'10%'}}>
                        <View style={{borderWidth:2, backgroundColor: "#2ABAFF", borderRadius:30, padding:'2%', borderColor:"#2ABAFF"}}>
                            <Text style ={{textAlign:'center', color: "white", fontSize:20}}>Chores List</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingLeft:'2%'}} 
                        onPress={() => {navigation.navigate("ViewRewardChild", { firestore, accId, docid:docid });
                        }}>
                        <View style={{borderWidth:2, backgroundColor: "#2ABAFF", borderRadius:30, padding:'2%', borderColor:"#2ABAFF"}}>
                            <Text style ={{textAlign:'center', color: "white", fontSize:20}}>Reward Store</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingLeft:'2%'}}>
                        <View style={{borderWidth:2, backgroundColor: "#2ABAFF", borderRadius:30, padding:'2%', borderColor:"#2ABAFF"}}>
                            <Text style ={{textAlign:'center', color: "white", fontSize:20}}>Reward History</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={{paddingLeft:'2%'}}>
                        <View style={{borderWidth:2, backgroundColor: "#2ABAFF", borderRadius:30, padding:'2%', borderColor:"#2ABAFF"}}>
                            <Text style ={{textAlign:'center', color: "white", fontSize:20}}>Inbox</Text>
                        </View>
                    </TouchableOpacity> */}
                    {/* <TouchableOpacity style={{paddingLeft:'2%'}}>
                        <View style={{borderWidth:2, backgroundColor: "#2ABAFF", borderRadius:30, padding:'2%', borderColor:"#2ABAFF"}}>
                            <Text style ={{textAlign:'center', color: "white", fontSize:20}}>Manage Account</Text>
                        </View>
                    </TouchableOpacity> */}
                </View>
            </ScrollView>

    );
}
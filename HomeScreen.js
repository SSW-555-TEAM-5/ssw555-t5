import React, { useEffect, useState } from 'react';
import { FlatList,View, Text, StyleSheet, Image, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Button } from "react-native";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs} from 'firebase/firestore';
import moment from 'moment';
import Constants from "expo-constants";
const firebaseConfig = {
    apiKey: Constants.manifest?.extra?.firebaseApiKey,
    authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
    projectId: Constants.manifest?.extra?.firebaseProjectId,
    storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
    messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
    appId: Constants.manifest?.extra?.firebaseAppId,
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);


export default function HomeScreen({navigation,route }) {
    const [searchText, enterSearch] = useState("");


    //Data format = {id: element,id2:element2}
    const [DATA,setDATA] = useState([]);
    const [refeshing, setRefresh] = useState(false);

    

    async function start() {
        try {
            
            const q = query(collection(firestore, "chores"), where("chore",">=",""));
            const querySnapshot = await getDocs(q);
            let arys = [];
            querySnapshot.forEach((doc) => {
                let docData = doc.data();
                var time = docData["dueDate"];
                time = moment.unix(time.seconds).utc().local();
                arys.push({ id: doc.id, name: docData["chore"], dueDate: time.format('M/DD/YYYY hh:mm A')});
            });
            arys=arys.sort((a, b) => {return moment(a.date).diff(b.date)});
            setDATA(arys);
            
        } catch (e) {
            console.log(e);
        }
        
    }
    useEffect(() => {
        start();
        
      }, []);
    
    const search = async () => {
        try {
            
            const q = query(collection(firestore, "chores"), where("chore",">=",searchText),where("chore","<=",searchText+"~"));
            const querySnapshot = await getDocs(q);
            let ary = [];
            querySnapshot.forEach((doc) => {
                let docData = doc.data();
                var time = docData["dueDate"];
                time = moment.unix(time.seconds).utc().local();
                ary.push({ id: doc.id, name: docData["chore"], dueDate: time.format('M/DD/YYYY hh:mm A')});
            });
            ary=ary.sort((a, b) => {return moment(a.date).diff(b.date)});
            setDATA(ary);
            
        } catch (e) {
            console.log(e);
        }
    }

    const handleSearch = async () =>{
        await search();
        setRefresh(false);
    }

    const handleRefresh = async () =>{
        enterSearch("")
        await start();
        setRefresh(false);
    }
    return (
        
        <SafeAreaView style={styles.homePage}>
            <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                <Button
                    onPress={() => navigation.navigate("CreateChores", {firestore})}
                    title="Create chore"
                    color="#841584"
                />
            </View>
            
            
            <View style={{padding:10}}>
                
                <Text>Search for a Chore...</Text>
                
                    <View style={{flexDirection:'row'}}>
                        <TextInput 
                        autoCapitalize={"none"}
                        onChangeText={(value) => enterSearch(value)}
                        value = {searchText}
                        placeholder="Search"
                        style={styles.searchBar}/>   
                        <TouchableOpacity style={styles.searchBarButton} onPress={async () => {handleSearch()}}>
                            <Text style={[styles.searchBarButtonText,{alignSelf:'flex-end'}]}>→</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.searchBarButton} onPress={async () => {handleRefresh()}}>
                            <Text style={styles.searchBarButtonText}>⟳</Text>
                        </TouchableOpacity>
                    </View>
                
            </View>

            <FlatList
                keyExtractor={(item)=> item.id}
                data={DATA}
                refreshing = {refeshing}
                onRefresh = {handleRefresh}
                renderItem={({item}) =>(
                    <ScrollView style={{ width: '100%', padding: 10}}>
                    
                        <TouchableOpacity style={{ flexDirection: 'row', flexWrap: 'wrap', width: "100%", height:'100%', borderWidth: 1, borderRadius: 8 }}onPress={() => navigation.navigate("ViewChore", { choreId: item.id, firestore })}>
                            {/* <View style={{ flex: .5 }}>
                                <Image source={{ uri: item.imageURL }} style={{ height: '100%', width: '100%', borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }} />
                            </View> */}
                            <View style={{ flexDirection: 'column', padding: 10 }}>
                                {/*meal info */}
                                <Text style={styles.infoTextTitle}>{item.name}</Text>
                                <Text style={styles.infoText}>Due Date: {item.dueDate}</Text>
                            </View>
                        </TouchableOpacity>
                    
                </ScrollView>
                )}
            />


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    searchBar: {
        padding: 8,
        borderWidth:.5,
        borderRadius:8,
        width:"80%",
        flexDirection:'row'


    },
    searchBarButton:{
        width:'10%',
        

    },
    searchBarButtonText:{
        fontSize: 30,
        textAlign:'right'
    },
    homePage:{
        height:'100%'
        

    },
    imageStyle:{
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8

    },
    infoTextTitle:{
        fontSize:14,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    infoText: {
        color: 'gray',
        textAlign: 'left',
        fontSize: 12,
    },
    linkText:{
        textAlign:'left',
        fontSize:12

    }
});


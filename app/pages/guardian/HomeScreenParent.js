import NavBar from "../../components/header.js";
import React, {useEffect, useState} from 'react';
import { initializeApp} from 'firebase/app';
import { getFirestore, collection, query, where, getDocs} from 'firebase/firestore';
import moment from 'moment';
import styles from '../../components/colors';

import {FlatList, SafeAreaView, View, ScrollView, Text, TouchableOpacity, StyleSheet} from 'react-native';


const firebaseConfig = {
    apiKey: "AIzaSyCz1itc7JT1NFYX1-X-I07ujw5jn_LGelc",
    authDomain: "ssw555-t5-7f6c3.firebaseapp.com",
    projectId: "ssw555-t5-7f6c3",
    storageBucket: "ssw555-t5-7f6c3.appspot.com",
    messagingSenderId: "664769199106",
    appId: "1:664769199106:web:809f61a64f57ee15b73b1b"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);



export default function HomeScreenParent () {
    
    //Data format = {id: element,id2:element2}
    const [DATA,setDATA] = useState([]);
    const [refeshing, setRefresh] = useState(false);

    //runs initially to bring up and entries in the database; also is called to refresh flat list
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

    const handleRefresh = async () =>{
        enterSearch("")
        await start();
        setRefresh(false);
    }

    return (
       <SafeAreaView>
            <NavBar/>
            <FlatList
                keyExtractor={(item)=> item.id}
                data={DATA}
                refreshing = {refeshing}
                onRefresh = {handleRefresh}
                renderItem={({item}) =>(
                    <ScrollView style={{ width: '100%', padding: 10}}>
                    
                        <TouchableOpacity style={{ flexDirection: 'row', flexWrap: 'wrap', width: "80%", height:'95%', borderWidth: .5, borderRadius: 8 }}onPress={() => navigation.navigate("ViewChore", { choreId: item.id, firestore })}>
                            <View style={{ flexDirection: 'column', padding: 10 }}>
                                {/* chore card */}
                                <Text style={styles.infoTextTitle}>{item.name}</Text>
                                <Text style={styles.infoText}>Due Date: {item.dueDate}</Text>
                            </View>
                        </TouchableOpacity>
                    
                </ScrollView>
                )}
            />

       </SafeAreaView>
       
       
      
    )


}

import NavBar from "../../components/header.js";
import React, { useEffect, useState } from 'react';
import {  collection, query, where, getDocs } from 'firebase/firestore';
import moment from 'moment';
import styles from '../../components/colors';
import { FlatList, SafeAreaView, View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';




export default function HomeScreenParent({navigation, route}) {
    
    const { accId, docid, firestore } = route.params;
    //Data format = {id: element,id2:element2}
    const [DATA, setDATA] = useState([]);
    const [refeshing, setRefresh] = useState(false);

    //runs initially to bring up and entries in the database; also is called to refresh flat list
    async function start() {
        try {

            const q = query(collection(firestore, "chores"), where("chore", ">=", ""));
            const querySnapshot = await getDocs(q);
            let arys = [];
            querySnapshot.forEach((doc) => {
                let docData = doc.data();
                var time = docData["dueDate"];
                time = moment.unix(time.seconds).utc().local();
                arys.push({ id: doc.id, name: docData["chore"], dueDate: time.format('M/DD/YYYY hh:mm A') });
            });
            arys = arys.sort((a, b) => { return moment(a.date).diff(b.date) });
            setDATA(arys);

        } catch (e) {
            console.log(e);
        }

    }
    useEffect(() => {
        start();

    }, []);

    const handleRefresh = async () => {
        enterSearch("")
        await start();
        setRefresh(false);
    }

    return (
        <SafeAreaView>
            <NavBar />
            <FlatList
                keyExtractor={(item) => item.id}
                data={DATA}
                refreshing={refeshing}
                onRefresh={handleRefresh}
                renderItem={({ item }) => (
                    <ScrollView style={{ width: '100%', padding: 10 }}>

                        <TouchableOpacity style={{ flexDirection: 'row', flexWrap: 'wrap', width: "80%", height: '95%', borderWidth: .5, borderRadius: 8 }} onPress={() => navigation.navigate("ViewChoreParent", { choreId: item.id, firestore })}>
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

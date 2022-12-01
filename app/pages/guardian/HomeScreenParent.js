import NavBar from "../../components/header1.js";
import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import moment from 'moment';
import styles from '../../components/colors';
import { FlatList, SafeAreaView, View, ScrollView, Text, TouchableOpacity, StyleSheet, Button, Image } from 'react-native';
import { Paragraph, Card } from "react-native-paper";




export default function HomeScreenParent({ navigation, route }) {

    const { accId, docid, firestore } = route.params;
    //Data format = {id: element,id2:element2}
    const [DATA, setDATA] = useState([]);
    const [refeshing, setRefresh] = useState(false);

    //runs initially to bring up and entries in the database; also is called to refresh flat list
    async function start() {
        try {

            const q = query(collection(firestore, "seed", accId, "chores"), where("chore", ">=", ""));
            const querySnapshot = await getDocs(q);
            let arys = [];
            querySnapshot.forEach((doc) => {
                let docData = doc.data();
                var time = docData["dueDate"];
                let finished = "";
                time = moment.unix(time.seconds).utc().local();
                if (docData["finished"] == true) {
                    finished = "Chore Finished";
                } else {
                    finished = "Chore NOT Finished";
                }
                arys.push({ id: doc.id, name: docData["chore"], dueDate: time.format('M/DD/YYYY hh:mm A'), imageURL: docData["image"], finished: finished });
            });
            arys = arys.sort((a, b) => { return moment(a.dueDate).diff(b.dueDate) });
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
        <View style={{backgroundColor: "white", flex:1}}>
            <SafeAreaView>
                <Text style={{fontSize: 30, textAlign:'center', color: "#2ABAFF"}}> Welcome,  Guardian! </Text>
                    <Text style= {{fontStyle:"italic", textAlign:'center', fontSize: 20, color:'gray'}}>Time to assign chores!</Text>

                <NavBar navigation={navigation} route={route} />

                <FlatList
                    keyExtractor={(item) => item.id}
                    data={DATA}
                    refreshing={refeshing}
                    onRefresh={handleRefresh}
                    renderItem={({ item }) => (
                        <ScrollView style={{ width: '100%', padding: 10 }}>

                            <TouchableOpacity onPress={() => navigation.navigate("ViewChoreParent", { accId, proId: docid, choreId: item.id, firestore })}>

                                {/* <View style={{ flex: .5 }}>
                                    <Image source={{ uri: item.imageURL }} style={{ height: '100%', width: '100%', borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }} />
                                </View>
                                <View style={{ flexDirection: 'column', padding: 10 }}> */}
                                    {/* chore card */}
                                    {/* <Text style={styles.infoTextTitle}>{item.name}</Text>
                                    <Text style={styles.infoTextTitle}>{item.finished}</Text>
                                    <Text style={styles.infoText}>Due Date: {item.dueDate}</Text>
                                </View> */}
                                <Card>
                                    <Card.Cover source={{ uri: item.imageURL }}/>
                                    <Card.Title title={item.name} titleStyle={styles.infoTextTitle} />
                                    <Card.Content>
                                        <Paragraph styles={styles.infoText}>{item.finished}</Paragraph>
                                        <Paragraph style={styles.infoText}>Due Date: {item.dueDate}</Paragraph>
                                    </Card.Content>
                                </Card>
                            </TouchableOpacity>

                        </ScrollView>
                    )}
                />

            </SafeAreaView>

        </View>

    )


}

import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet, Image, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Button } from "react-native";
import { collection, query, where, getDocs } from 'firebase/firestore';
import moment from 'moment';
import NavBar from "../../components/header.js";
import styles from '../../components/colors';
// import { Title, Paragraph } from 'react-native-elements';
import { Card, Paragraph } from 'react-native-paper';
export default function HomeScreenChild({ navigation, route }) {
    const [searchText, enterSearch] = useState("");

    const { accId, docid,firestore } = route.params;
    //Data format = {id: element,id2:element2}
    const [DATA, setDATA] = useState([]);
    const [refeshing, setRefresh] = useState(false);


    async function start() {
        try {
            console.log(docid);
            const q = query(collection(firestore, "seed", accId,"chores"), where("chore", ">=", ""));
            const querySnapshot = await getDocs(q);
            let arys = [];
            querySnapshot.forEach((doc) => {
                let docData = doc.data();
                var time = docData["dueDate"];
                time = moment.unix(time.seconds).utc().local();
                arys.push({ id: doc.id, name: docData["chore"], dueDate: time.format('M/DD/YYYY hh:mm A'), imageURL: docData["image"] });
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

    const search = async () => {
        try {

            const q = query(collection(firestore, "seed", accId,"chores"), where("chore", ">=", searchText), where("chore", "<=", searchText + "~"));
            const querySnapshot = await getDocs(q);
            let ary = [];
            querySnapshot.forEach((doc) => {
                let docData = doc.data();
                var time = docData["dueDate"];
                time = moment.unix(time.seconds).utc().local();
                ary.push({ id: doc.id, name: docData["chore"], dueDate: time.format('M/DD/YYYY hh:mm A') });
            });
            ary = ary.sort((a, b) => { return moment(a.dueDate).diff(b.dueDate) });
            setDATA(ary);

        } catch (e) {
            console.log(e);
        }
    }

    const handleSearch = async () => {
        await search();
        setRefresh(false);
    }

    const handleRefresh = async () => {
        enterSearch("")
        await start();
        setRefresh(false);
    }
    return (
        <View style={{backgroundColor: "white", flex:1}}>
            <SafeAreaView style={{padding:'10%',backgroundColor: "white"}}>
                <Text style={{fontSize: 30, textAlign:'center', color: "#2ABAFF"}}> Welcome! </Text>
                <Text style= {{fontStyle:"italic", textAlign:'center', fontSize: 20, color:'gray'}}>Time to do chores!</Text>
                <NavBar navigation={navigation} route={route} />
                <FlatList
                    keyExtractor={(item) => item.id}
                    data={DATA}
                    refreshing={refeshing}
                    onRefresh={handleRefresh}
                    renderItem={({ item }) => (
                        <View style={{ width: '100%', paddingVertical: '10%', backgroundColor:'white' }}>
                            <TouchableOpacity onPress={() => {navigation.navigate("ViewChoreChild", { accId, proId:docid,choreId: item.id, firestore })}}>

                                <Card>
                                    <Card.Cover source={{ uri: item.imageURL }}/>
                                    <Card.Title title={item.name} titleStyle={styles.infoTextTitle} />
                                    <Card.Content>
                                        <Paragraph style={styles.infoText}>Due Date: {item.dueDate}</Paragraph>
                                    </Card.Content>
                                </Card>
                            </TouchableOpacity>

                        </View>
                    )}
                />


            </SafeAreaView>
        </View>
    );
}

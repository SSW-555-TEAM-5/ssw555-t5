import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet, Image, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Button } from "react-native";
import { collection, query, where, getDocs } from 'firebase/firestore';
import moment from 'moment';
import NavBar from "../../components/header.js";
import styles from '../../components/colors';
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
        <SafeAreaView>
            <NavBar />
            <Button
                onPress={() => {

                    navigation.navigate("ViewRewardChild", { firestore, accId, docid:docid });

                }}
                title="ViewRewardChild"
                color="#841584"
            />
            <FlatList
                keyExtractor={(item) => item.id}
                data={DATA}
                refreshing={refeshing}
                onRefresh={handleRefresh}
                renderItem={({ item }) => (
                    <ScrollView style={{ width: '100%', padding: 10 }}>

                        <TouchableOpacity style={{ flexDirection: 'row', flexWrap: 'wrap', width: "80%", height: '95%', borderWidth: .5, borderRadius: 8 }} onPress={() => {navigation.navigate("ViewChoreChild", { accId, proId:docid,choreId: item.id, firestore })}}>
                            <View style={{ flex: .5 }}>
                                <Image source={{ uri: item.imageURL }} style={{ height: '100%', width: '100%', borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }} />
                            </View>
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

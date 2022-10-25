// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, addDoc, collection, query, where, getDocs, getDoc, Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet, Image, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Button } from "react-native";
import { Overlay } from 'react-native-elements';
import NavBar from '../components/header';

// Your web app's Firebase configuration
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
const auth = getAuth(app);
const firestore = getFirestore(app);

export default function ProfileSelection({ navigation, route }) {
    let email = "deanj@gmail.com";
    let accId = "3vv3AoFj0XPiO8edCQq8";
    //const { accId, email } = route.params;
    const [pin, setPin] = useState("");
    const [visible, setVisible] = useState(false);
    //Data format = {id: element,id2:element2}
    const [DATA, setDATA] = useState([]);
    const [refeshing, setRefresh] = useState(false);

    const toggleOverlay = () => {
        if (visible == true) {
            setVisible(false);
        } else {
            setVisible(true);
        }

    };

    async function start() {
        try {
            const q = collection(firestore, "seed", accId, "Profiles");
            const querySnapshot = await getDocs(q);
            let arys = [];
            querySnapshot.forEach((doc) => {
                let docData = doc.data();
                arys.push({ id: doc.id, name: docData["profileName"] });
            });
            setDATA(arys);

        } catch (e) {
            console.log(e);
        }

    }

    async function guardStatus(name) {
        const q = await query(collection(firestore, "seed", accId, "Profiles"), where("profileName", "==", name));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            let docData = doc.data();
            if (docData["status"] == false) {
                navigation.navigate("HomeScreenChild", { accId, docid: doc.id, firestore })
            }
            else {
                setVisible(true);
            }
        });
    }

    async function guardianVerify() {
        const q = query(collection(firestore, "seed", accId, "Profiles"), where("pin", "==", pin));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            let docR = "";
            querySnapshot.forEach((doc) => {
                docR = doc.id;
            });
            navigation.navigate("HomeScreenParent", { accId, docid: docR, firestore })
        }
        setPin("");
        setVisible(false);
    }

    useEffect(() => {
        start();

    }, []);

    const handleRefresh = async () => {
        await start();
        setRefresh(false);
    }
    return (
        <SafeAreaView>
            <FlatList
                keyExtractor={(item) => item.id}
                data={DATA}
                refreshing={refeshing}
                onRefresh={handleRefresh}
                renderItem={({ item }) => (
                    <ScrollView style={{ width: '100%', padding: 10 }}>

                        <TouchableOpacity style={{ flexDirection: 'row', flexWrap: 'wrap', width: "80%", height: '95%', borderWidth: .5, borderRadius: 8 }} onPress={async () => { guardStatus(item.name) }}>
                            {/* <View style={{ flex: .5 }}>
                                <Image source={{ uri: item.imageURL }} style={{ height: '100%', width: '100%', borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }} />
                            </View> */}
                            <View style={{ flexDirection: 'column', padding: 10 }}>
                                <Text style={styles.infoTextTitle}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>

                    </ScrollView>
                )}
            />

            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>

                <Text>Enter Pin</Text>
                <TextInput
                    onChangeText={setPin}
                    placeholder={"0000"}

                />
                <Button
                    onPress={async () => { guardianVerify() }}
                    title="Enter"
                    color="#841584"
                />
            </Overlay>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    searchBar: {
        padding: 8,
        borderWidth: .5,
        borderRadius: 8,
        width: "80%",
        flexDirection: 'row'


    },
    searchBarButton: {
        width: '10%',


    },
    searchBarButtonText: {
        fontSize: 30,
        textAlign: 'right'
    },
    homePage: {
        height: '100%'


    },
    imageStyle: {
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8

    },
    infoTextTitle: {
        fontSize: 14,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    infoText: {
        color: 'gray',
        textAlign: 'left',
        fontSize: 12,
    },
    linkText: {
        textAlign: 'left',
        fontSize: 12

    }
});


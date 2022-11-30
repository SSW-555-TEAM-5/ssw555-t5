// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, addDoc, collection, query, where, getDocs, getDoc, Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Button, Modal } from "react-native";
import { Overlay, Image} from 'react-native-elements';
import { Card } from 'react-native-paper';
import { pickImage } from '../../upload-image';
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
    const { accId } = route.params;
    //let accId = "3vv3AoFj0XPiO8edCQq8";

    
    const [accidState, setAccidState] = useState(accId);
    const [pin, setPin] = useState("");
    const [newPName, setNewPName] = useState("");
    const [avatarURL, setAvatarURL] = useState("");

    const [visible, setVisible] = useState(false);
    //Data format = {id: element,id2:element2}
    const [DATA, setDATA] = useState([]);
    const [refeshing, setRefresh] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    //switches overlay on and off
    const toggleOverlay = () => {
        if (visible == true) {
            setVisible(false);
        } else {
            setVisible(true);
        }

    };

    const toggleOverlay2 = () => {
        if (modalVisible == true) {
            setModalVisible(false);
        } else {
            setModalVisible(true);
        }

    };

    //function that runs when screen is loading, it lists all profiles onto the data array
    async function start() {
        try {
            const q = collection(firestore, "seed", accId, "Profiles");
            const querySnapshot = await getDocs(q);
            let arys = [];
            querySnapshot.forEach((doc) => {
                let docData = doc.data();
                arys.push({ id: doc.id, name: docData["profileName"], imageURL: docData["avatar"] });
            });
            setDATA(arys);

        } catch (e) {
            console.log(e);
        }

    }

    //checks if the profile selected is guardian profile or not
    async function guardStatus(name) {
        const q = await query(collection(firestore, "seed", accId, "Profiles"), where("profileName", "==", name));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            let docData = doc.data();
            //if guardian profile is not selected, child homescreen is shown with corresponding profile
            if (docData["status"] == false) {
                navigation.navigate("HomeScreenChild", { accId, docid: doc.id ,firestore })
            }
            else {
                setVisible(true);
            }
        });
    }

    //verify the pin entered
    async function guardianVerify() {
        const q = query(collection(firestore, "seed", accId, "Profiles"), where("pin", "==", pin));
        const querySnapshot = await getDocs(q);
        //if the pin is correct, navigate to parent homescreen else return to profile pg
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

    //add new profile
    const addNewProfile = async () => {
        try {

            const profileData = {
                name: newPName,
                status: false,
                totalPoint: 0,
                avatar: avatarURL
            }

            const docRef = await addDoc(collection(firestore, "seed", accId, "Profiles"), profileData);
            setModalVisible(false);
            start();

        } catch (e) {
            console.log(e);
        }
    }


    //using the start() function on loading
    useEffect(() => {
        start();

    }, []);

    //refreshing the flat list
    const handleRefresh = async () => {
        await start();
        setRefresh(false);
    }
    return (
        <SafeAreaView>
            <View style = {{paddingVertical:'15%'}}>
            <FlatList
                
                keyExtractor={(item) => item.id}
                data={DATA}
                refreshing={refeshing}
                onRefresh={handleRefresh}
                // numColumns= {3}
                renderItem={({ item }) => (
                    <View style={{ width: '100%', padding: 10 }}>
                        <TouchableOpacity onPress={async () => { guardStatus(item.name) }}>
                            <Card>
                                <Card.Cover source={{ uri: item.imageURL }}/>
                                <Card.Title title={item.name} />
                            </Card>
                        </TouchableOpacity>

                    </View>
                )}
            />

            <Button
                onPress={async () => { setModalVisible(true) }}
                title="add new profile"
                color="#841584"
            />
            </View>
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

            <Overlay isVisible={modalVisible} onBackdropPress={toggleOverlay2}>
                <View >
                    <Text>Enter profile name</Text>
                    <TextInput
                        onChangeText={setNewPName}
                        placeholder={"Bob"}
                    />


                    <Button
                        onPress={async () => {
                            let image = await pickImage(accidState+'/avatars');
                            setAvatarURL(image);
                        }}
                        title="Upload Profile Picture"
                        color="#841584"
                    />
                    <Button
                        onPress={async () => { addNewProfile() }}
                        title="Add"
                        color="#841584"
                    />
                </View>
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


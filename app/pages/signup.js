

import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, ImageBackground, Alert, Modal, Text, TouchableOpacity, TextInput, SafeAreaView,Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { signUpWithEmail } from '../../firebase';
import { pickImage } from '../../upload-image';


export default function SignUp({ navigation }) {
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [guardianName, setGuardianName] = useState("");
    const [guardianPin, setGuardianPin] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [avatarURL, setAvatarURL] = useState("https://firebasestorage.googleapis.com/v0/b/ssw555-t5-7f6c3.appspot.com/o/avatars%2FChoreNScore%20Cuteness.jpeg?alt=media&token=5563dbd7-6d14-422d-9e2b-960d740d472e");
    return (
        <>
            {/* sign up error modal */}
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert("Modal has been closed."); setModalVisible(!modalVisible); }}>
                <View >
                    <Text>Account Not Created</Text>
                    <Text>Invalid Submission(s)</Text>
                    <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)}
                        style={{ backgroundColor: '#2ABAFF', width: '35%', alignSelf: 'center', padding: '2%', borderRadius: '4%' }}
                    >
                        <Text style={{ color: 'white' }}>Sign Up Error</Text>

                    </TouchableOpacity>

                </View>
            </Modal>

            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={styles.container}>
                    <Text style={[styles.textHeader, { alignSelf: 'center' }]}>Account Holder</Text>
                    <Text style={{ alignSelf: 'center' }}>___________________________________</Text>
                    <View>
                        <Text style={styles.textHeader}>First Name</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                onChangeText={setFName}
                                placeholder={"George"}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.textHeader}>Last Name</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                onChangeText={setLName}
                                placeholder={"McGregor"}
                            />
                        </View>
                    </View>
                    <View>

                        <Text style={styles.textHeader}>Email</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                onChangeText={setEmail}
                                placeholder={"abc123@gmail.com"}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.textHeader}>Password</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                onChangeText={setPassword}
                                placeholder={"Password"}
                                secureTextEntry={true}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.textHeader}>Guardian Profile Name</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                onChangeText={setGuardianName}
                                placeholder={"Joe McGregor"}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.textHeader}>Guardian Pin</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                onChangeText={setGuardianPin}
                                placeholder={"1234"}
                                secureTextEntry={true}
                            />
                        </View>

                        <Button
                            onPress={async () => {
                                let image = await pickImage('/accountAvatar');
                                if (image != ""){
                                    setAvatarURL(image);
                                }
                                
                            }}
                            title="Pick Image"
                            color="#2ABAFF"
                        />
                    </View>


                    <TouchableOpacity
                        onPress={async () => {
                            let result = await signUpWithEmail(fName, lName, email, password, avatarURL, guardianName, guardianPin);
                            //if signing up is successful, send to profile selection screen with seed account ID
                            if (result != null) {
                                navigation.navigate("ProfileSelection", { accId: result });
                            }
                            else {
                                setModalVisible(true);
                            }
                        }} style={{ backgroundColor: '#2ABAFF', width: '50%', alignSelf: 'center', padding: '2%', borderRadius: '4%' }}>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>Sign Up</Text>

                    </TouchableOpacity>
                </View>
            </View>
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: '15%',
        width: '85%',
        height: "85%",
        justifyContent: 'space-evenly',
        padding: '10%',
    },
    textHeader: {
        fontSize: 22,
        color: 'black',
        paddingBottom: '2%'

    },
    textInput: {
        borderColor: 'gray',
        borderWidth: '1%',
        width: '100%',
        borderRadius: '4%',
        padding: '2%',

    },
    textComponent: {
        //paddingBottom: '5%',
        padding: '2%'
    }
});
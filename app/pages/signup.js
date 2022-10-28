

import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, ImageBackground, Alert, Modal, Text, Button, TextInput,SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { signUpWithEmail } from '../../firebase';
// import { pickImage } from '../../upload-image';


export default function SignUp({ navigation }) {
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [avatarURL, setAvatarURL] = useState("");
    const [password, setPassword] = useState("");
    const [guardianName, setGuardianName] = useState("");
    const [guardianPin, setGuardianPin] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            {/* sign up error modal */}
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert("Modal has been closed."); setModalVisible(!modalVisible); }}>
                <View >
                    <Text>Account Not Created</Text>
                    <Text>Invalid Submission(s)</Text>
                    <Button
                        onPress={() => setModalVisible(!modalVisible)}
                        title="try again"
                        color="#841584"
                    />
                </View>
            </Modal>
            <View style= {{flex: 1,justifyContent:'center'}}>
            <View style = {styles.container}>
                <Text style = {styles.textHeader}>First Name</Text>
                <View style = {styles.textHeader}></View>
                <TextInput
                    onChangeText={setFName}
                    placeholder={"George"}
                />
                <Text style = {styles.textHeader}>Last Name</Text>
                <View style = {styles.textHeader}></View>
                <TextInput
                    onChangeText={setLName}
                    placeholder={"Washington"}
                />
                <Text>____________________________</Text>
                <Text style = {styles.textHeader}>Email</Text>
                <TextInput
                    onChangeText={setEmail}
                    placeholder={"abc123@gmail.com"}
                />
                <Text style = {styles.textHeader}>Password</Text>
                <TextInput
                    onChangeText={setPassword}
                    placeholder={"Password"}
                />
                <Text style = {styles.textHeader}>Guardian profile name</Text>
                <TextInput
                    onChangeText={setGuardianName}
                    placeholder={"guardian"}
                />
                <Text style = {styles.textHeader}>Guardian Pin Password</Text>
                <TextInput
                    onChangeText={setGuardianPin}
                    placeholder={"1234"}
                />
                {/* 
                    <Button
                        onPress={async () => {
                            let image = await pickImage('avatars');
                            setAvatarURL(image);
                        }}
                        title="Upload Profile Picture"
                        color="#841584"
                    /> */}

                <Button
                    onPress={async () => {
                        let result = await signUpWithEmail(fName, lName, email, password, avatarURL, guardianName, guardianPin);
                        if (result != null) {
                            navigation.navigate("ProfileSelection", { accId: result });
                        }
                        else {
                            setModalVisible(true);
                        }
                    }}
                    title="Sign Up"
                    color="#841584"
                />

                    
            </View>
            </View>

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: '15%',
        width: '75%',
        height: "50%",
        justifyContent: 'center'
    },
    textHeader:{
        fontSize:22,
        color: 'darkblue'
    },
    textInput: {
        borderColor: 'darkblue',
        borderRadius: '15%',
        borderWidth:'1%',
        width: '80%',
        height: '15%'
    }
});
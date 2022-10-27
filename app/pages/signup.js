

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
        <SafeAreaView style={styles.container}>
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
            <StatusBar style="light" />

            <View>

                <Text>First Name</Text>
                <TextInput
                    onChangeText={setFName}
                    placeholder={"George"}
                />


                <Text>Last Name</Text>
                <TextInput
                    onChangeText={setLName}
                    placeholder={"Washington"}

                />
                <Text>____________________________</Text>

                <Text>Email</Text>
                <TextInput
                    onChangeText={setEmail}
                    placeholder={"abc123@gmail.com"}

                />

                <Text>Password</Text>
                <TextInput
                    onChangeText={setPassword}
                    placeholder={"Password"}

                />

                <Text>Guardian profile name</Text>
                <TextInput
                    onChangeText={setGuardianName}
                    placeholder={"guardian"}

                />


                <Text>Guardian Pin Password</Text>
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
                            navigation.navigate("ProfileSelection", { accId: result, email: email });
                        }
                        else {
                            setModalVisible(true);
                        }
                    }}
                    title="Sign Up"
                    color="#841584"
                />

               

            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: 'white',
        alignSelf: 'center',
        position: 'absolute',
        borderRadius: 20,
        width: 338,
        height: 577,
        justifyContent: 'space-around',
    },
});

import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, ImageBackground, Alert, Modal, Text, Button, TextInput,SafeAreaView  } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { logInWithEmail } from '../../firebase';


export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
            {/* login error modal */}
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert("Modal has been closed."); setModalVisible(!modalVisible); }}>
                <View style={[styles.container, { padding: 40, justifyContent: "space-evenly", alignSelf: "center" }]}  >
                    <Text>Incorrect Username or Password!</Text>
                    <Button
                        onPress={() => setModalVisible(!modalVisible)}
                        title="try again"
                        color="#841584"
                    />
                </View>
            </Modal>

            <StatusBar style="light" />


            <View style={[styles.container, { justifyContent: 'space-around' }]}>

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
                <Button
                    onPress={async () => {
                        let result = await logInWithEmail(email, password);
                        if (typeof result === 'string' || result instanceof String) {
                            navigation.navigate("ProfileSelection", { accId: result });
                        }
                        else {
                            setModalVisible(true);
                        }
                    }}
                    title="Log In"
                    color="#841584"
                />
                <View style={{ height: Dimensions.get('screen').width * 0.02 }}></View>
            </View>

        </>
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
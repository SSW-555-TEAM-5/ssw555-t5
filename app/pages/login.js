
import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, ImageBackground, Alert, Modal, Text, Button, TouchableOpacity, TextInput,SafeAreaView  } from 'react-native';
import { logInWithEmail } from '../../firebase';


export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
            {/* login error modal */}
            
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert("Modal has been closed."); setModalVisible(!modalVisible); }}>
                <View style={{justifyContent:'center', width:'80%', height:'30%', backgroundColor: 'white', borderRadius:'20%', alignSelf:'center', alignItems:'center'}}>
                    <Text style = {{textAlign:'center', fontSize:20}}>Incorrect Username or Password!</Text>
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                        <Text style = {{textAlign:'center', fontSize:25, color:'#2ABAFF'}}> Try Again </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <View style={{flex:1, justifyContent:'center'}}>
            <View style={styles.container}>
                <Text style={styles.textHeader}>Email</Text>
                    <View style = {styles.textInput}>
                    <TextInput
                        onChangeText={setEmail}
                        placeholder={"abc123@gmail.com"}
                        
                    />
                    </View>
                <Text style={styles.textHeader}>Password</Text>
                    <View style = {styles.textInput}>
                    <TextInput
                        onChangeText={setPassword}
                        placeholder={"Password"}
                    />
                    </View>
                <TouchableOpacity
                    onPress={async () => {
                        let result = await logInWithEmail(email, password);
                        if (typeof result === 'string' || result instanceof String) {
                            navigation.navigate("ProfileSelection", { accId: result });
                        }
                        else {
                            setModalVisible(true);
                        }
                    }}>
                        <Text style = {{color:'#2ABAFF', fontSize: 25}}> Login</Text>
                    
                    </TouchableOpacity>
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
        paddingTop: '5%',
        paddingBottom: '5%',
        width: '80%',
        height: "30%",
        justifyContent: 'space-between'
    },
    textInput: {
        borderColor: 'gray',
        borderWidth:'1%',
        width: '70%',
        borderRadius:'4%',
        padding:'2%',
       
    },
    textHeader: {
        fontSize: '25%',
        color: 'darkgray'
    }
});
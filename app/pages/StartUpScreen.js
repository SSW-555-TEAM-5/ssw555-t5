import React from "react";
import {View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, ImageBackground} from "react-native";

export default function StartUpScreen({ navigation }) {

    return (
        
        <ImageBackground source={require('../../assets/splash.png')} style={styles.image } resizeMode='stretch'>
            <View>
                <View style={ styles.logoWrapper }>
                    <Text style = {{color:'black', fontSize:50}}>Chore</Text>
                    <Text style = {{textAlign: "center", color: "#2ABAFF",fontSize: "50"}}>N</Text>
                    <Text style = {{color:'black', fontSize:50}}>Score</Text>
                </View>
                <Text style = {styles.slogan}>Rewards For Chores</Text>
                <View style = {{flexDirection:'row', justifyContent: 'center', justifyContent: 'space-evenly', bottom:'-80%'}}>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style = {styles.buttons}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                        <Text style = {styles.buttons}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center",
    },
    logoWrapper: {
        flexDirection:'row' , 
        justifyContent:'center'
    },
    slogan: {
        textAlign: "center",
        color: "#0D0D0D",
        opacity: 0.2,
        fontSize: "20"
    },
    buttons: {
        fontSize: 25, 
        color: "#2ABAFF",
        textAlign: "center"   
    }
});
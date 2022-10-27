
import React from "react";
import { useFonts, CinzelDecorative_400Regular, CinzelDecorative_700Bold, } from '@expo-google-fonts/cinzel-decorative';
import { Montserrat_700Bold } from '@expo-google-fonts/montserrat'
import { FlatList, View, Text, StyleSheet, Image, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Button } from "react-native";


export default function StartUpScreen({ navigation }) {

    let [isLoaded] = useFonts({
        CinzelDecorative_400Regular,
        CinzelDecorative_700Bold,
        Montserrat_700Bold
    });

    return (
        <SafeAreaView style={styles.container}>
            {/* <ImageBackground source={logo} style={{ width: '100%', height: '110%', justifyContent: 'flex-end', alignItems: 'center' }}></ImageBackground> */}
            <View style={{ justifyContent: 'space-between', padding: 40, top: -150 }}>
                <Text style={styles.fixToText}>CNS</Text>
                <Text style={styles.text1}>ChoreNScore</Text>
            </View>
            <Button
                onPress={() => navigation.navigate("Login")}
                title="   Login  "
                color="green"
            />
            <View style={{ height: 20 }} />
            <Button
                onPress={() => navigation.navigate("SignUp")}
                title="Sign Up"
                color="green"
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        padding: 40,
        flex: 1,
        flexDirection: 'column'

    },

    fixToText: {
        fontFamily: 'CinzelDecorative_700Bold',
        fontWeight: '700',
        fontSize: 121,
        color: 'blue',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 4,
        textAlign: 'center',
    },
    text1: {
        fontFamily: 'Montserrat_700Bold',
        fontWeight: '700',
        fontSize: 40,
        textAlign: 'center',
        textShadowColor: 'white',
        textShadowRadius: 3,
        textShadowOffset: { width: 1.5, height: 1.5 }

    },

});
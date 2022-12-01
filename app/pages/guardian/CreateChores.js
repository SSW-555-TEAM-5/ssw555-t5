import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet, ScrollView, Button, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Overlay } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addDoc, collection } from 'firebase/firestore';
import { pickImage } from '../../../upload-image';
import styles from '../../components/colors';



export default function CreateChores({ navigation, route }) {
    const [visible, setVisible] = useState(false);
    const { firestore, accId } = route.params;
    const [chore, setChore] = useState("");
    const [notes, enterNotes] = useState("");
    const [choreId, setChoreId] = useState("");
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState(null);
    const [show, setShow] = useState(false);
    const [rewardPoint, setReward] = useState(0);
    const [imageURL, setImageURL] = useState("");

    const hostChore = async (choreName, rewardPoint, dDate, notes, imageURL) => {

        try {

            const data = { chore: choreName, reward: rewardPoint, dueDate: dDate, note: notes, image: imageURL, finished: false, pending: false }

            const docRef = await addDoc(collection(firestore, "seed", accId, "chores"), data);

            return docRef.id;
        } catch (e) {
            console.log(e);
            return e
        }
    }






    const onChange = (chore, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const toggleOverlay = () => {
        setVisible(true);
    };

    const hostEv = async () => {
        setChoreId(await hostChore(chore, rewardPoint, date, notes, imageURL));
        toggleOverlay();
    };

    const viewChore = () => {
        setVisible(false);
        navigation.navigate("ViewChoreParent", { firestore, accId, choreId  })
    };

    return (
        <View style={{backgroundColor: "white", flex:1}}>
            <SafeAreaView style={styles.container}>
                <ScrollView >
                
                <View style={{paddingBottom:"5%"}}>
                    <Text style = {[styles.infoTextTitle,{alignSelf:'center', fontSize:35}]}>Create Chore</Text>
                    <Text style={{alignSelf:'center'}}>___________________________________</Text>
                </View>


                <View style={{paddingBottom:"10%"}}>
                    <Text style = {styles.textHeader}>Chore Name</Text>
                    <View style = {styles.textInput}>
                        <TextInput
                            onChangeText={setChore}
                            placeholder={"laundry"}

                        />
                    </View>
                </View>

                <Text style = {styles.textHeader}>Select the DATE and TIME</Text>
                <View style={{alignItems:"center", paddingBottom:"10%"}}>
                    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                        <TouchableOpacity style={{ borderRadius: 10, padding: 10, alignContent: 'center', alignItems: 'center' }} onPress={() => showMode('date')}>
                            <Text style={{ color: "#2ABAFF" }}>Select Date</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ borderRadius: 10, padding: 10, alignContent: 'center', alignItems: 'center' }} onPress={() => showMode('time')}>
                            <Text style={{ color: "#2ABAFF" }}>Select Time</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{paddingBottom:"10%"}}>
                    <Text style = {styles.textHeader}>Due Date Selected: </Text>
                    <Text style = {[styles.textHeader, {textAlign:'center', color:'gray'}]}>{date.toLocaleString()}</Text>
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                display="default"
                                onChange={onChange}
                            />
                        )}
                </View>

                <View style={{paddingBottom:"10%"}}>
                    <Text style = {styles.textHeader}>Reward Points</Text>
                    <View style = {styles.textInput}>
                        <TextInput
                            onChangeText={setReward}
                            placeholder={"5"}
                        />
                    </View>
                </View>

                <View style={{paddingBottom:"10%"}}>
                    <Text style = {styles.textHeader}>Notes</Text>
                    <View style = {styles.textInput}>
                        <TextInput
                            onChangeText={enterNotes}
                            placeholder={"Do laundry for all family members"}
                        />
                    </View>
                </View>
                    


                    <Button
                        onPress={async () => {
                            let image = await pickImage(accId+'/chores');
                            setImageURL(image);
                        }}
                        title="Upload picture for chore reference(optional)"
                        color="#2ABAFF"
                    />

                    <Button
                        onPress={async () => { hostEv() }}
                        title="Create Chore"
                        color="#2ABAFF"
                    />
                    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>

                        <Text>Chore Created!</Text>
                        <Button
                            onPress={async () => { viewChore() }}
                            title="View Chore"
                            color="#2ABAFF"
                        />
                        <Button
                            onPress={async () => { navigation.goBack() }}
                            title="Ok"
                            color="#2ABAFF"
                        />
                    </Overlay>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

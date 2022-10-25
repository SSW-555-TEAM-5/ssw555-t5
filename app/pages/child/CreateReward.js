import {SafeAreaView, View, TouchableOpacity, Text, StyleSheet, ScrollView, Button, TextInput} from 'react-native';
import React, { useState } from 'react';
import {Overlay } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addDoc, collection } from 'firebase/firestore';





export default function CreateReward({navigation,route }) {
    const [visible, setVisible] = useState(false);
    const {firestore} = route.params;
    const [notes, enterNotes] = useState("");
    const [rewardId, setRewardId] = useState("");
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState(null);
    const [show, setShow] = useState(false);
    const [rewardPoint, setReward] = useState(0);



    const hostReward = async (rewardName, rewardPoint, dDate, notes) => {

        try {

            const data = { reward: rewardName, reward: rewardPoint, dueDate: dDate, note: notes }
    
            const docRef = await addDoc(collection(firestore, "rewards"), data);
           
            return docRef.id;
        } catch (e) {
            console.log(e);
            return e
        }
    }
    
    
    
    
    

    const onChange = (reward, selectedDate) => {
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
        setRewardId(await hostReward(reward, rewardPoint, date, notes));
        toggleOverlay();
    };

    const viewReward = () => {
        setVisible(false);
        navigation.navigate("ViewReward", { rewardId, firestore })
    };

    return (
        <SafeAreaView>
            <ScrollView>
                    <Text>Reward title</Text>
                    <TextInput 
                        onChangeText={setReward}
                        placeholder={"laundry"}
                        
                    />
                    <Text>Select the DATE and TIME for the due date</Text>
                    <View style={{ flexDirection: 'row', alignContent:'center' }}>
                        <TouchableOpacity style={{ borderRadius: 10, padding: 10, alignContent: 'center', alignItems: 'center' }} onPress={() => showMode('date')}>
                            <Text style={{ color: 'black' }}>Select Date</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ borderRadius: 10, padding: 10, alignContent: 'center', alignItems: 'center' }} onPress={() => showMode('time')}>
                            <Text style={{ color: 'black' }}>Select Time</Text>
                        </TouchableOpacity>

                    </View>
                    <Text>Due Date Selected:  {date.toLocaleString()}</Text>
                    
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            display="default"
                            onChange={onChange}
                        />
                    )}

                    <Text>Rewards(stars)</Text>
                    <TextInput 
                        onChangeText={setReward}
                        placeholder={"5"}
                    />

                   
                    <Text>Notes</Text>
                    <TextInput 
                        onChangeText={enterNotes}
                        placeholder={"Do laundry for all family members"}
                    />

                    <Button
                        onPress={async () => { hostEv() }}
                        title="Create Reward"
                        color="#841584"
                    />
                    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>

                        <Text>Reward Created!</Text>
                        <Button
                            onPress={async () => {  viewReward()}}
                            title="View Reward"
                            color="#841584"
                        />
                        <Button
                            onPress={async () => {  navigation.navigate("Home")}}
                            title="Ok"
                            color="#841584"
                        />
                    </Overlay>
                    


                </ScrollView>
        </SafeAreaView>
    );
}

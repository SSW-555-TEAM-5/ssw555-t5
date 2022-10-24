import { SafeAreaView, View, Text, Image, StyleSheet, ImageBackground, FlatList, ScrollView, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import {  doc,  getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import moment from 'moment';
import { Overlay } from 'react-native-elements';
import styles from '../../components/colors';


export default function ViewChoreChild({ navigation,route }) {
  const {choreId, firestore} = route.params;
  
  
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(moment());
  const [rewardPoint, setReward] = useState(0);
  const [choreName, setChoreName] = useState("");

  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState("");
  const [refeshing, setRefresh] = useState(false);


  let time;

  const getChoreInfo = async (id) => {
    try {
      const choreRef = doc(firestore, 'chores', id);
      const querySnapshot = await getDoc(choreRef);

      const chore = querySnapshot.data();
      setChoreName(chore["chore"]);
      setReward(chore["reward"]);
      setNotes(chore["note"]);
      time = querySnapshot.data()["dueDate"];
      time = moment.unix(time.seconds).utc().local();
      setDate(time);
    } catch (e) {
      console.log(e);
    }
  }


  
 

  const handleRefresh = async () =>{
    start();
    setRefresh(false);
  }
  const start = async () =>{
    await getChoreInfo(choreId)
    setRefresh(true);
  }
  useEffect(() => {
    start();
  }, []);

  return (
    <View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={{ alignItems: "center", padding: 15 }}>
            <Text style={styles.whiteTextBold}>{choreName}</Text>
            
              <Text style={styles.whiteTextReg}>{date.format('hh:mm A')} </Text>
           
              
      
          
            
            <View style={{ flexDirection:'row', justifyContent:'space-evenly' }}>
              <Text style={styles.white_smallTextReg}> {date.format('M/DD/YYYY')} </Text>
            </View>
            <Text style={styles.whiteTextReg}> Reward: {rewardPoint} </Text>
          </View>
      

          <View style={styles.locationBox}>
            <View style={{ flexDirection: "column", padding: 10,flex:.5 }}>
              <Text style={styles.black_smallTextBold}>Notes:</Text>
              <Text> {notes} </Text>
            </View>
          </View>
        
          <Button
                onPress={async () => {  navigation.navigate("Home")}}
                title="Ok"
                color="#841584"
            />
        
        </ScrollView>
    </View>
  );
}

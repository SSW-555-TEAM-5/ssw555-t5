import { View, Text,ScrollView, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import {  doc,  getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import moment from 'moment';
import styles from '../../components/colors';


export default function ViewRewardParent({ navigation,route }) {
  const {rewardId, firestore} = route.params;
  
  
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(moment());
  const [rewardPoint, setReward] = useState(0);
  const [rewardName, setRewardName] = useState("");

  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState("");
  const [refeshing, setRefresh] = useState(false);


  let time;

  const getRewardInfo = async (id) => {
    try {
      const rewardRef = doc(firestore, 'rewards', id);
      const querySnapshot = await getDoc(rewardRef);

      const reward = querySnapshot.data();
      setRewardName(reward["reward"]);
      setReward(reward["reward"]);
      setNotes(reward["note"]);
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
    await getRewardInfo(rewardId)
    setRefresh(true);
  }
  useEffect(() => {
    start();
  }, []);

  return (
    <View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={{ alignItems: "center", padding: 15 }}>
            <Text style={styles.whiteTextBold}>{rewardName}</Text>
            
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

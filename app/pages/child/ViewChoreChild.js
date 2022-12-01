import { SafeAreaView, View, Text, Image, StyleSheet, ImageBackground, FlatList, ScrollView, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { doc, getDoc, getDocs, updateDoc, arrayUnion, collection, query, where,addDoc } from 'firebase/firestore';
import moment from 'moment';
import { Overlay } from 'react-native-elements';
import styles from '../../components/colors';
import { pickImage } from '../../../upload-image';
import { async } from '@firebase/util';

export default function ViewChoreChild({ navigation, route }) {
  const { accId, proId, choreId, firestore } = route.params;


  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(moment());
  const [rewardPoint, setReward] = useState(0);
  const [choreName, setChoreName] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");
  const [refeshing, setRefresh] = useState(false);
  const [titleText, setTitleText] = useState("Select image to submit");
  const toggleOverlay = () => {
    if (visible == true) {
      setVisible(false);
    } else {
      setVisible(true);
    }

  };

  let time;

  const getChoreInfo = async (accId, cId) => {
    try {
      const choreRef = doc(firestore, "seed", accId, "chores", cId);
      const querySnapshot = await getDoc(choreRef);

      const chore = querySnapshot.data();
      setChoreName(chore["chore"]);
      setReward(chore["reward"]);
      setNotes(chore["note"]);
      setImage(chore["image"]);
      time = querySnapshot.data()["dueDate"];
      time = moment.unix(time.seconds).utc().local();
      setDate(time);
    } catch (e) {
      console.log(e);
    }
  }

  const pickInfo = async () => {
    try {
      let image = await pickImage(accId + '/choreVerification');
      let now = moment.now();
  
      const vData = {
        profile: proId,
        image: image,
        confirmed: false,
        time: now
      }

      const docRef = await addDoc(collection(firestore, "seed", accId, "chores", choreId, "choreVerification"), vData);
      await updateDoc(doc(firestore, "seed", accId, "chores", choreId));
      toggleOverlay();
    } catch (e) {
      console.log(e);
    }
  }

  const styles2 = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      backgroundColor: "white",
      height: "100%"
    }
  });
  const start = async () => {
    await getChoreInfo(accId, choreId)
  }
  useEffect(() => {
    start();
  }, []);

  return (
    <View style={styles2.container}>
      <View>
        <View style={{ alignItems: "center", padding: 15 }}>

          <Image style={{width: 400, height: 500, borderRadius:'40%'}} source={{uri:`${image}`}}/>

          <Text style={[styles.infoTextTitle, {fontSize: 45}]}>{choreName}</Text>
          <Text style={[styles.infoText, {fontSize:30}]}> Reward: {rewardPoint} </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Text style={[styles.infoText, {fontSize:25}]}> {date.format('M/DD/YYYY')} </Text>
            <Text style={[styles.infoText, {fontSize:25}]}>  |  </Text>
            <Text style={[styles.infoText, {fontSize:25}]}> {date.format('hh:mm A')} </Text>
          </View>
          
        </View>
        
        <View style={{width:'100%', alignContent:'center',borderWidth:'.5%', borderColor:"#2ABAFF", padding:'3%', alignSelf:'center'}}>
            <Text style={[styles.black_smallTextBold, {color:"#2ABAFF"}]}>Notes: </Text>
            <Text style={[styles.infoText, {fontSize:25}]}> {notes} wefhouef</Text>
        </View>

        <Button
          onPress={async () => {
            const ref = doc(firestore, "seed", accId, "chores", choreId);
            const q = await getDoc(ref);
            const querySnapshot = q.data();
            if (querySnapshot["finished"] == true) {
              setTitleText("this request has already been confirmed (Please press anywhere outside of this overlay)");
              setDisabled(true);
            }else{
              setDisabled(false);
            }
            toggleOverlay()
          }}
          title="request to complete"
          color="#2ABAFF"
        />

        <Button
          onPress={async () => { navigation.navigate("HomeScreenChild", { accId, choreId, firestore }) }}
          title="Ok"
          color="#2ABAFF"
        />

        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <Text style={styles.titleText}>{titleText}</Text>
          <Button
            onPress={async () => {
              setDisabled(true);
              await pickInfo();
            
            }}
            title="pick image"
            color="#2ABAFF"
            disabled = {disabled}
          />
        </Overlay>

      </View>
    </View>
  );
}

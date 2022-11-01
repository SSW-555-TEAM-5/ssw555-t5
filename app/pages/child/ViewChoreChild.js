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

  const [visible, setVisible] = useState(false);
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
      let now = moment.now().unix().utc();
  
      const vData = {
        profile: proId,
        image: image,
        confirmed: false,
        time: now
      }

      const docRef = await addDoc(collection(firestore, "seed", accId, "chores", choreId, "choreVerification"), vData);
      await updateDoc(doc(firestore, "seed", accId, "chores", choreId), { pending: arrayUnion(docRef) });
      toggleOverlay();
    } catch (e) {
      console.log(e);
    }
  }




  const start = async () => {
    await getChoreInfo(accId, choreId)
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





          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Text style={styles.white_smallTextReg}> {date.format('M/DD/YYYY')} </Text>
          </View>
          <Text style={styles.whiteTextReg}> Reward: {rewardPoint} </Text>
        </View>


        <View style={styles.locationBox}>
          <View style={{ flexDirection: "column", padding: 10, flex: .5 }}>
            <Text style={styles.black_smallTextBold}>Notes:</Text>
            <Text> {notes} </Text>
          </View>
        </View>

        <Button
          onPress={async () => {


            const ref = collection(firestore, "seed", accId, "chores", choreId, "choreVerification");
            const q = query(ref, where("confirmed", "==", true));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.size > 0) {
              setTitleText("this request has already been confirmed");
            }
            toggleOverlay()


          }}
          title="request to complete"
          color="#841584"
        />

        <Button
          onPress={async () => { navigation.navigate("HomeScreenChild", { accId, choreId, firestore }) }}
          title="Ok"
          color="#841584"
        />

        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>

          <Text style={styles.titleText}>{titleText}</Text>
          <Button
            onPress={async () => {
              pickInfo();

            }}
            title="pick image"
            color="#841584"
          />

        </Overlay>

      </ScrollView>
    </View>
  );
}

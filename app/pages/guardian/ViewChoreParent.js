import { SafeAreaView, View, Text, Image, StyleSheet, ImageBackground, FlatList, ScrollView, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getFirestore, doc, addDoc, collection, query, where, getDocs, getDoc, Timestamp, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import moment from 'moment';
import { Overlay } from 'react-native-elements';
import styles from '../../components/colors';
import { Paragraph, Card } from "react-native-paper";

export default function ViewChoreParent({ navigation, route }) {
  const { accId, proId, choreId, firestore } = route.params;

  const [choreFinished, setChoreFinished] = useState("Chore is not done yet");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(moment());
  const [rewardPoint, setReward] = useState(0);
  const [choreName, setChoreName] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [refeshing, setRefresh] = useState(false);
  //Data format = {id: element,id2:element2}
  const [DATA, setDATA] = useState([]);


  //runs initially to bring up and entries in the database; also is called to refresh flat list
  async function start() {
    try {


      const q2 = doc(firestore, "seed", accId, "chores", choreId);
      const querySnapshot2 = await getDoc(q2);
      const temp = querySnapshot2.data();
      setDATA([]);
      if (temp["finished"] == false) {
        const q = query(collection(firestore, "seed", accId, "chores", choreId, "choreVerification"), where("confirmed", "==", false));
        const querySnapshot = await getDocs(q);
        let arys = [];
        querySnapshot.forEach(async (doc) => {
          let docData = doc.data();
          let name = "";
          var time = moment.unix(docData["time"]).utc().local();
          const profile = collection(firestore, "seed", accId, "Profiles");
          const profileSnapshot = await getDocs(profile);
          profileSnapshot.forEach((docs) => {
            let docsData = docs.data();

            if (docs.id == docData["profile"]) {

              name = docsData["profileName"];
            }
          });

          arys.push({ id: doc.id, name: name, time: time.format('M/DD/YYYY hh:mm A'), imageURL: docData["image"] });

        });
        arys = arys.sort((a, b) => { return moment(a.time).diff(b.time) });

        setDATA(arys);
        setChoreFinished("Chore is not done yet");
      } else {
        setChoreFinished("This chore has been completed");
      }







      await getChoreInfo(accId, choreId);

    } catch (e) {
      console.log(e);
    }

  }
  useEffect(() => {
    start();
  }, []);

  const getChoreInfo = async (accId, cId) => {
    try {
      const choreRef = doc(firestore, "seed", accId, "chores", cId);
      const querySnapshot = await getDoc(choreRef);

      const chore = querySnapshot.data();
      setChoreName(chore["chore"]);
      setReward(chore["reward"]);
      setNotes(chore["note"]);
      let times = querySnapshot.data()["dueDate"];
      times = moment.unix(times.seconds).utc().local();
      setDate(times);
    } catch (e) {
      console.log(e);
    }
  }

  const confirmChore = async (id) => {
    const choreVRef = doc(firestore, "seed", accId, "chores", choreId, "choreVerification", id);
    await updateDoc(choreVRef, { confirmed: true });
    const choreRef = doc(firestore, "seed", accId, "chores", choreId);
    const choreData = (await getDoc(choreRef)).data();
    await updateDoc(choreRef, { finished: true });
    const querySnapshot = await getDoc(choreVRef);
    const choreV = querySnapshot.data();
    const proRef = doc(firestore, "seed", accId, "Profiles", choreV["profile"]);
    const profileD = (await getDoc(proRef)).data();
    await updateDoc(proRef, { totalPoint: parseInt(profileD["totalPoint"]) + parseInt(choreData["reward"]) });
    handleRefresh();
  }
  const declineChore = async (id) => {
    const choreVRef = doc(firestore, "seed", accId, "chores", choreId, "choreVerification", id);
    await updateDoc(choreVRef, { confirmed: true });
    handleRefresh();
  }




  const handleRefresh = async () => {
    start();
    setRefresh(false);
  }
  return (
    <View style={{backgroundColor: "white", flex:1}}>
      <SafeAreaView>
        <View style={{ alignItems: "center", padding: 15 }}>
          <View style={{ alignItems: "center", padding: 15 }}>
            <Text style={[styles.infoTextTitle, {fontSize: 45}]}>{choreName}</Text>
            <Text style={[styles.infoText, {fontSize: 25}]}>{choreFinished}</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Text style={[styles.infoText, {fontSize:18}]}> {date.format('M/DD/YYYY')} </Text>
            <Text style={[styles.infoText, {fontSize:18}]}>  |  </Text>
            <Text style={[styles.infoText, {fontSize:18}]}> {date.format('hh:mm A')} </Text>
          </View>

          <View style={{ alignItems: "center", padding: 5 }}>
          <Text style={[styles.infoText, {fontSize:18}]}> Reward: {rewardPoint} </Text>
          </View>

        </View>

        {/* <View >
          <View style={{ flexDirection: "column", padding: 10, flex: .5 }}>
            <Text style={styles.black_smallTextBold}>Notes:</Text>
            <Text> {notes} </Text>
          </View>
        </View> */}
        <SafeAreaView>
          <FlatList
            keyExtractor={(item) => item.id}
            data={DATA}
            refreshing={refeshing}
            onRefresh={handleRefresh}
            renderItem={({ item }) => (

              <ScrollView style={{ width: '100%', padding: 10 }}>


                {/* <Image source={{ uri: item.imageURL }} style={{ height: '100%', width: '100%', borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }} />


                <View style={{ flexDirection: 'column', padding: 10 }}>
                  <Text style={styles.infoTextTitle}>{item.name}</Text>
                  <Text style={styles.infoTextTitle}>{item.time}</Text>
                </View> */}
                <Card>
                    <Card.Cover source={{ uri: item.imageURL }}/>
                    <Card.Title title={item.name} titleStyle={styles.infoTextTitle} />
                    <Card.Content>
                        <Paragraph style={styles.infoText}>Time: {item.time}</Paragraph>
                    </Card.Content>
                </Card>

                <View style={{borderWidth:2, backgroundColor: "#2ABAFF", borderRadius:30, padding:'1%', borderColor:"#2ABAFF", marginHorizontal:'30%'}}>
                  <Button
                    onPress={async () => { confirmChore(item.id) }}
                    title="accept"
                    color="white"
                  />
                </View>

                <View style={{borderWidth:2, backgroundColor: "#2ABAFF", borderRadius:30, padding:'1%', borderColor:"#2ABAFF", marginHorizontal:'30%'}}>
                  <Button
                    onPress={async () => { declineChore(item.id) }}
                    title="decline"
                    color="white"
                  />
                </View>

              </ScrollView>
            )}
          />
        </SafeAreaView>





        <Button
          onPress={async () => { navigation.navigate("HomeScreenParent", { accId, choreId, firestore }) }}
          title="Ok"
          color="#841584"
        />


      </SafeAreaView>
    </View>


  );
}

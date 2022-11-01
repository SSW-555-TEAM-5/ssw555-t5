import { SafeAreaView, View, Text, Image, StyleSheet, ImageBackground, FlatList, ScrollView, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getFirestore, doc, addDoc, collection, query, where, getDocs, getDoc, Timestamp } from 'firebase/firestore';
import moment from 'moment';
import { Overlay } from 'react-native-elements';
import styles from '../../components/colors';


export default function ViewChoreParent({ navigation, route }) {
  const { accId, proId, choreId, firestore } = route.params;


  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(moment());
  const [rewardPoint, setReward] = useState(0);
  const [choreName, setChoreName] = useState("");

  const [refeshing, setRefresh] = useState(false);
  //Data format = {id: element,id2:element2}
  const [DATA, setDATA] = useState([]);


  //runs initially to bring up and entries in the database; also is called to refresh flat list
  async function start() {
    try {

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
      await getChoreInfo(accId, choreId)

    } catch (e) {
      console.log(e);
    }

  }

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




  useEffect(() => {
    start();
  }, []);


  const handleRefresh = async () => {
    start();
    setRefresh(false);
  }
  return (
    <View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={DATA}
          refreshing={refeshing}
          onRefresh={handleRefresh}
          renderItem={({ item }) => (

            <ScrollView style={{ width: '100%', padding: 10 }}>

            
              <View>
                <Image source={{ uri: item.imageURL }} style={{ height: '100%', width: '100%', borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }} />
              </View>
              <View style={{ flexDirection: 'column', padding: 10 }}>
                <Text style={styles.infoTextTitle}>{item.name}</Text>
                <Text style={styles.infoTextTitle}>{item.time}</Text>
              </View>


            </ScrollView>
          )}
        />
        <View style={{ alignItems: "center", padding: 15 }}>
          <Text style={styles.whiteTextBold}>{choreName}</Text>

          <Text style={styles.whiteTextReg}>{date.format('hh:mm A')} </Text>





          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Text style={styles.white_smallTextReg}> {date.format('M/DD/YYYY')} </Text>
          </View>
          <Text style={styles.whiteTextReg}> Reward: {rewardPoint} </Text>
        </View>


        <View >
          <View style={{ flexDirection: "column", padding: 10, flex: .5 }}>
            <Text style={styles.black_smallTextBold}>Notes:</Text>
            <Text> {notes} </Text>
          </View>
        </View>



        <Button
          onPress={async () => { navigation.navigate("HomeScreenParent", { accId, choreId, firestore }) }}
          title="Ok"
          color="#841584"
        />

      </ScrollView>
    </View>
  );
}

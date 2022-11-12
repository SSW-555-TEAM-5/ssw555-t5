import { SafeAreaView, View, Text, Image, StyleSheet, ImageBackground, FlatList, ScrollView, Button, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getFirestore, doc, addDoc, collection, query, where, getDocs, getDoc, Timestamp, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import moment from 'moment';
import { Overlay } from 'react-native-elements';
import styles from '../../components/colors';

export default function ViewRewardParent({ navigation, route }) {
  const { firestore, accId } = route.params;


  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(moment());
  const [rewardPoint, setReward] = useState(0);
  const [rewardName, setRewardName] = useState("");

  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState("");
  const [refeshing, setRefresh] = useState(false);

  //Data format = {id: element,id2:element2}
  const [DATA, setDATA] = useState([]);


  const handleRefresh = async () => {
    await start();
    setRefresh(false);
  }
  const start = async () => {
    try {
      const q = collection(firestore, "seed", accId, "rewards");
      const querySnapshot = await getDocs(q);
      let arys = [];
      querySnapshot.forEach((doc) => {
        let docData = doc.data();
        let claim = "Not Claimed";
        if (docData["claimed"]) {
          claim = "Claimed";
        }
        let active = "Not Active";
        if (docData["active"]) {
          active = "Active";
        }
        arys.push({ id: doc.id, name: docData["name"], imageURL: docData["imageURL"], points: docData["points"], referenceURL: docData["referenceURL"], claimed: claim, active: active });
      });
      setDATA(arys);

    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    start();
  }, []);

  return (

    <SafeAreaView>
      <Text>Acitve Rewards</Text>
      <FlatList
        keyExtractor={(item) => item.id}
        data={DATA}
        refreshing={refeshing}
        onRefresh={handleRefresh}
        renderItem={({ item }) => (
          <ScrollView style={{ width: '100%', padding: 10 }}>

            <TouchableOpacity style={{ flexDirection: 'row', flexWrap: 'wrap', width: "100%", height: '100%', borderWidth: .5, borderRadius: 8 }}>
              <View style={{ flex: .5 }}>
                <Image source={{ uri: item.imageURL }} style={{ height: '100%', width: '100%', borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }} />
              </View>
              <View style={{ flexDirection: 'column', padding: 10 }}>
                <Text style={styles.infoTextTitle}>{item.name}</Text>
                <Text style={styles.infoTextTitle}>{item.claimed}</Text>
                <Text style={styles.infoTextTitle}>URL: {item.referenceURL}</Text>
                <Text style={styles.infoTextTitle}>Points: {item.points}</Text>
                <Text style={styles.infoTextTitle}>{item.active}</Text>
              </View>
              <Button
                onPress={async () => {
                  const q = doc(firestore, "seed", accId, "rewards",item.id);
                  await updateDoc(q,{active: true});
                }}
                title="Activate"
                color="#841584"
              />
              <Button
                onPress={async () => {
                  const q = doc(firestore, "seed", accId, "rewards",item.id);
                  await updateDoc(q,{active: false});
                }}
                title="Deactivate"
                color="#841584"
              />
            </TouchableOpacity>

          </ScrollView>
        )}
      />


    </SafeAreaView>

  );
}

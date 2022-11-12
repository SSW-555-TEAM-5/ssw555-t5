import { SafeAreaView, View, Text, Image, StyleSheet, ImageBackground, FlatList, ScrollView, Button, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getFirestore, doc, addDoc, collection, query, where, getDocs, getDoc, Timestamp, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import moment from 'moment';
import { Overlay } from 'react-native-elements';
import styles from '../../components/colors';

export default function ViewRewardChild({ navigation, route }) {
  const { firestore, accId, docid } = route.params;

  const [visible, setVisible] = useState(false);
  const [refeshing, setRefresh] = useState(false);
  const [points, setPoints] = useState(0);
  const [message, setmsg] = useState("Cannot be claimed");
  //Data format = {id: element,id2:element2}
  const [DATA, setDATA] = useState([]);

  const toggleOverlay = () => {
    handleRefresh();
    setVisible(false);
  };
  const handleRefresh = async () => {
    await start();
    setRefresh(false);
  }


  const start = async () => {
    try {
      const pro = doc(firestore, "seed", accId, "Profiles", docid);
      const ref = await getDoc(pro);
      let data = ref.data();
      setPoints(data["totalPoint"]);

      const q = query(collection(firestore, "seed", accId, "rewards"), where("active", "==", true), where("claimed", "==", false));
      const querySnapshot = await getDocs(q);
      let arys = [];
      querySnapshot.forEach((doc) => {
        let docData = doc.data();


        arys.push({ id: doc.id, name: docData["name"], imageURL: docData["imageURL"], points: docData["points"], referenceURL: docData["referenceURL"] });
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
      <Text>Total Points: {points}</Text>

      <FlatList
        keyExtractor={(item) => item.id}
        data={DATA}
        refreshing={refeshing}
        onRefresh={handleRefresh}
        renderItem={({ item }) => (
          <ScrollView style={{ width: '100%', padding: 10 }}>

            <TouchableOpacity style={{ flexDirection: 'row', flexWrap: 'wrap', width: "100%", height: '100%', borderWidth: .5, borderRadius: 8 }}>
              <View style={{ flex: .5 }}>
                <Image source={{ uri: item.imageURL }} style={{ height: '100%', width: '100%' }} />
              </View>

              <View style={{ flexDirection: 'column', padding: 10 }}>
                <Text style={styles.infoTextTitle}>{item.name}</Text>

                <Text style={styles.infoTextTitle}>URL: {item.referenceURL}</Text>
                <Text style={styles.infoTextTitle}>Points: {item.points}</Text>

              </View>
              <Button
                onPress={async () => {
                  const pro = doc(firestore, "seed", accId, "Profiles", docid);
                  if (points < item.points) {
                    setVisible(true);
                  } else {
                    await updateDoc(pro, { totalPoint: points - item.points });
                    const q = doc(firestore, "seed", accId, "rewards", item.id);
                    await updateDoc(q, { claimed: true });
                    handleRefresh();
                  }

                }}
                title="claim"
                color="#841584"
              />
            </TouchableOpacity>

          </ScrollView>
        )}
      />

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View >
          <Text>{message}</Text>
          <Text>Press anywhere to go back</Text>
        </View>
      </Overlay>
    </SafeAreaView>

  );
}

import { SafeAreaView, View, Text, Image, StyleSheet, ImageBackground, FlatList, ScrollView, Button, TouchableOpacity, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getFirestore, doc, addDoc, collection, query, where, getDocs, getDoc, Timestamp, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import moment from 'moment';
import { Overlay } from 'react-native-elements';
import styles from '../../components/colors';
import { Card, Paragraph } from 'react-native-paper';
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

      <Text style={{fontSize: 30, textAlign:'center', color: "#2ABAFF"}}>Active Rewards</Text>
      <Text style= {{fontStyle:"italic", textAlign:'center', fontSize: 20, color:'gray', paddingBottom:15}}>Total Points: {points}</Text>

      <FlatList
        keyExtractor={(item) => item.id}
        data={DATA}
        refreshing={refeshing}
        onRefresh={handleRefresh}
        renderItem={({ item }) => (
          <ScrollView style={{ width: '100%', padding: 10 }}>

            <TouchableOpacity onPress = {() => Linking.canOpenURL(item.imageURL).then(() => {Linking.openURL(item.imageURL);})}>
              {/* <View style={{ flex: .5 }}>
                <Image source={{ uri: item.imageURL }} style={{ height: '100%', width: '100%' }} />
              </View>

              <View style={{ flexDirection: 'column', padding: 10 }}>
                <Text style={styles.infoTextTitle}>{item.name}</Text>

                <Text style={styles.infoTextTitle}>URL: {item.referenceURL}</Text>
                <Text style={styles.infoTextTitle}>Points: {item.points}</Text>

              </View> */}

              <Card>
                <Card.Cover source={{ uri: item.imageURL }}/>
                <Card.Title title={item.name} titleStyle={styles.infoTextTitle} />
                <Card.Content>
                  <Paragraph style={styles.infoText}>Points: {item.points}</Paragraph>
                </Card.Content>
              </Card>

            <View style={{borderWidth:2, backgroundColor: "#2ABAFF", borderRadius:30, padding:'1%', borderColor:"#2ABAFF", marginHorizontal:'30%'}}>
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
                color="white"
                
              />
            </View>
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

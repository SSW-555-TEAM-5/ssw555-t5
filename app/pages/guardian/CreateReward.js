import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet, ScrollView, Button, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Overlay } from 'react-native-elements';
import { addDoc, collection } from 'firebase/firestore';
import { pickImage } from '../../../upload-image';
import styles from '../../components/colors';



export default function CreateReward({ navigation, route }) {
    const [visible, setVisible] = useState(false);
    const { firestore, accId } = route.params;
    const [name, setName] = useState("");
    const [ref, setRef] = useState("");
    const [rewardPoint, setReward] = useState(0);
    const [imageURL, setImageURL] = useState("https://firebasestorage.googleapis.com/v0/b/ssw555-t5-7f6c3.appspot.com/o/avatars%2Freward.png?alt=media&token=068660bf-d1f0-4411-aa9c-a40e11e8442c");


    const hostReward = async (rewardName, rewardPoint, image, reference) => {

        try {

            const data = { name: rewardName, points: rewardPoint, imageURL: image, referenceURL: reference, active: true, claimed: false};

            const docRef = await addDoc(collection(firestore, "seed", accId, "rewards"), data);

            return;
        } catch (e) {
            console.log(e);
            return e
        }
    }





    const toggleOverlay = () => {
        setVisible(true);
    };

    const hostEv = async () => {
        await hostReward(name, rewardPoint, imageURL, ref);
        toggleOverlay();
    };

    return (
        <View style={{backgroundColor: "white", flex:1}}>
            <SafeAreaView style={styles.container}>
                <ScrollView>

                    <View style={{paddingBottom:"5%"}}>
                        <Text style = {[styles.infoTextTitle,{alignSelf:'center', fontSize:35}]}>Create Reward</Text>
                        <Text style={{alignSelf:'center'}}>___________________________________</Text>
                    </View>

                    <View style={{paddingBottom:"10%"}}>
                        <Text style = {styles.textHeader}>Name</Text>
                        <View style = {styles.textInput}>
                            <TextInput
                                onChangeText={setName}
                                placeholder={"toy car"}

                            />
                        </View>
                    </View>
                    
                    <View style={{paddingBottom:"10%"}}>
                        <Text style = {styles.textHeader}>Points</Text>
                        <View style = {styles.textInput}>
                            <TextInput
                                onChangeText={setReward}
                                placeholder={"5"}
                            />
                        </View>
                    </View>

                    <View style={{paddingBottom:"10%"}}>
                        <Text style = {styles.textHeader}>URL Reference</Text>
                        <View style = {styles.textInput}>
                            <TextInput
                                onChangeText={setRef}
                                placeholder={"www.amazon.com"}
                            />
                        </View>
                    </View>


                    <Button
                            onPress={async () => {
                                let image = await pickImage(accId+'/avatars');
                                if (image != ""){
                                    setAvatarURL(image);
                                }
                            }}
                            title="Upload Picture"
                            color="#2ABAFF"
                        />

                    <Button
                        onPress={async () => { hostEv() }}
                        title="Create reward"
                        color="#2ABAFF"
                    />
                    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>

                        <Text>Reward Created!</Text>
                        <Button
                            onPress={async () => { navigation.goBack()}}
                            title="Ok"
                            color="#2ABAFF"
                        />
                    </Overlay>



                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

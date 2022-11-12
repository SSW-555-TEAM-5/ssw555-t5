import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet, ScrollView, Button, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Overlay } from 'react-native-elements';
import { addDoc, collection } from 'firebase/firestore';
import { pickImage } from '../../../upload-image';




export default function CreateReward({ navigation, route }) {
    const [visible, setVisible] = useState(false);
    const { firestore, accId } = route.params;
    const [name, setName] = useState("");
    const [ref, setRef] = useState("");
    const [rewardPoint, setReward] = useState(0);
    const [imageURL, setImageURL] = useState("");


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
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView>
                <Text>Reward Name</Text>
                <TextInput
                    onChangeText={setName}
                    placeholder={"toy car"}

                />

                <Text>Rewards(Points)</Text>
                <TextInput
                    onChangeText={setReward}
                    placeholder={"5"}
                />


                <Text>reference URL</Text>
                <TextInput
                    onChangeText={setRef}
                    placeholder={"www.amazon.com"}
                />


                <Button
                    onPress={async () => {
                        let image = await pickImage(accId+'/rewards');
                        setImageURL(image);
                    }}
                    title="Upload picture for Reward reference(optional)"
                    color="#841584"
                />

                <Button
                    onPress={async () => { hostEv() }}
                    title="Create reward"
                    color="#841584"
                />
                <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>

                    <Text>Reward Created!</Text>
                    <Button
                        onPress={async () => { navigation.goBack()}}
                        title="Ok"
                        color="#841584"
                    />
                </Overlay>



            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        alignContent: 'center',
        alignItems: "center",
        padding: 10,
        width: '100%',
    },


}
);
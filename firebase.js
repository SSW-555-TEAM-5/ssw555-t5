// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, addDoc, collection, query, where, getDocs, getDoc, Timestamp,setDoc  } from 'firebase/firestore';
import Constants from "expo-constants";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCz1itc7JT1NFYX1-X-I07ujw5jn_LGelc",
    authDomain: "ssw555-t5-7f6c3.firebaseapp.com",
    projectId: "ssw555-t5-7f6c3",
    storageBucket: "ssw555-t5-7f6c3.appspot.com",
    messagingSenderId: "664769199106",
    appId: "1:664769199106:web:809f61a64f57ee15b73b1b"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

// AUTHENTICATION // ---------------------------------------------------------
let user = auth.currentUser;

export const signUpWithEmail = async (fName, lName, email, password, avatarURL, guardianName, guardianPin) => {
    try {
        let result = await createUserWithEmailAndPassword(auth, email, password);
        user = result.user;
        await updateProfile(user, {
            displayName: fName + " " + lName,
        });
        return await addNewUser(fName, lName, email, avatarURL, guardianName, guardianPin);
    } catch (e) {
        console.log(e);
        return e;
    }
}

export const logInWithEmail = async (email, password) => {
    try {
        let result = await signInWithEmailAndPassword(auth, email, password);
        user = result.user;
        return 'success'
    } catch (e) {
        console.log(e);
        return e;
    }
}

export const logOut = async () => {
    try {
        await signOut(auth);
        user = auth.currentUser;
        return 'success'
    } catch (e) {
        console.log(e);
    }
}

// FIRESTORE // --------------------------------------------------------------
const addNewUser = async (fName, lName, email, avatarURL, guardianName, guardianPin) => {
    try {
        const userData = {
            first_name: fName,
            last_name: lName,
            email: email,
            avatar: avatarURL
        }

        const guardianData = {
            profileName: guardianName,
            pin: guardianPin,
            status: true
        }
        const docRef = await addDoc(collection(firestore, "seed",), userData);
        
        const docG = await collection(docRef,"Profiles");
        addDoc(docG,guardianData);
        return docRef.id;
    } catch (e) {
        console.log(e);
    }
}

// export const getFirstName = async () => {
//     try {
//         let firstName = 'Temp';
//         const q = query(
//             collection(firestore, "users"),
//             where("email", "==", user?.email)
//         );
//         const querySnapshot = await getDocs(q);
//         querySnapshot.forEach((doc) => {
//             // console.log(doc.data()['first_name'])
//             firstName = doc.data()['first_name'];
//         });
//         return firstName;

//     } catch (e) {
//         console.log(e);
//     }
// }

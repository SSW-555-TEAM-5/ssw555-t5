import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "uuid";

let folder = '';

export const pickImage = async (folderPath) => {
    folder = folderPath;
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
    });
    return handleImpagePicked(pickerResult);
};

const handleImpagePicked = async (pickerResult) => {
    var state = null;
    try {
        state = { uploading: true };

        if (!pickerResult.cancelled) {
            const uploadUrl = await uploadImageAsync(pickerResult.uri);
            state = { image: uploadUrl };
            return uploadUrl;
        }
    } catch (e) {
        console.log(e);
        alert("Upload failed, sorry :(");
    } finally {
        state = { uploading: false };
    }
};

const uploadImageAsync = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });

    const fileRef = ref(getStorage(), folder + '/' + uuid.v4());
    await uploadBytes(fileRef, blob);

    return await getDownloadURL(fileRef);
};

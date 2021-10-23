// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, doc, getDocs, getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDQoQ7Ji0neXtx0uDo2So5tTlJswa7W-4k",
    authDomain: "sarmackatarcza.firebaseapp.com",
    projectId: "sarmackatarcza",
    storageBucket: "sarmackatarcza.appspot.com",
    messagingSenderId: "535788865907",
    appId: "1:535788865907:web:6f05ca00449525b4041d06",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const handler = async (event) => {
    db = getFirestore(app)
    const certificates = await getDocs(collection(db, 'certificates')),
        //certs = doc => !event.queryStringParameters.group || event.queryStringParameters.group == doc.data().group,
        certs = certificates.docs
            // .filter(certs)
            .map(doc => doc.data())
    return {
        statusCode: 200,
        body: JSON.stringify(certs),
    }
}

export { handler };


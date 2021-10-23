const NodeRSA = require('node-rsa');
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, doc, getDocs, getFirestore } from 'firebase/firestore/lite';

// verify / POST {
//     id: ingpl/+48123456789
//     signature: base64 podspis
//     text: sdsadfadsfdsafdsafadf
// } --> { valid invalid}

// key / POST {
//     id: ingpl
//     public: key
// }

// example random keypair
const public_key = `
-----BEGIN RSA PUBLIC KEY-----
MGgCYQCOduF0b+iQxt8612zIFR/1hYpUzXa56kGtDnL2u9fJd4biRsNrJAjdNcBs
oHgMpvmZtnzk6INwfnynhE/YGpJoMWP9g/g428oTD2ZrUSGG771JY1tGRqSUF0Gq
qnYcJSMCAwEAAQ==
-----END RSA PUBLIC KEY-----
`;

const private_key = `
-----BEGIN RSA PRIVATE KEY-----
MIIBywIBAAJhAI524XRv6JDG3zrXbMgVH/WFilTNdrnqQa0Ocva718l3huJGw2sk
CN01wGygeAym+Zm2fOTog3B+fKeET9gakmgxY/2D+DjbyhMPZmtRIYbvvUljW0ZG
pJQXQaqqdhwlIwIDAQABAmAtg0spkKrivbYJLVNiZGVOYbg8uVspr+4FZG1T59Tb
VyUvWt4Jd3yhdw+fZHCV0i3ERpinLu4yv8OSNoIfr5AYsxjRTyPM+RQrUa9lfJ9y
RcDC90+qys9PitSQG/6mDokCMQDvcbbkRdDQCFifu5qJbEe1DhYTGwaIViZ1DwTC
0RRWVGwxeUYbdBk+Oz26a3u5/N0CMQCYUJLSge/BGKLAwWeNbzbs3CXwq7cbm+QM
qLdbMysAPvCvit/RpNmiQMQQhNWzif8CMHz++97Go282LC2WneHHaNeXduaaYRqi
/oh1QqMAyoEWqTRafsKuJM9b1amPmpNI8QIxAIoWwoXG966Av00yCsfXRFyJWnxP
sbp+Isq3S0SLpziZ12vO5AwVAJpxTVAMnhIf0QIxAKyPj5npVWFvPK3H0URhgnpU
JGajs0gylHCcyqsIcPRG00LylfridYjoFyQdwtJoBg==
-----END RSA PRIVATE KEY-----
`

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
    if (event.httpMethod === 'POST') {
        try {
            console.log(event.body)
            var request = JSON.parse(event.body)
            console.log(request)

            db = getFirestore(app)
            const certificates = await getDocs(collection(db, 'certificates')),
            id_matches = doc => request.id == doc.id
            const key = certificates.docs
                .map(doc => doc.data())
                .find(id_matches)
            const key_public = new NodeRSA().importKey(key.public_key);
            const verification = key_public.verify(request.text, request.signature, "utf8", "base64");
            console.log('key size, verified, signature, s lenght', verification, request.signature.length, request.signature)
            return {
                statusCode: 200,
                body: JSON.stringify({ "message_valid": verification})
            }
        } catch (error) {
            console.log(error)
            return {statusCode: 500, body: error.toString()}
        }
    }
}

export {handler};
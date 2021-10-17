const NodeRSA = require('node-rsa');

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

const handler = async (event) => {
    if (event.httpMethod === 'GET') {
        try {
            var text = "Super tajny sms"

            var size = 768
            try {
                const key_private = new NodeRSA().importKey(private_key);
                const key_public = new NodeRSA().importKey(public_key);
                const signature = key_private.sign(text, "base64");
                const verification = key_public.verify(text, signature, "utf8", "base64");
                console.log('key size, verified, signature, s lenght', size, verification, signature.length, signature)
            } catch (error) {
                console.log(error)
            }

            var t = "", encrypted;
            console.log("last t: ", t)
            const decrypted = key.decrypt(encrypted, 'utf8');
            console.log('decrypted: ', decrypted);
            return {
                statusCode: 200,
            }
        } catch (error) {
            return {statusCode: 500, body: error.toString()}
        }
    }
}

export {handler};
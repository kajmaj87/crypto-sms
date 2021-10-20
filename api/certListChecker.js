const certList = require('../resources/certList.json');

const handler = async (event) => {
    if (event.httpMethod === 'POST') {
        try {
            const request = JSON.parse(event.body);
            let certDomainList = JSON.parse(JSON.stringify(certList)).map(domain => domain.DomainAddress);
            const isLinkInMessage = certDomainList.find(domain => request.text.includes(domain));
            return {
                statusCode: 200,
                body: JSON.stringify({ "message_valid": !!isLinkInMessage})
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: error.toString()
            }
        }

    }
}

export {handler};

import axios from "axios";

const certList = require('../resources/certList.json');
const url = 'https://hole.cert.pl/domains/domains.json';

const handler = async (event) => {
    if (event.httpMethod === 'POST') {
        try {
            const request = JSON.parse(event.body);
            let certDomainList = JSON.parse(JSON.stringify(certList)).map(domain => domain.DomainAddress);
            const matched_links = certDomainList.filter(domain => request.text.includes(domain))
            return {
                statusCode: 200,
                body: JSON.stringify({
                    "contains_malicious_link": matched_links.length > 0,
                    "malicious_links": matched_links
                })
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: error.toString()
            }
        }

    }
    if (event.httpMethod === 'GET') {
        const response = await axios.get(url);
        return {
            statusCode: response.status,
            body: JSON.stringify(response.data)
        }
    }
}

export { handler };
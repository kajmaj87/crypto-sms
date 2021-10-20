import axios from "axios";

const url = 'https://hole.cert.pl/domains/domains.json';

const handler = async () => {
    const response = await axios.get(url);
        return {
            statusCode: response.status,
            body: JSON.stringify(response.data)
        }
}
export {handler};
import axios from 'axios';

export async function updateStatus(req, res) {
    try {
        const url = 'http://192.168.100.123/S'

        console.log('\n--------------------------------------------------');
        console.log('Recebido requisição:\n')
        console.log(new Date().toISOString() + 'Url: ' + url)
        console.log('----------------------end-------------------------\n');
        const response = await axios.get(url);
        const data = response.data;
        if (!data)
            return res.status(500).send({ statusArduino: 'off' });

        return res.status(200).send({ status: data });

    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
}
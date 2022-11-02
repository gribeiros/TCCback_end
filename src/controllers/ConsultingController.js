import axios from 'axios';
import { waterLevelSocket } from '../util/SoketRequire.js'


export async function waterLevel(req, res) {
    console.log("\nIniciando consulta na API:");
    try {
        const response = await axios.get('http://192.168.100.123/W');
        const data = response.data;

        console.log('--------------------------------------------------');
        console.log(data);
        console.log('----------------------end-------------------------\n');
        return res.status(200).send(data);
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
}


export async function serviceSocket(req, res) {
    try {
        const { status } = req.body;

        if (status === undefined || status === null || status === '')
            return res.status(412).send({ error: 'status not be null' });

        console.log('\n--------------------------------------------------');
        console.log('Recebido requisição:\n')
        console.error(new Date().toISOString() + ' - ' + 'Parametros: ' + status)
        console.log('----------------------end-------------------------\n');
        const response = await axios.get('http://192.168.100.123/W');
        const data = response.data;
        if (!data)
            return res.status(500).send({ statusArduino: 'off' });
        await waterLevelSocket(status, data);

        return res.status(200).send({ status: true });
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
}
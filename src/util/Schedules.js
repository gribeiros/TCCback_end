import cron from 'node-cron';
import axios from 'axios';
import { emit } from '../util/SoketEmit.js'



export function arduinoSocket() {
    cron.schedule('*/5 * * * * *', async () => {
        try {
            const job = 'arduinoStatus'
            const response = await axios.get('http://192.168.100.123/S');
            const data = response.data;

            console.log('Executando schedule:')
            console.log('--------------------------------------------------');
            console.log(new Date().toLocaleTimeString() + ' - ' + 'Job: ' + job + ' - ' + 'Data: ' + JSON.stringify(data));
            await emit(job, { status: data });
            console.log('----------------------end-------------------------\n');

        } catch (error) {
            console.error(error)
        }
    })
}
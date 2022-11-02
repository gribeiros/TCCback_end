import { io } from '../app.js'

export async function waterLevelSocket(status,data) {
    try {
        io.emit(status, data);
    } catch (e) {
        console.error(e);
    }
}
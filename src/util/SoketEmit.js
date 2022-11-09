import { io } from '../app.js'

export async function emit(port, data) {
    try {
        io.emit(port, data);
    } catch (e) {
        console.error(e);
    }
}
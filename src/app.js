import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { createServer } from 'http';
import route from './routes.js';
import { Server } from 'socket.io';
import { arduinoSocket } from './util/Schedules.js'

const app = express();
const serverHttp = createServer(app);

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

const io = new Server(serverHttp, {
  cors: {
    origin: "*",
    methods: ["GET"]
  }
});

io.on("connection", function (socket) {

  console.log("Usuário " + socket.id + " conectado.");

  socket.on("disconnect", (reason) => {
    console.log("Usuário " + socket.id + " desconectado.");
  });

});

export { io };

app.get('/', async (req, res) => { res.status(200).json({ sever_status: 'on' }) });
app.use(route);

const PORT = process.env.PORT || 8080;

serverHttp.listen(PORT, async () => {
  console.log(`Running in http://localhost:${PORT}/`);
  arduinoSocket();
})
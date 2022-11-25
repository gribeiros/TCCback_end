import express, { json, urlencoded } from "express";
import cors from "cors";
import { createServer } from "http";
import route from "./routes.js";
import { Server } from "socket.io";
import { arduinoSocket } from "./util/Schedules.js";
import log4js from "./util/Logger.js";

const logger = log4js.getLogger('App')

const app = express();
const serverHttp = createServer(app);

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

const io = new Server(serverHttp, {
  cors: {
    origin: "*",
    methods: ["GET"],
  },
});

io.on("connection", function (socket) {
  logger.debug("Usuário " + socket.id + " conectado.");

  socket.on("disconnect", (reason) => {
    logger.debug("Usuário " + socket.id + " desconectado.");
  });
});

export { io };

app.get("/", async (req, res) => {
  res.status(200).json({ sever_status: "on" });
});
app.use(route);

const PORT = process.env.PORT || 8080;

serverHttp.listen(PORT, async () => {
  logger.info(`Running in http://localhost:${PORT}/\n`);
  arduinoSocket();
});

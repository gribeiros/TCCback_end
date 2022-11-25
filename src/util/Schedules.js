import cron from "node-cron";
import axios from "axios";
import { emit } from "../util/SoketEmit.js";
import log4js from "./Logger.js";

const logger = log4js.getLogger("Schedules");

export function arduinoSocket() {
  cron.schedule("*/5 * * * * *", async () => {
    try {
      const job = "arduinoStatus";
      //const response = await axios.get('http://192.168.100.123/S');
      //const data = response.data;
      const data = { waterLevel: 450, flowLevel: 0 };
      logger.info("Executando tarefa " + job + " ");
      logger.debug("Dados: " + JSON.stringify(data));
      await emit(job, { status: data });
    } catch (error) {
      logger.error(error);
    }
  });
}

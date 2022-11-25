import { io } from "../app.js";
import log4js from "./Logger.js";

const logger = log4js.getLogger("SoketEmit");

export async function emit(port, data) {
  try {
    io.emit(port, data);
  } catch (e) {
    logger.error(e);
  }
}

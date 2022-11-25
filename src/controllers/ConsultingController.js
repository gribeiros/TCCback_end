import axios from "axios";
import log4js from "../util/Logger.js";

const logger = log4js.getLogger("ConsultingController");

export async function updateStatus(req, res) {
  try {
    const url = "http://192.168.100.123/S";

    logger.debug("Consultando a Api " + url);
    //const response = await axios.get(url);
    //const data = response.data;

    const data = { waterLevel: 450, flowLevel: 5.89 };
    if (!data) return res.status(500).send({ statusArduino: "off" });

    return res.status(200).send({ status: data });
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
}

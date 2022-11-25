import log4js from "log4js";

log4js.configure({
  appenders: {
    out: { type: "stdout" },
    app: { type: "file", filename: "src/logs/app.log" },
  },
  categories: {
    default: {
      appenders: ["app", "out"],
      level: "debug",
    },
  },
});

export default log4js;

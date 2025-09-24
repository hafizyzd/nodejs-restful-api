import winston from "winston";


export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({}),
    // You can add more transports like File, HTTP, etc.
  ],
});
import pino from "pino";


const logger = pino({
    transport: {
        targets: [
            {
                target: "pino/file",
                options: {
                    mkdir: true,
                    destination: './src/logger/app.log',
                }
            },
            {
                target: "pino-pretty",
                options: {
                    translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
                    colorize: true,
                    ignore: "pid,hostname",
                }
            }
        ]
    },
});


export default logger;

import logger from '../../logger/logger';


async function testConnection(db) {
    try {
        const conn = await db.connect(); // try to connect
        conn.done();                     // success, release connection
        logger.info(`Connection to database successful, PG server version: ${conn.client.serverVersion}`);
    } catch (err) {
        logger.error(err, 'Error connecting to database');
    }
}

export default testConnection; 

import logger from '../../../logger/logger'
import { db, pgp } from '../../connection/db'
import fs from 'fs'

// read and parse the questions.json file
const questions = JSON.parse(fs.readFileSync('./src/db/sql/setup/questions.json', 'utf8'))

const cs = new pgp.helpers.ColumnSet(['topic_id', 'content', 'correct_answers', 'misleading_answers', 'question_type', 'difficulty'], { table: 'questions' });
const query = pgp.helpers.insert(questions, cs) + ' ON CONFLICT DO NOTHING';


function checkDatabaseAndInsert() {
    db.connect()
        .then(obj => {
            obj.done(); // success, release the connection;
            // Insert the questions
            db.none(query) 
                .then(() => {
                    logger.info('Questions have been successfuly inserted')
                })
                .catch(error => {
                    logger.error('Error inserting questions', error)
                })
        })
        .catch(error => {
            logger.error('Error connecting to the database, retrying in 5 seconds...', error)
            // Wait for 5 seconds and try again
            setTimeout(checkDatabaseAndInsert, 5000);
        });
}

// Start the process
checkDatabaseAndInsert();

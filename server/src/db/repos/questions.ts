import queries from "../sql/sqlQueries.js";
import { IDatabase, IMain } from 'pg-promise';


class QuestionsRepository {
    db: IDatabase<any>;
    pgp: IMain;
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }

    findAll() {
        return this.db.any('SELECT * FROM questions');
    }

    add(values: { topic_id: number, content: string, correct_answers: string[], misleading_answers: string[], question_type: string, difficulty: number }) {
        return this.db.one(queries.questions.add, values);
    }

    getQuiz(values: { user_id: string; unit_id: number; topic_id: number; }): Promise<any> {
        return this.db.many(queries.questions.getQuiz, values);
    }

    getRepetition(values: { user_id: string; }) {
        return this.db.any(queries.questions.getRepetition, values);
    }

    getRepetitionOverview(values: { user_id: string; }) {
        return this.db.many(queries.questions.repetitionOverview, values);
    }

    addToAnswered(values: { user_id: string, question_ids: number[] }) {
        return this.db.tx(async t => {
            const question_ids = values.question_ids;
            const dataMulti = question_ids.map(item => ({ user_id: values.user_id, question_id: item }));

            const cs = new this.pgp.helpers.ColumnSet(['user_id', 'question_id'], { table: 'answered_questions' });
            const insert_query = this.pgp.helpers.insert(dataMulti, cs) + ' ON CONFLICT (user_id, question_id) DO NOTHING';

            await t.none(insert_query);
            const delete_query = `
                DELETE FROM
                    repetitions
                WHERE
                    user_id = $<user_id>
                    AND question_id IN ($<question_ids:csv>)`;
            return t.none(delete_query, { user_id: values.user_id, question_ids: question_ids });
        })
    }

    addToRepetition(values: { user_id: string, question_ids: number[] }) {
        const question_ids = values.question_ids;
        const dataMulti = question_ids.map(item => ({ user_id: values.user_id, question_id: item }));

        const cs = new this.pgp.helpers.ColumnSet(['user_id', 'question_id'], { table: 'repetitions' });
        const insert_query = this.pgp.helpers.insert(dataMulti, cs) + ' ON CONFLICT (user_id, question_id) DO NOTHING';

        return this.db.none(insert_query);
    }
}


export default QuestionsRepository;

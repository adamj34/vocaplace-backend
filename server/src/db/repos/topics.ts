import queries from "../sql/sqlQueries.js";
import { IDatabase, IMain } from 'pg-promise';


class TopicsRepository {
    db: IDatabase<any>;
    pgp: IMain;
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }

    add(values: { topic: string; unit_id: number; icon: string; }) {
        return this.db.one(queries.topics.add, values);
    }

    findTopicIdByName(value: { topic: string; }) {
        return this.db.oneOrNone(`
            SELECT
                id
            FROM
                topics
            WHERE topic = $<topic>
            `, value);
    }
}

export default TopicsRepository;

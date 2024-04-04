import queries from "../sql/sqlQueries.js";
import { IDatabase, IMain } from "pg-promise";

class RankingsRepository {
    db: IDatabase<any>;
    pgp: IMain;
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }

    getTopUsers() {
        return this.db.any(`
        SELECT
            id,
            username,
            points,
            picture
        FROM
            users
        ORDER BY points DESC
        LIMIT 10
        `);
    }

}


export default RankingsRepository;

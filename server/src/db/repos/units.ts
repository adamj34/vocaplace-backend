import queries from "../sql/sqlQueries.js";
import { IDatabase, IMain } from 'pg-promise';


class UnitsRepository {
    db: IDatabase<any>;
    pgp: IMain;
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }

    findUnitIdByName(value: { unit: string; }) {
        return this.db.oneOrNone(`
            SELECT
                id
            FROM
                units
            WHERE unit = $<unit>
            `, value);
    }

    add(values: { unit: string; icon: string; }) {
        return this.db.one(queries.units.add, values);
    }

    generalUserProgress(value: { id: string; }) {
        return this.db.many(queries.units.generalUserProgress, value);
    }

    detailedUserProgress(values: { user_id: string; unit_id: number; }) {
        return this.db.any(queries.units.detailedUserProgress, values);
    }

    overview() {
        return this.db.many(queries.units.overview);
    }
}

export default UnitsRepository;

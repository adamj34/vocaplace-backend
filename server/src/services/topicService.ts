import { db, pgp } from "../db/connection/db";
import { errorFactory } from "../utils/errorFactory.js";


const createTopic = (topic: string, unit: string, icon?: string) => {
    return db.tx(async t => {
        const unitData = await t.units.findUnitIdByName({ unit: unit })
        if (!unitData) {
            throw errorFactory('404', "Unit not found");
        }

        const unitId = unitData.id;
        const data = await t.topics.add({ topic: topic, unit_id: unitId, icon: icon })

        return {
            success: true,
            data
        }
    })
}


export default {
    createTopic
};

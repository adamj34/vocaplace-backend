import { db, pgp } from "../db/connection/db";
import { errorFactory } from "../utils/errorFactory.js";


const createUnit = async (unit: string, icon?: string) => {
    const data = await db.units.add({ unit, icon });
    return {
        success: true,
        data
    };
}

const getGeneralUserProgress = async (userId: string) => {
    const data = await db.units.generalUserProgress({ id: userId });
    const progressData = data.reduce((acc, curr) => {
        acc = {
            ...acc, [curr.id]: {
                unit: curr.unit,
                unit_icon: curr.icon,
                completion_ratio: curr.completion_ratio,
                created_at: curr.created_at,
            }
        };
        return acc;
    }, {});

    return {
        success: true,
        data: progressData
    };
}

const getDetailedUserProgress = async (userId: string, unitId: number) => {
    const data = await db.units.detailedUserProgress({ user_id: userId, unit_id: unitId });

    let unit;
    const topicsWithRetrievedIds = data.reduce((acc, curr) => {
        unit = curr.unit;
        acc = {
            ...acc, [curr.topic_id]: {
                topic: curr.topic,
                topic_icon: curr.icon,
                created_at: curr.created_at,
                completion_ratio: curr.completion_ratio,
            }
        };
        return acc;
    }, []);

    return {
        success: true,
        unit: unit,
        data: topicsWithRetrievedIds
    };
}

const getUnitOverview = async () => {
    const data = await db.units.overview()
    const retrieveIds = data.reduce((acc, curr) => {
        acc = {
            ...acc, [curr.unit_id]: {
                unit: curr.unit,
                unit_icon: curr.unit_icon,
                topics: curr.topics || [],
            }
        };
        return acc;
    }, {})

    return {
        success: true,
        data: retrieveIds
    };
}


export default {
    createUnit,
    getGeneralUserProgress,
    getDetailedUserProgress,
    getUnitOverview
};

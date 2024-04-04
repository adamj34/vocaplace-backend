import { db, pgp } from "../db/connection/db";
import { errorFactory } from "../utils/errorFactory.js";
import { pictureToSignedUrl } from "../cloud/cloudFrontClient"


const searchGroupsAndUsers = (searchPhrase: string) => {
    return db.task(async t => {
        const matchedUsers = pictureToSignedUrl(await t.users.searchByUsername({ searchPhrase }));
        const matchedGroups = pictureToSignedUrl(await t.groups.searchByGroupname({ searchPhrase }));

        return {
            success: true,
            data: { matchedUsers, matchedGroups }
        }
    })
}

export default {
    searchGroupsAndUsers
};

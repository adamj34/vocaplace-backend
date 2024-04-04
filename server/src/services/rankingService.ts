import { pictureToSignedUrl } from "../cloud/cloudFrontClient";
import { db, pgp } from "../db/connection/db";
import { errorFactory } from "../utils/errorFactory.js";


const getTopUsersRanking = async () => {
    const ranking = pictureToSignedUrl(await db.rankings.getTopUsers());
    return {
        success: true,
        data: ranking
    };
};

const getFriendsRanking = (userId: string) => {
    return db.task(async t => {
        const friendsData = pictureToSignedUrl(await t.user_relationships.findFriendsByUserId({ id: userId }));
        const userData = pictureToSignedUrl(await t.users.findById({ id: userId }));
        friendsData.push(userData);
        friendsData.sort((a, b) => b.points - a.points);

        return {
            success: true,
            data: friendsData
        }
    })
};

export default {
    getTopUsersRanking,
    getFriendsRanking
};

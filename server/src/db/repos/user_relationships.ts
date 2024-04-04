import { IClient } from "pg-promise/typescript/pg-subset.js";
import queries from "../sql/sqlQueries.js";
import { IDatabase, IMain } from 'pg-promise';


class UserRelationshipsRepository {
    db: IDatabase<any>;
    pgp: IMain;
    constructor(db, pgp: IMain<{}, IClient>) {
        this.db = db;
        this.pgp = pgp;
    }

    changeRelationship(values: { user1_id: string; user2_id: string; relationship: string; }) {
        return this.db.one(queries.user_relationships.changeRelationship, values);
    }

    acceptFriend(values: { user1_id: string; user2_id: string; }) {
        return this.db.one(queries.user_relationships.acceptFriend, values);
    }

    checkRelationship(values: { user1_id: string; user2_id: string; }) {
        return this.db.oneOrNone(queries.user_relationships.checkRelationship, values);
    }

    deleteRelationship(values: { user1_id: string; user2_id: string; relationship: string; }) {
        return this.db.one(queries.user_relationships.deleteRelationship, values);
    }

    findFriendsByUserId(value: { id: string; }) {
        return this.db.any(`
        SELECT u.* 
        FROM (
            SELECT user1_id AS friend_id
            FROM user_relationships
            WHERE user2_id = $<id> AND relationship = 'friends'
            UNION ALL
            SELECT user2_id AS friend_id
            FROM user_relationships
            WHERE user1_id = $<id> AND relationship = 'friends'
        ) AS friends
        JOIN users u ON u.id = friends.friend_id
        `, value);
    }

    getPendingRequests(value: { id: string; }) {
        return this.db.any(`
        SELECT
            CASE
                WHEN user1_id = $<id> THEN user2_id
                ELSE user1_id
            END AS user_id
        FROM
            user_relationships
        WHERE 
            (user2_id = $<id> AND relationship = 'pending_user1_user2') 
            OR 
            (user1_id = $<id> AND relationship = 'pending_user2_user1')
            `, value);
    }
}

export default UserRelationshipsRepository;

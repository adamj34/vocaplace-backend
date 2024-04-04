import { db, pgp } from "../db/connection/db";
import { errorFactory, FriendshipConstraintError } from "../utils/errorFactory.js";
import { pictureToSignedUrl } from "../cloud/cloudFrontClient";


enum RelationshipState {
    PENDING_USER1_USER2 = 'pending_user1_user2',
    PENDING_USER2_USER1 = 'pending_user2_user1',
    FRIENDS = 'friends',
}

const sendFriendRequest = (userId: string, friendId: string) => {
    return db.tx(async t => {
        // adhere to the constraint that user1_id < user2_id
        if (userId === friendId) {
            throw new FriendshipConstraintError('Cannot add yourself as a friend');
        } else {
            let users;
            if (userId < friendId) {
                users = {
                    user1_id: userId,
                    user2_id: friendId,
                    relationship: RelationshipState.PENDING_USER1_USER2
                };
            } else {
                users = {
                    user1_id: friendId,
                    user2_id: userId,
                    relationship: RelationshipState.PENDING_USER2_USER1
                };
            }

            const data = await t.user_relationships.checkRelationship(users);
            // if relationship does not exist
            if (!data) {
                const data = await t.user_relationships.changeRelationship(users);
                return {
                    success: true,
                    data
                };
            } else {
                throw new FriendshipConstraintError('You are already friends or have a pending request with this user');
            }
        }
    })
}

const acceptFriendRequest = async (userId: string, friendId: string) => {
    if (userId === friendId) {
        throw new FriendshipConstraintError('Cannot add yourself as a friend');
    }

    let users;
    if (userId < friendId) {
        users = { user1_id: userId, user2_id: friendId };
    } else {
        users = { user1_id: friendId, user2_id: userId };
    }
    users.relationship = RelationshipState.FRIENDS;

    const data = await db.user_relationships.acceptFriend(users)

    return {
        success: true,
        data
    };
}

const deleteReceivedFriendRequest = async (userId: string, friendId: string) => {
    if (userId === friendId) {
        throw new FriendshipConstraintError('Cannot delete friend request from yourself');
    }

    let users;
    if (userId < friendId) {
        users = { user1_id: userId, user2_id: friendId, relationship: RelationshipState.PENDING_USER2_USER1 };
    } else {
        users = { user1_id: friendId, user2_id: userId, relationship: RelationshipState.PENDING_USER1_USER2 };
    }

    const data = await db.user_relationships.deleteRelationship(users);

    return {
        success: true,
        data
    };
}

const deleteSentFriendRequest = async (userId: string, friendId: string) => {
    if (userId === friendId) {
        throw new FriendshipConstraintError('Cannot delete friend request sent to yourself');
    }

    let users;
    if (userId < friendId) {
        users = { user1_id: userId, user2_id: friendId, relationship: RelationshipState.PENDING_USER1_USER2 };
    } else {
        users = { user1_id: friendId, user2_id: userId, relationship: RelationshipState.PENDING_USER2_USER1 };
    }

    const data = await db.user_relationships.deleteRelationship(users);

    return {
        success: true,
        data
    };
}

const checkRelationship = async (userId: string, friendId: string) => {
    if (userId === friendId) {
        return {
            success: true,
            data: {
                user1_id: userId,
                user2_id: friendId,
                relationship: null
            }
        }
    } else {
        let users;
        if (userId < friendId) {
            users = { user1_id: userId, user2_id: friendId };
        } else {
            users = { user1_id: friendId, user2_id: userId };
        }

        let data = await db.user_relationships.checkRelationship(users);
        if (!data) {
            data = users;
            data.relationship = null;
        }

        return {
            success: true,
            data
        }
    }
}

const checkPendingRequests = (userId: string) => {
    return db.task(async t => {
        const pendingRequests = await t.user_relationships.getPendingRequests({ id: userId });
        const data = pictureToSignedUrl(await Promise.all(pendingRequests.map(async user => t.users.findById({ id: user.user_id }))));

        return {
            success: true,
            data
        };
    })
}

const deleteFriend = async (userId: string, friendId: string) => {
    if (userId === friendId) {
        throw new FriendshipConstraintError('Cannot delete yourself from friends');
    }

    let users;
    if (userId < friendId) {
        users = { user1_id: userId, user2_id: friendId };
    } else {
        users = { user1_id: friendId, user2_id: userId };
    }
    users.relationship = RelationshipState.FRIENDS;

    const data = await db.user_relationships.deleteRelationship(users)

    return {
        success: true,
        data
    };
}


export default {
    sendFriendRequest,
    deleteReceivedFriendRequest,
    deleteSentFriendRequest,
    acceptFriendRequest,
    checkRelationship,
    checkPendingRequests,
    deleteFriend
};

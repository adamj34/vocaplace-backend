INSERT INTO user_relationships (user1_id, user2_id, relationship)
VALUES (
    ${user1_id},
    ${user2_id},
    ${relationship}
)
RETURNING *;


DELETE FROM
    user_relationships
WHERE
    user1_id = ${user1_id} AND user2_id = ${user2_id} AND relationship = ${relationship}
RETURNING *;

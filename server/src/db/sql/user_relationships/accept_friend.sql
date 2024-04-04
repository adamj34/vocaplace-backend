UPDATE 
    user_relationships
SET
    relationship = ${relationship}
WHERE 
    user1_id = ${user1_id} AND
    user2_id = ${user2_id} AND 
    (relationship = 'pending_user1_user2' OR relationship = 'pending_user2_user1')
RETURNING *;

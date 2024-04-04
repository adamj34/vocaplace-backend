INSERT INTO topics(unit_id, topic, icon)
VALUES (
    ${unit_id},
    ${topic},
    ${icon}
)
RETURNING *;

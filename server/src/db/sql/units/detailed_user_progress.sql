SELECT
    u.unit AS unit,
    t.id AS topic_id,
    t.topic AS topic,
    t.icon AS icon,
    t.created_at AS created_at,
    COALESCE(
        CAST(SUM(CASE WHEN aq.question_id IS NOT NULL THEN 1 ELSE 0 END) AS FLOAT) / NULLIF(COUNT(q.id), 0),
        0
    ) AS completion_ratio
FROM
    units u
JOIN 
    topics t ON u.id = t.unit_id
LEFT JOIN
    questions q ON q.topic_id = t.id
LEFT JOIN 
    answered_questions aq ON aq.question_id = q.id AND aq.user_id = ${user_id}
WHERE 
    u.id = ${unit_id}
GROUP BY
    t.id, u.id

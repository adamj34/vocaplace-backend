SELECT
    u.id,
    u.unit,
    u.icon,
    ROUND(COALESCE(
        COUNT(aq.id)::numeric / NULLIF(COUNT(DISTINCT q.id), 0), 0
    ), 2) AS completion_ratio,
    u.created_at
FROM
    units u
LEFT JOIN 
    topics t ON u.id = t.unit_id
LEFT JOIN
    questions q ON q.topic_id = t.id
LEFT JOIN 
    answered_questions aq ON aq.question_id = q.id AND aq.user_id = ${id}
GROUP BY
    u.id

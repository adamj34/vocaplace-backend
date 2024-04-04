SELECT
    u.id AS unit_id,
    u.unit AS unit,
    u.icon AS unit_icon,
    json_agg(
        json_build_object(
            'topic_id', t.id,
            'topic', t.topic,
            'topic_icon', t.icon,
            'total_questions', t.total_questions,
            'repetition_questions', t.repetition_questions
        )
    ) AS topics
FROM 
    units u
JOIN (
    SELECT
        t.id,
        t.topic,
        t.unit_id,
        t.icon,
        COUNT(q.id) AS total_questions,
        COUNT(r.id) AS repetition_questions
    FROM
        topics t
    LEFT JOIN
        questions q ON q.topic_id = t.id
    LEFT JOIN
        repetitions r ON r.question_id = q.id AND r.user_id = ${user_id}
    GROUP BY
        t.id
) t ON u.id = t.unit_id
GROUP BY
    u.id

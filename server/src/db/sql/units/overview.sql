SELECT
    u.id AS unit_id,
    u.unit AS unit,
    u.icon AS unit_icon,
    json_agg(
        json_build_object(
            'topic_id', t.topic_id,
            'topic', t.topic,
            'topic_icon', t.icon,
            'question_ids', t.question_ids
        )
    ) FILTER (WHERE t.topic_id IS NOT NULL) AS topics  -- filter to ignore NULLS
FROM
    units u
LEFT JOIN (
    SELECT
        t.unit_id,
        t.id AS topic_id,
        t.topic AS topic,
        t.icon,
        COALESCE(array_agg(q.id) FILTER (WHERE q.id IS NOT NULL), ARRAY[]::integer[]) AS question_ids  -- filter to ignore NULLS
    FROM
        topics t
    LEFT JOIN
        questions q ON q.topic_id = t.id
    GROUP BY
        t.id
) t ON u.id = t.unit_id
GROUP BY 
    u.id

SELECT
    COALESCE(json_agg(
        json_build_object(
            'question_id', q.id,
            'content', q.content,
            'correct_answers', q.correct_answers,
            'misleading_answers', q.misleading_answers,
            'question_type', q.question_type,
            'difficulty', q.difficulty,
            'is_answered', TRUE
        )
    ) FILTER (WHERE aq.question_id IS NOT NULL), '[]') AS answered_questions,
    COALESCE(json_agg(
        json_build_object(
            'question_id', q.id,
            'content', q.content,
            'correct_answers', q.correct_answers,
            'misleading_answers', q.misleading_answers,
            'question_type', q.question_type,
            'difficulty', q.difficulty,
            'is_answered', FALSE
        )
    ) FILTER (WHERE aq.question_id IS NULL), '[]') AS unanswered_questions
FROM 
    units u
LEFT JOIN
    topics t ON u.id = t.unit_id
LEFT JOIN
    questions q ON q.topic_id = t.id
LEFT JOIN
    answered_questions aq ON aq.question_id = q.id AND aq.user_id = ${user_id}
WHERE
    u.id = ${unit_id} AND
    t.id = ${topic_id}

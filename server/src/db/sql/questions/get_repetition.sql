SELECT
    q.id AS question_id,
    q.content AS content,
    q.correct_answers AS correct_answers,
    q.misleading_answers AS misleading_answers,
    q.question_type AS question_type,
    q.difficulty AS difficulty
FROM 
    questions q
JOIN
    repetitions r ON r.question_id = q.id 
WHERE
    r.user_id = ${user_id}
ORDER BY 
    r.created_at ASC
LIMIT 
    10

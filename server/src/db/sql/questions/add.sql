INSERT INTO questions(topic_id, content, correct_answers, misleading_answers, question_type, difficulty)
VALUES(
    ${topic_id},
    ${content},
    ${correct_answers},
    ${misleading_answers},
    ${question_type}, 
    ${difficulty}
)
RETURNING id;

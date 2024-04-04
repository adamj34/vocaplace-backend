import { object, string, array, number } from 'yup';

const createQuestionSchema = object({
    body: object({
        unit: string().trim().max(50).strict().required(),
        topic: string().trim().max(50).strict().required(),
        content: string().trim().max(500).strict().required(),
        correctAnswers: array().of(string()).required(),
        misleadingAnswers: array().of(string()).optional(),
        questionType: string().trim().strict().required(),
        difficulty: number().integer().positive().required(),
    }).required()
});

const getQuizSchema = object({
    query: object({
        unitId: number().integer().positive().required(),
        topicId: number().integer().positive().required(),
    }).required()
});

const addToAnsweredSchema = object({
    body: object({
        questionIds: array().of(number().positive()).required()
    }).required()
});

const addToRepetitionSchema = object({
    body: object({
        questionIds: array().of(number().positive()).required()
    }).required()
});


export {
    createQuestionSchema,
    getQuizSchema,
    addToAnsweredSchema,
    addToRepetitionSchema
};

import { db, pgp } from "../db/connection/db";
import { errorFactory } from "../utils/errorFactory.js";


const createQuestion = (
    newQuestion: {
        unit: string,
        topic: string,
        content: string,
        correctAnswers: string[],
        misleadingAnswers: string[],
        questionType: string,
        difficulty: number
    }
) => {
    return db.tx(async t => {
        // check if unit and topic exist
        const unit = await t.units.findUnitIdByName({ unit: newQuestion.unit });
        const topic = await t.topics.findTopicIdByName({ topic: newQuestion.topic });
        if (!unit || !topic) {
            throw errorFactory('404', 'Unit or topic does not exist');
        }

        const question = {
            topic_id: topic.id,
            content: newQuestion.content,
            correct_answers: newQuestion.correctAnswers,
            misleading_answers: newQuestion.misleadingAnswers,
            question_type: newQuestion.questionType,
            difficulty: +newQuestion.difficulty,
        };
        const createdQuestion = await t.questions.add(question);

        return {
            success: true,
            data: { id: createdQuestion.id }
        };
    })
}

const getQuiz = async (userId: string, unitId: number, topicId: number) => {
    let data = await db.questions.getQuiz({ user_id: userId, unit_id: unitId, topic_id: topicId })
    console.log(data)
    data = data[0];
    // answered_questions or unanswered_questions are always [] if there are no questions
    const dataFiltered = {
        answeredQuestions: data.answered_questions.slice(0, 5),
        unansweredQuestions: data.unanswered_questions.slice(0, 5)
    };

    return {
        success: true,
        data: dataFiltered
    };
}

const addToAnswered = async (userId: string, questionIds: number[]) => {
    const data = await db.questions.addToAnswered({ user_id: userId, question_ids: questionIds })
    return {
        success: true,
        data
    };
}

const addToRepetition = async (userId: string, questionIds: number[]) => {
    const data = await db.questions.addToRepetition({ user_id: userId, question_ids: questionIds })
    return {
        success: true,
        data
    };
}

const getRepetition = async (userId: string) => {
    const data = await db.questions.getRepetition({ user_id: userId })
    return {
        success: true,
        data
    };
}

const getRepetitionOverview = async (userId: string) => {
    const data = await db.questions.getRepetitionOverview({ user_id: userId })
    return {
        success: true,
        data
    };
}

export default {
    createQuestion,
    getQuiz,
    getRepetition,
    addToAnswered,
    addToRepetition,
    getRepetitionOverview
};

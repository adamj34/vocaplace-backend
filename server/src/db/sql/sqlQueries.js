import pgPromise from 'pg-promise';
const { QueryFile } = pgPromise;

// Helper for linking to external query files
function sql(file) {
    const fullPath = new URL(file, import.meta.url).pathname; // generating full path;
    const currQueryFile = new QueryFile(fullPath, { minify: true });
    if (currQueryFile.error) {
        console.error(currQueryFile.error);
    }

    return currQueryFile;
}

const queries = {
    users: {
        add: sql('users/add.sql'),
        delete: sql('users/delete.sql'),
        find: sql('users/find.sql'),
    },
    questions: {
        add: sql('questions/add.sql'),
        getQuiz: sql('questions/get_quiz.sql'),
        getRepetition: sql('questions/get_repetition.sql'),
        repetitionOverview: sql('questions/repetition_overview.sql'),
    },
    units: {
        add: sql('units/add.sql'),
        generalUserProgress: sql('units/general_user_progress.sql'),
        detailedUserProgress: sql('units/detailed_user_progress.sql'),
        overview: sql('units/overview.sql'),
    },
    topics: {
        add: sql('topics/add.sql'),
    },
    user_relationships: {
        changeRelationship: sql('user_relationships/change_relationship.sql'),
        acceptFriend: sql('user_relationships/accept_friend.sql'),
        checkRelationship: sql('user_relationships/check_relationship.sql'),
        deleteRelationship: sql('user_relationships/delete_relationship.sql'),
    },
};

export default queries;

import { object, string } from 'yup';

const searchGroupsAndUsersSchema = object({
    query: object({
        searchPhrase: string().max(50).trim().strict().required(),
    }).required()
});


export {
    searchGroupsAndUsersSchema,
};

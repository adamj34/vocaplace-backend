import { object, string } from 'yup';

const friendRelationSchema = object({
    params: object({
        id: string().uuid().trim().strict().required()
    }).required()
});

export {
    friendRelationSchema,
};

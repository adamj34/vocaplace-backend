import { string, object } from 'yup';


const userDataSchema = object({
    userId: string().uuid().trim().strict().required(),
    username: string().trim().strict().required(),
});


export {
    userDataSchema,
};

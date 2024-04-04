import { object, string } from 'yup';


const createTopicSchema = object({
    body: object({
        topic:
            string()
            .max(50)
            .matches(/^[^\d]*$/, 'Topic should not consist only of numbers')
            .trim()
            .strict()
            .required(),
        unit: 
            string()
            .max(50)
            .matches(/^[^\d]*$/, 'Unit should not consist only of numbers')
            .trim()
            .strict()
            .required(),
        icon: string().optional(),
    }).required()
});


export {
    createTopicSchema
};

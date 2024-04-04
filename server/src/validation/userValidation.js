import { object, string, boolean, number, mixed } from 'yup';


const getVisitedUserIdSchema = object({
    params: object({
        visitedUserId: string().uuid().trim().strict().required(),
    }).required()
});

const updateUserSchema = object({
    body: object({
        bio: string().max(500).trim().strict().optional(),
        picture: mixed()
            .test('file-size', 'The file is too large', pic => {
                return !pic || pic.size <= 1024 * 1024; // 1 MB
            })
            .test('media-type', 'Unsupported Format', pic => {
                return !pic || ['image/jpeg', 'image/png', 'image/jpg'].includes(pic.mimetype);
            })
            .optional(),
        private_profile: boolean().optional(),
    })
    .required()
    .test('body-not-empty',
        'At least one field must be filled',
        value => Object.keys(value).length > 0)
});

const updatePointsSchema = object({
    body: object({
        points: number().integer().required()
    }).required()
});


export {
    getVisitedUserIdSchema,
    updateUserSchema,
    updatePointsSchema,
};

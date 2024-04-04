import { decode } from 'jsonwebtoken';
import { userDataSchema } from '../validation/userIdAndUsernameValidation.js';
import logger from '../logger/logger';

// Middleware to extract user ID and preferred_username from token
const getUserData = async (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header
    const decodedToken = decode(token); // Decode the token
    req.userId = decodedToken.sub; // Get the user ID and add it to the request object
    req.username = decodedToken.preferred_username;

    try {
        await userDataSchema.validate({
            userId: req.userId,
            username: req.username,
        }); 
    } catch (error) {
        logger.error(error);
        res.status(422).json({
            name: error.name,
            message: error.message,
            value: error.value, 
            errors: error.errors
        });
    }

    next(); 
}

// const getUserData = async (req, res, next) => {

//     req.userId = 'a3b53c8d-f4d4-471c-98db-36061f5da067'
//     // req.userId = '85bd406b-1ec1-47a9-ae9a-599d53d2b46b'
//     // req.userId = '85bd406b-1ec1-47a9-ae9a-599d53d2b46b'
//     req.username = 'admin';  

//     try {
//         await userDataSchema.validate({
//             userId: req.userId,
//             username: req.username,
//         }); 
//     } catch (error) {
//         logger.error(error);
//         res.status(422).json({
//             name: error.name,
//             message: error.message, 
//             value: error.value, 
//             errors: error.errors
//         });
//     }

//     next(); 
// }


export default getUserData;

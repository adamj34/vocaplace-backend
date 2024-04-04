import { S3 } from '@aws-sdk/client-s3';


// S3
const region = process.env.AWS_BUCKET_REGION;

// IAM user
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;


const s3Instance = new S3({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    }
});


enum PictureFolder {
    PROFILE = 'profile_pictures',
    GROUP = 'group_pictures',
}

export {
    s3Instance,
    PictureFolder
};

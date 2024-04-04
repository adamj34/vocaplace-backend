import { getSignedUrl } from "@aws-sdk/cloudfront-signer";
import { CloudFrontClient, CreateInvalidationCommand } from "@aws-sdk/client-cloudfront"
import logger from '../logger/logger';


// CloudFront
const region = process.env.AWS_BUCKET_REGION;
const cloudFrontDomain = process.env.AWS_CLOUDFRONT_DOMAIN;
const cloudfrontDistributionId = process.env.AWS_CLOUDFRONT_DISTRIBUTION_ID
const cloudFrontKeyId = process.env.AWS_CLOUDFRONT_KEY_PAIR_ID;
const cloudFrontPrivateKey = process.env.AWS_CLOUDFRONT_PRIVATE_KEY.replace(/\\n/g, '\n');

// IAM user
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;


const cloudFrontInstance = new CloudFrontClient({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
});


const invalidateCache = (pictureUri: string) => {
    const params = {
        DistributionId: cloudfrontDistributionId,
        InvalidationBatch: {
            CallerReference: Date.now().toString(),
            Paths: {
                Quantity: 1,
                Items: ["/" + pictureUri]
            }
        }
    };

    return cloudFrontInstance.send(new CreateInvalidationCommand(params));
}


const getPreSignedUrl = (pictureName: string) => {
    return getSignedUrl({
        url: `${cloudFrontDomain}/${pictureName}`,
        dateLessThan: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),  // 24 hours
        keyPairId: cloudFrontKeyId,
        privateKey: cloudFrontPrivateKey,
    })
};

const pictureToSignedUrl = (payload) => {
    if (typeof payload === 'object' && payload.picture) {
        payload.picture = getPreSignedUrl(payload.picture);
        logger.info('Picture URL signed');
    } else if (Array.isArray(payload) && payload.every(item => typeof item === 'object')) {
        for (const item of payload) {
            if (item.picture) {
                item.picture = getPreSignedUrl(item.picture);
            }
        }

        logger.info('Picture URLs signed');
    }

    return payload;
};


export {
    pictureToSignedUrl,
    invalidateCache
}

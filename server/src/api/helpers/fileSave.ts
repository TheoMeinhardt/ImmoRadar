import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { UploadedFile } from 'express-fileupload';
import { randomUUID } from 'crypto';
import s3Client from '../../config/awsS3';

async function uploadRealEstateImages(files: UploadedFile[]): Promise<string[] | false> {
  try {
    const idArray: string[] = [];

    for await (const file of files) {
      const imageID = randomUUID();

      const params: PutObjectCommandInput = {
        Bucket: 'immoradar-upload',
        Key: `images/realestate/${imageID}`,
        Body: file.data as Buffer,
        ContentType: 'image/jpeg',
        ACL: 'private',
      };

      await s3Client.send(new PutObjectCommand(params));
      idArray.push(imageID);
    }

    return idArray;
  } catch (err: any) {
    console.log(err);
    return false;
  }
}

export { uploadRealEstateImages };

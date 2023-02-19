import { GetObjectCommand, GetObjectAclCommandInput } from '@aws-sdk/client-s3';
import s3Client from '../../config/awsS3';

async function streamToString(stream: any) {
  const chunks: any[] = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk: any) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err: any) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('base64')));
  });
}

async function getFile(path: string): Promise<any> {
  const params: GetObjectAclCommandInput = {
    Bucket: 'immoradar-upload',
    Key: path,
  };

  const res = await s3Client.send(new GetObjectCommand(params));
  const data = await streamToString(res.Body);
  return data;
}

export default getFile;

import dotenv from 'dotenv';
import { S3Client } from '@aws-sdk/client-s3';

dotenv.config();

const s3Client = new S3Client({
  endpoint: 'https://fra1.digitaloceanspaces.com', // Find your endpoint in the control panel, under Settings. Prepend "https://".
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  region: 'fra1', // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (e.g. nyc3).
  credentials: {
    accessKeyId: process.env.DIGITALOCEAN_ACCESS as string, // Access key pair. You can create access key pairs using the control panel or API.
    secretAccessKey: process.env.DIGITALOCEAN_SECRET as string, // Secret access key defined through an environment variable.
  },
});

export default s3Client;

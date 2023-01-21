import multer from 'multer';
import { join } from 'path';
import { randomUUID } from 'crypto';

const storageRealEstate = multer.diskStorage({
  destination: join(__dirname, '..', '..', '..', 'upload', 'images', 'realestate'),
  filename(req, file, callback) {
    const name: string = randomUUID();
    callback(null, name);
  },
});

const storageUser = multer.diskStorage({
  destination: join(__dirname, '..', '..', '..', 'upload', 'images', 'user'),
  filename(req, file, callback) {
    const name: string = randomUUID();
    callback(null, name);
  },
});

const uploadRealEstatePics = multer({ storage: storageRealEstate });
const uploadUserProfilePic = multer({ storage: storageUser });

export { uploadRealEstatePics, uploadUserProfilePic };

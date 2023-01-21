import { Request, Response } from 'express';
import { join } from 'path';
import { image } from '../types';
import * as db from '../models';

//
// GETs
//

//
// POSTs
//

async function postUserProfilePic(req: Request, res: Response): Promise<void> {
  res.status(200).end();
}

async function postRealEstatePics(req: Request, res: Response): Promise<void> {
  if (req.files) {
    const files = req.files as Express.Multer.File[];

    for await (const el of files) {
      const newImage: image = {
        imageID: el.filename,
        path: join('upload', 'images', 'realestate', el.filename),
        reID: req.params.id,
      };

      const addedImage = await db.postImage(newImage);
    }

    res.status(200).send(`Added ${files.length} images`);
  }

  res.status(200).end();
}

export { postUserProfilePic, postRealEstatePics };

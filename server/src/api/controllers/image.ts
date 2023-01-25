import { Request, Response } from 'express';
import { existsSync } from 'fs';
import { join } from 'path';

import { image } from '../types';
import * as db from '../models';

//
// POSTs
//

async function getImage(req: Request, res: Response) {
  const path: string = req.body.path;

  if (!path) res.status(400).send('No path specified!');
  else if (!existsSync(join(__dirname, '..', '..', '..', ...path.split('//')))) res.status(404).send('Image not found!');
  else res.status(200).sendFile(join(__dirname, '..', '..', '..', ...path.split('//')));
}

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

      await db.postImage(newImage);
    }

    res.status(200).send(`Added ${files.length} images`);
  }

  res.status(400).send('No images specified');
}

export { getImage, postUserProfilePic, postRealEstatePics };

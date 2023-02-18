import { Request, Response } from 'express';

import { image } from '../types';
import { uploadRealEstateImages, getFile } from '../helpers';
import * as db from '../models';

//
// POSTs
//

async function getImage(req: Request, res: Response) {
  const path = req.body.path;
  const img = await getFile(path);

  res.status(200).send(`data:image/jpg;base64,${img}`);
}

async function postUserProfilePic(req: Request, res: Response): Promise<void> {
  res.status(200).end();
}

async function postRealEstatePics(req: Request, res: Response): Promise<void> {
  if (req.files?.realestate) {
    const files = Array.isArray(req.files.realestate) ? req.files.realestate : [req.files.realestate];

    const idArray: string[] | false = await uploadRealEstateImages(files);

    if (idArray === false) {
      res.status(500).send('Internal Server Error');
      return;
    }

    const promises = [];
    for (let i = 0; i < idArray.length; i += 1) {
      const newImage: image = {
        imageID: idArray[i],
        path: `images/realestate/${idArray[i]}`,
        reID: req.params.id,
      };

      promises.push(db.postImage(newImage));
    }
    await Promise.all(promises);

    res.status(200).send(`Added ${files.length} images`);
    return;
  }

  res.status(400).send('No images specified');
}

export { getImage, postUserProfilePic, postRealEstatePics };

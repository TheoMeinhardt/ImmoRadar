import { image, imageDTO } from '../../types';

function imageMapper(dto: imageDTO | imageDTO[]): image | image[] {
  const convertimageDtoToimage = (d: imageDTO): image => {
    const newimage: image = {
      imageID: d.image_id,
      path: d.image,
      name: d.name ?? undefined,
      description: d.description ?? undefined,
      reID: d.re_id,
    };

    return newimage;
  };

  if (Array.isArray(dto)) {
    const imageArray: image[] = [];
    dto.forEach((adr) => imageArray.push(convertimageDtoToimage(adr)));
    return imageArray;
  }

  return convertimageDtoToimage(dto);
}

export default imageMapper;

type imageDTO = {
  image_id: string;
  image: string;
  name: string | null;
  description: string | null;
  re_id: string;
};

type image = {
  imageID: string;
  path: string;
  name?: string;
  description?: string;
  reID: string;
};

export { imageDTO, image };

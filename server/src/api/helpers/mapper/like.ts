import { likeDTO, like } from '../../types';

function likeMapper(dto: likeDTO | likeDTO[]): like | like[] {
  const convertlikeDtoTolike = (d: likeDTO): like => {
    const newlike: like = {
      likeID: d.like_id,
      userID: d.user_id,
      commentID: d.comment_id ?? undefined,
      postID: d.post_id ?? undefined,
    };

    return newlike;
  };

  if (Array.isArray(dto)) {
    const likeArray: like[] = [];

    for (const usr of dto) {
      likeArray.push(convertlikeDtoTolike(usr));
    }
    return likeArray;
  }

  return convertlikeDtoTolike(dto);
}

export default likeMapper;

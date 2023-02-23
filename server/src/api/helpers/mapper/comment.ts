import { commentDTO, comment } from '../../types';
import { dbGetLikesFromComments } from '../../models';

async function commentMapper(dto: commentDTO | commentDTO[]): Promise<comment | comment[]> {
  const convertcommentDtoTocomment = async (d: commentDTO): Promise<comment> => {
    const newComment: comment = {
      commentID: d.comment_id,
      content: d.content,
      createdAt: new Date(d.created_at),
      likes: await dbGetLikesFromComments(d.comment_id),
      postID: d.post_id,
      userID: d.user_id,
    };

    return newComment;
  };

  if (Array.isArray(dto)) {
    const commentArray: comment[] = [];

    for await (const usr of dto) {
      commentArray.push(await convertcommentDtoTocomment(usr));
    }
    return commentArray;
  }

  return convertcommentDtoTocomment(dto);
}

export default commentMapper;

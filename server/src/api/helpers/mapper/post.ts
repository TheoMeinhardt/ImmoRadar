import { postDTO, post } from '../../types';
import { dbGetLikesFromPost, dbGetCommentsByPost } from '../../models';

async function postMapper(dto: postDTO | postDTO[]): Promise<post | post[]> {
  const convertpostDtoTopost = async (d: postDTO): Promise<post> => {
    const newPost: post = {
      postID: d.post_id,
      title: d.title,
      content: d.content,
      createdAt: new Date(d.created_at),
      comments: await dbGetCommentsByPost(d.post_id),
      likes: await dbGetLikesFromPost(d.post_id),
      reID: d.re_id,
      userID: d.user_id,
      userName: d.name,
    };

    return newPost;
  };

  if (Array.isArray(dto)) {
    const postArray: post[] = [];

    for await (const usr of dto) {
      postArray.push(await convertpostDtoTopost(usr));
    }
    return postArray;
  }

  return convertpostDtoTopost(dto);
}

export default postMapper;

type likeDTO = {
  like_id: string;
  user_id: string;
  post_id?: string;
  comment_id?: string;
};

type like = {
  likeID: string;
  userID: string;
  postID?: string;
  commentID?: string;
};

export { likeDTO, like };

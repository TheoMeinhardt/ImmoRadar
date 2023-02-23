type commentDTO = {
  comment_id: string;
  content: string;
  created_at: Date;
  post_id: string;
  user_id: string;
};

type comment = {
  commentID: string;
  content: string;
  createdAt: Date;
  likes: number;
  postID: string;
  userID: string;
};

export { comment, commentDTO };

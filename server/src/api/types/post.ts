import { comment } from '.';

type postDTO = {
  post_id: string;
  title: string;
  content: string;
  created_at: Date;
  re_id: string;
  user_id: string;
};

type post = {
  postID: string;
  title: string;
  content: string;
  createdAt: Date;
  comments: comment[];
  likes: number;
  reID: string;
  userID: string;
};

export { postDTO, post };

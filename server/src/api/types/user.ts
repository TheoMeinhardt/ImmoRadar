import { address } from '../types';

type userDTO = {
  user_id: string;
  username: string;
  firstname: string | null;
  middlename: string | null;
  lastname: string | null;
  address_id: string | null;
  company: string | null;
  phone: string | null;
  email: string;
  profile_pic: string | null;
  user_password: string;
};

type user = {
  userID: string;
  username: string;
  firstname: string | null;
  middlename: string | null;
  lastname: string | null;
  address: address | null;
  company: string | null;
  phone: string | null;
  email: string;
  profilePic: string | null;
  password: string;
};

export { userDTO, user };

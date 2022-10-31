type userDTO = {
  user_id: string;
  username: string;
  address_id: string;
  company: string | null;
  phone: string | null;
  email: string;
  profile_pic: string | null;
  user_password: string;
};

type user = {
  userID: string;
  name: string;
  addressID: string;
  company: string | null;
  phone: string | null;
  email: string;
  profilePic: string | null;
  password: string;
};

export { userDTO, user };

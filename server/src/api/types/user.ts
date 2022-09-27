type userDTO = {
  user_id: string;
  name: string;
  address_id: string;
  company: string | null;
  phone: string | null;
  email: string;
  profile_pic: string | null;
  password: string;
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
